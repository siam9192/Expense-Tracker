# Expense Tracker

A powerful and user-friendly **Expense Tracker** application designed to help users manage finances efficiently with secure authentication, multi-currency support, savings goals, analytics, and full customization.

---

## 🚀 Features

### 🔐 Authentication & Security
- Secure email/password authentication  
- **Account verification with OTP** (Email/SMS)  
- **Session management** (view & revoke active logins)  
- Encrypted user data handling  
- Optional 2FA support (future improvement)

### 👤 User Profile
- Editable profile with name, email, phone, avatar  
- Multi-currency preference (USD, EUR, BDT, INR, etc.)  
- Language preference  
- Theme preference (light, dark)

### 💱 Multi-Currency Support
- Choose base currency during onboarding  
- Automatically convert amounts using live/external rates  
- Store expenses in multiple currencies  
- Display total reports based on selected main currency

### 🧾 Transaction Management
- Add, edit, delete expenses  
- **Transaction categories** (Food, Transport, Bills, Health, Shopping, etc.)  
- Custom categories support  
- Attach notes, tags, and receipt images (optional)

### 🎯 Savings Goals
- Create savings goals (e.g., “Buy a Laptop”, “Emergency Fund”)  
- Track goal progress  
- Set deadlines and contribution reminders

### 📊 Analytics & Insights
**Detailed summaries:**
- **Daily**
- **Weekly**
- **Monthly**
- **Yearly**

Includes:
- Category-wise distribution  
- Highest spending categories  
- Comparison with previous time periods  
- Savings goal progress analytics

### 🌐 Multi-Language Support
- Support for multiple languages (e.g., English, Bangla, Spanish)  
- Easy integration for adding more languages

### 🎨 Themes & UI Customization
- **Light mode**  
- **Dark mode**  


### ⚙️ Settings & Preferences
- Change currency  
- Change language  
- Change theme  
- Manage active sessions  
- Manage account security  
- Export data (future improvement)

---

## 🏗️ Tech Stack

### Frontend
- React
- TailwindCSS + DaisyUI
-  Redux Toolkit + RTK Query
- i18n for multi-language

### Backend
- Node.js + Express   
- JWT Authentication  
- Zod 

### Database
-  PostgreSQL

### Project Installation 

```bash
git clone https://github.com/siam9192/Expense-Tracker.git
npm install
```
### How to run backend ?

``
cd backend
npm install
``
- Create a .env file inside the backend/ folder (not the project root unless specified).
- Copy the variables from .env.local (if provided) and paste them into your .env file.
- Set appropriate values for each environment variable 

### 🔧 Start the Backend Server

``
npm run dev 
``
Once the command runs successfully, backend server should be up and running (typically on http://localhost:5000 or whichever port is set in .env).
