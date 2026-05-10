# api/views.py 

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.db.models import Count, F
from django.db import transaction
import uuid
import pandas as pd

from .models import Order, Payment, Refund, Transaction, UploadReport, Issue, FraudCase

# ================= AUTH ================= #

@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    token = Token.objects.create(user=user)

    return Response({
        "message": "User registered successfully",
        "token": token.key
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Login successful",
        "token": token.key
    })


# ================= DASHBOARD ================= #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_api(request):
    return Response({
        "message": "Welcome to Dashboard",
        "user": request.user.username
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def audit_report_api(request):
    return Response({
        "total_orders": Order.objects.count(),
        "total_payments": Payment.objects.count(),
        "fraud_transactions": Transaction.objects.filter(is_fraud=True).count(),
        "safe_transactions": Transaction.objects.filter(is_fraud=False).count()
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fraud_summary_api(request):
    total = Transaction.objects.count()
    fraud = Transaction.objects.filter(is_fraud=True).count()

    percentage = round((fraud / total) * 100, 2) if total > 0 else 0

    return Response({
        "total_transactions": total,
        "fraud_count": fraud,
        "fraud_percentage": percentage
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fraud_vs_safe_api(request):
    return Response({
        "fraud": Transaction.objects.filter(is_fraud=True).count(),
        "safe": Transaction.objects.filter(is_fraud=False).count()
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def error_report_api(request):
    unpaid_orders = Order.objects.filter(payment__isnull=True).count()

    overpaid_payments = Payment.objects.filter(
        amount__gt=F('order__amount')
    ).count()

    duplicate_payments = (
        Payment.objects
        .values('payment_id')
        .annotate(count=Count('payment_id'))
        .filter(count__gt=1)
        .count()
    )

    return Response({
        "unpaid_orders": unpaid_orders,
        "overpaid_payments": overpaid_payments,
        "duplicate_payments": duplicate_payments
    })


# ================= CSV UPLOAD ================= #

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_csv_api(request):
    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    if not file.name.endswith('.csv'):
        return Response({"error": "Only CSV files allowed"}, status=400)

    required_columns = ["order_id", "order_amount"]

    total_rows = 0
    total_issues = 0
    total_fraud = 0

    issue_objects = []
    fraud_objects = []
    payment_objects = []

    # Report numbering per user
    last_report = UploadReport.objects.filter(user=request.user)\
                                      .order_by('-report_number')\
                                      .first()

    next_number = 1 if not last_report or not last_report.report_number else last_report.report_number + 1

    report = UploadReport.objects.create(
        user=request.user,
        report_number=next_number
    )

    try:
        chunks = pd.read_csv(file, chunksize=10000)
    except Exception:
        return Response({"error": "Invalid CSV"}, status=400)

    with transaction.atomic():

        for chunk in chunks:

            if not all(col in chunk.columns for col in required_columns):
                return Response({"error": "CSV must contain order_id and order_amount"}, status=400)

            for row in chunk.itertuples(index=False):
                total_rows += 1

                try:
                    order_id = str(int(row.order_id))
                    order_amount = float(row.order_amount)

                    payment_amount = getattr(row, "payment_amount", None)
                    refund_amount = getattr(row, "refund_amount", None)

                except:
                    total_issues += 1
                    issue_objects.append(
                        Issue(report=report, order_id="UNKNOWN", issue_type="Invalid Data Format")
                    )
                    continue

                issues = []

                # ---------------- ORDER ----------------
                if order_amount <= 0:
                    issues.append("Invalid Order Amount")

                # Create/Get Order
                order_instance, _ = Order.objects.get_or_create(
                    order_id=order_id,
                    defaults={
                        "user": request.user,
                        "amount": order_amount
                    }
                )

                # ---------------- PAYMENT ----------------
                if payment_amount is not None and pd.notna(payment_amount):
                    payment_amount = float(payment_amount)

                    if payment_amount <= 0:
                        issues.append("Invalid Payment Amount")

                    elif payment_amount > order_amount:
                        issues.append("Overpayment")

                    elif payment_amount < order_amount:
                        issues.append("Underpayment")

                    # Store payment
                    payment_objects.append(
                        Payment(
                            order=order_instance,
                            amount=payment_amount
                        )
                    )

                else:
                    issues.append("Missing Payment")

                # ---------------- REFUND ----------------
                if refund_amount is not None and pd.notna(refund_amount):
                    refund_amount = float(refund_amount)

                    if refund_amount < 0:
                        issues.append("Invalid Refund Amount")

                    if refund_amount > order_amount:
                        issues.append("Refund Exceeds Order Amount")

                    if payment_amount is not None and pd.notna(payment_amount):

                        if refund_amount > payment_amount:
                            issues.append("Refund Greater Than Payment")

                        elif refund_amount == payment_amount:
                            issues.append("Full Refund")

                        elif refund_amount < payment_amount and refund_amount > 0:
                            issues.append("Partial Refund")

                    # Store refund
                    Refund.objects.create(
                        order=order_instance,
                        amount=refund_amount
                    )

                # ---------------- FRAUD ----------------
                is_fraud = False

                if payment_amount is not None and pd.notna(payment_amount):
                    if payment_amount > 2 * order_amount:
                        is_fraud = True

                if refund_amount is not None and pd.notna(refund_amount):
                    if payment_amount is not None and refund_amount > payment_amount:
                        is_fraud = True

                    if refund_amount > order_amount:
                        is_fraud = True

                if is_fraud:
                    total_fraud += 1
                    fraud_objects.append(
                        FraudCase(
                            report=report,
                            order_id=order_id,
                            description="Suspicious Transaction"
                        )
                    )

                # ---------------- ISSUES ----------------
                for issue in issues:
                    total_issues += 1
                    issue_objects.append(
                        Issue(
                            report=report,
                            order_id=order_id,
                            issue_type=issue
                        )
                    )

        # Bulk insert (fast)
        Payment.objects.bulk_create(payment_objects, batch_size=1000)
        Issue.objects.bulk_create(issue_objects, batch_size=1000)
        FraudCase.objects.bulk_create(fraud_objects, batch_size=1000)

        # Update report
        report.total_rows = total_rows
        report.total_issues = total_issues
        report.fraud_count = total_fraud
        report.save()

    return Response({
        "message": "CSV processed successfully 🚀",
        "report_id": report.id,
        "total_rows": total_rows,
        "issues_found": total_issues,
        "fraud_detected": total_fraud
    })


# ================= REPORT APIs ================= #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_report_api(request, report_id):
    try:
        report = UploadReport.objects.get(id=report_id, user=request.user)
    except UploadReport.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)

    return Response({
        "report_id": report.id,
        "report_number": report.report_number,
        "total_rows": report.total_rows,
        "total_issues": report.total_issues,
        "fraud_count": report.fraud_count,
        "created_at": report.created_at
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_issues_api(request, report_id):
    issues = Issue.objects.filter(report_id=report_id)

    return Response([
        {"order_id": i.order_id, "issue": i.issue_type}
        for i in issues[:50]
    ])


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_frauds_api(request, report_id):
    frauds = FraudCase.objects.filter(report_id=report_id)

    return Response([
        {"order_id": f.order_id, "issue": f.description}
        for f in frauds[:50]
    ])


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_reports_api(request):
    reports = UploadReport.objects.filter(user=request.user).order_by('-created_at')

    return Response([
        {
            "report_id": r.id,
            "report_number": r.report_number,
            "total_rows": r.total_rows,
            "total_issues": r.total_issues,
            "fraud_count": r.fraud_count,
            "created_at": r.created_at,
        }
        for r in reports
    ])


# ================= PROFILE ================= #

# ================= PROFILE ================= #

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    # 🔹 GET profile
    if request.method == 'GET':
        return Response({
            "name": user.first_name,
            "username": user.username,
            "email": user.email,
            "mobile": user.last_name,   # temporary storage
            "location": ""              # optional for now
        })

    # 🔹 UPDATE profile
    if request.method == 'PUT':
        user.first_name = request.data.get("name", user.first_name)
        user.email = request.data.get("email", user.email)
        user.last_name = request.data.get("mobile", user.last_name)

        user.save()

        return Response({
            "message": "Profile updated successfully",
            "name": user.first_name,
            "username": user.username,
            "email": user.email,
            "mobile": user.last_name,
            "location": ""
        })