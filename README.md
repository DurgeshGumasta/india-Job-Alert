# 🇮🇳 India Job Alerts

India Job Alerts is a comprehensive job aggregation platform that collects and displays both **government** and **private** job postings across India. The goal is to offer a centralized, user-friendly system for job seekers to access verified opportunities from multiple sources — including official PDFs and corporate listings.

---

## 🚀 Features

### 🧩 Core Functionality
- Aggregates job postings from various sources (official websites, third-party APIs, etc.)
- PDF parsing to extract structured job data
- Detailed job information including eligibility, documents, dates, fees, etc.
- Location-based job listings using latitude and longitude
- Support for multiple job categories and employment types
- Reservation-based fee and vacancy structure (General, OBC, SC/ST, EWS, PH)
- Timeline tracking for application deadlines

### 🛠 Technical Features
- RESTful API for job operations
- PDF document ingestion and parsing
- Real-time job fetching capabilities
- Responsive frontend with **Server-Side Rendering (SSR)**
- Modular, scalable codebase for easy extensions

---

## 🧱 Technology Stack

### Frontend
- **React 18+** with **React Router v7**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** for components
- Server-side rendering

### Backend
- **Gadget Framework**
- **Node.js**
- **PostgreSQL**
- **OpenAI API** integration for AI-powered processing
- **pdf-parse** for PDF content extraction

### Libraries & Tools
- `Axios` – for HTTP requests
- `date-fns` – for date formatting
- `Lucide React` – icon set

---

## 📊 Data Models

### Government Job Model (`JobPost`)
- Full application process breakdown
- Category-wise fee and vacancy structure
- Required qualifications, age limits, document list
- Exam/interview schedule

### Private/Corporate Job Model (`JobPosting`)
- Integration with LinkedIn company data
- Remote/hybrid options, job location
- Employment types (full-time, part-time, contract)
- Seniority levels and company branding

---

## 🔌 API Endpoints

### Global Actions
- `POST /api/fetchJobs` – Aggregates job data from external sources
- `POST /api/pdfParse` – Parses job-related PDFs

### Model-Specific
- `GET/POST/PUT/DELETE` for job records (CRUD)
- Bulk insert/update support
- Access control (public vs. admin APIs)

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+
- Access to Gadget development environment

### Environment Variables
- `OPENAI_API_KEY`
- `DATABASE_URL`
- Job board API credentials

### Getting Started
```bash
git clone https://github.com/your-org/india-job-alerts.git
cd india-job-alerts
npm install
npm run dev
