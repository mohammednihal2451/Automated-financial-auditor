# Automated Financial Auditor

A full-stack financial auditing and fraud detection system built using Django REST Framework and React.  
The system analyzes uploaded CSV transaction data, detects financial inconsistencies, identifies suspicious fraud patterns, and generates detailed audit reports.

---

# Features

## Authentication
- User Registration
- User Login
- Token-based Authentication

## CSV Audit System
- Upload CSV transaction files
- Process large CSV files efficiently using chunk processing
- Detect audit issues automatically

## Financial Issue Detection
- Missing Payments
- Overpayments
- Underpayments
- Invalid Order Amounts
- Invalid Payment Amounts
- Invalid Refund Amounts
- Refund Greater Than Payment
- Refund Exceeds Order Amount
- Full Refund Detection
- Partial Refund Detection

## Fraud Detection
- Detect suspicious transactions
- Detect abnormal payment behavior
- Fraud report generation

## Reports Dashboard
- Upload history
- Audit summaries
- Fraud summaries
- Report details
- Issue listing
- Fraud case listing

## Performance Features
- Bulk database inserts
- Large CSV support
- Chunk-based processing using Pandas

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite
- Pandas

## Frontend
- React
- Tailwind CSS
- Axios

---

# Project Structure

```bash
AUTOMATED FINANCIAL AUDITOR/
│
├── backend/
│   ├── api/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Supported CSV Format

## Required Columns

```csv
order_id,order_amount
```

## Optional Columns

```csv
payment_amount,refund_amount
```

## Example CSV

```csv
order_id,order_amount,payment_amount,refund_amount
1001,500,500,0
1002,1000,1200,0
1003,700,700,700
1004,800,,0
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd automated-financial-auditor
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Start Backend Server

```bash
python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000/
```

---

# Frontend Setup

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000/
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register user |
| POST | `/api/login/` | Login user |

---

## CSV Upload

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload-csv/` | Upload audit CSV |

---

## Reports

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports/` | List reports |
| GET | `/api/report/<id>/` | Get report |
| GET | `/api/report/<id>/issues/` | Get issues |
| GET | `/api/report/<id>/frauds/` | Get frauds |

---

# Future Improvements

- Duplicate order detection
- Export reports as PDF
- Advanced fraud analytics
- Email notifications
- Cloud deployment
- Admin dashboard

---

# Authors

Muhammed Shahad K
Mohammed Nihal M

Developed as a full-stack financial auditing and fraud detection project using Django and React.