from django.db import models
from django.contrib.auth.models import User
import uuid


# ================= CORE FINANCIAL MODELS ================= #

class Order(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id}"


class Payment(models.Model):
    payment_id = models.CharField(max_length=100, default=uuid.uuid4, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.payment_id} - {self.order.order_id}"


class Refund(models.Model):
    refund_id = models.CharField(max_length=100, default=uuid.uuid4, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="refunds")
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Refund {self.refund_id} - {self.order.order_id}"


# ================= AUDIT SYSTEM ================= #

class UploadReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    report_number = models.IntegerField(null=True, blank=True)
    total_rows = models.IntegerField(default=0)
    total_issues = models.IntegerField(default=0)
    fraud_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report {self.report_number} (User: {self.user.username})"


class Issue(models.Model):
    report = models.ForeignKey(UploadReport, on_delete=models.CASCADE, related_name="issues")
    order_id = models.CharField(max_length=100)
    issue_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.order_id} - {self.issue_type}"


class FraudCase(models.Model):
    report = models.ForeignKey(UploadReport, on_delete=models.CASCADE, related_name="frauds")
    order_id = models.CharField(max_length=100)
    description = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.order_id} - Fraud"


# ================= OPTIONAL (FUTURE USE) ================= #

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = (
        ('PAYMENT', 'Payment'),
        ('REFUND', 'Refund'),
    )

    transaction_id = models.CharField(max_length=100, default=uuid.uuid4, unique=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.FloatField()
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    is_fraud = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.order.order_id}"


# ================= USER PROFILE ================= #

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username