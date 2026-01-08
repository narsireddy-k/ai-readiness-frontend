# AI Readiness Frontend (React Application)

This repository contains the **frontend application** for the **AI Readiness Assessment Platform**. It is a **React-based SPA** that guides users through an AI readiness questionnaire, validates responses, visualizes scores, and displays final assessment results.

---

## 🚀 Features

- Multi-step AI readiness assessment flow
- Dynamic question rendering
- Progress tracking with visual indicators
- Score visualization (donut charts & sliders)
- Consistency and validation warnings
- Result summary with readiness level
- Backend API integration
- Clean, modular component architecture

---

## 🧱 Tech Stack

- **Framework:** React (Vite / CRA compatible)
- **Language:** JavaScript (JSX)
- **Styling:** CSS (App.css)
- **Charts:** Custom SVG / chart components
- **API Communication:**  Axios abstraction
- **State Management:** React Hooks

---

## 📁 Project Structure

```
ai-readiness-frontend/
└── src/
    ├── api/
    │   └── aiReadiness.js        # Backend API calls
    │
    ├── assets/
    │   ├── logo.png
    │   └── react.svg
    │
    ├── components/              # Reusable UI components
    │   ├── AssessmentForm.jsx
    │   ├── AssessmentPreview.jsx
    │   ├── AssessmentResult.jsx
    │   ├── ConsistencyWarningModal.jsx
    │   ├── ProgressBar.jsx
    │   ├── QuestionCard.jsx
    │   ├── ReadinessSlider.jsx
    │   ├── ScoreDonut.jsx
    │   ├── UserDetailsForm.jsx
    │   └── WarningModal.jsx
    │
    ├── config/                  # App configuration
    ├── pages/                   # Page-level components
    ├── utils/                   # Utility functions
    │
    ├── App.css                  # Global styles
    └── App.jsx                  # Root component
```

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-org>/ai-readiness-frontend.git
cd ai-readiness-frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

> Update the URL based on backend deployment

---

### 4️⃣ Run Development Server

```bash
npm run dev
# or
yarn dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 🔗 Backend Integration

All backend API calls are centralized in:

```
src/api/aiReadiness.js
```

Example responsibilities:

- Start assessment
- Submit answers
- Fetch score & readiness level
- Trigger email delivery

This abstraction keeps components clean and maintainable.

---

## 🧠 Application Flow

1. **User Details Form**
2. **Assessment Questionnaire**
3. **Live Progress Tracking**
4. **Consistency Validation**
5. **Score Calculation (via backend)**
6. **Result Visualization**

---

## 📊 Visualization Components

- **ProgressBar** – Question completion status
- **ScoreDonut** – Overall readiness score
- **ReadinessSlider** – Maturity positioning

These components are reusable and backend-agnostic.

---

## ⚠️ Validation & Warnings

- Inconsistent answers trigger warnings
- Mandatory fields enforced
- Modal-based user confirmations

Handled via:

```
ConsistencyWarningModal.jsx
WarningModal.jsx
```

---

## 🔐 Security Considerations

- No secrets committed to repo
- Backend URL managed via env variables
- Stateless frontend

> Authentication (if added later) should use JWT / OAuth

---

## 🚢 Production Build

```bash
npm run build
```

Output directory:

```
dist/
```

Deployable on:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

---

## 🧪 Testing (Optional)

```bash
npm run test
```

(Add Jest / RTL if required)

---

## 🤝 Contribution Guidelines

1. Create feature branch
2. Use reusable components
3. Follow consistent naming
4. Open Pull Request

---

## 📜 License

This project is proprietary and intended for internal or client use.

---

## 📞 Support

For frontend issues, UI changes, or enhancements, contact the frontend team or raise a GitHub Issue.

---

### ✅ Maintained by

**ForgeByte AI – Frontend Team**

