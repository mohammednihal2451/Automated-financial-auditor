from django.urls import path
from .views import (
    register_api,
    login_api,
    dashboard_api,
    audit_report_api,
    fraud_summary_api,
    fraud_vs_safe_api,
    error_report_api,
    upload_csv_api,
    get_report_api,
    get_issues_api,
    get_frauds_api,
    list_reports_api,
    user_profile,
)

urlpatterns = [

    # 🔐 AUTH
    path('register/', register_api),
    path('login/', login_api),

    # 📊 DASHBOARD
    path('dashboard/', dashboard_api),

    # 📂 CSV
    path('upload-csv/', upload_csv_api),

    # 📈 ANALYTICS
    path('audit/report/', audit_report_api),
    path('fraud/summary/', fraud_summary_api),
    path('fraud/vs-safe/', fraud_vs_safe_api),

    # ⚠️ ERRORS
    path('errors/report/', error_report_api),

    # 📑 REPORTS
    path('reports/', list_reports_api),
    path('report/<int:report_id>/', get_report_api),
    path('report/<int:report_id>/issues/', get_issues_api),
    path('report/<int:report_id>/frauds/', get_frauds_api),

    # 👤 PROFILE
    path('user/profile/', user_profile),
]