import "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      // Sidebar Routes
      dashboard: "Dashboard",
      wallet: "Wallet",
      goals: "Goals",
      transactions: "Transactions",
      categories: "Categories",
      settings: "Settings",
      signOut: "Sign Out",

      profile: "Profile",
      security: "Security",

      // General
      welcomeMessage: "Welcome back, {{name}}!!",
      availableBalance: "Available Balance",
      income: "Income",
      expense: "Expense",
      used: "used",
      others: "Others",
      loadMore: "Load More",
      loadingMore: "Loading more...",
      overview: "Overview",

      update: "Update",
      configure: "Configure",
      manage: "Manage",
      editProfile: "Edit Profile",
      noResults: "No Results",
      viewDetails: "View Details",
      // Dashboard
      activeWallets: "Active Wallets",
      monthlyGrowth: "Monthly Growth",
      monthlyIncome: "Monthly Income",
      budgetLimit: "Budget Limit",
      budgetUsage: "Budget Usage",
      expenseStatistics: "Expense Statistics",
      incomeStatistics: "Income Statistics",
      financeStatistics: "Finance Statistics",
      recentBalanceEdits: "Recent Balance Edits",
      recentPayments: "Recent Payments",
      monthlyExpenses: "Monthly Expenses",
      monthlyPerformance: "This month’s performance",
      joined: "Joined",
      spent: "Gastado",
      // Menu
      accountSettings: "Account Settings",
      privacySecurity: "Privacy & Security",
      privacySecurityDesc: "Manage passwords, sessions, and 2FA authentication.",
      notifications: "Notifications",
      notificationsDesc: "Configure push and email alerts for account activity",
      accountPreferences: "Account Preferences",
      accountPreferencesDesc: "Change theme, language, and time zone preferences.",
      logout: "Logout",

      logoutDesc: "Sign out from this account securely.",

      // Transactions
      transactionsOverview: "Transactions Overview",
      last30Days: "Last 30 days",
      yourTransactions: "Your Transactions",
      createTransaction: "Create Transaction",
      addNewTransaction: "Add New Transaction",

      // Balance Overview
      totalBalance: "Total Balance",
      spendableBalance: "Spendable Balance",
      onSavings: "On Savings",
      pendingBills: "Pending Bills",
      monthlyBudget: "Monthly Budget",
      lastMonthSpent: "Last Month Spent",
      userIncomeStats: "User Income Statistics",

      // Categories
      unusedCategories: "Unused Categories",
      mostUsedCategory: "Most Used Category",
      mostUsedPercentage: "Most Used Percentage",
      yourCategories: "Your Categories",
      createCategory: "Create Category",
      createCategoryModalTitle: "Create Your New Category",
      // Goals
      goalsOverview: "Goals Overview",
      yourGoals: "Your Goals",
      createYourNewGoal: "Create Your New Goal",
      availableSavings: "Available Savings",
      achieved: "Achieved",
      avgProgress: "Avg Progress",
      ongoing: "Ongoing",
      createGoal: "Create Goal",

      // Profile
      profileSettings: "Profile Settings",
      fullName: "Full Name",
      email: "Email",
      gender: "Gender",
      country: "Country",

      // Wallet
      myWallet: "My Wallet",
      walletSettings: "Wallet Settings",
      currency: "Select preferred currency",
      monthlySpendingLimit: "Monthly Spending Limit",
      monthlySpendingLimitDesc: "Set your maximum monthly expense limit",
      autoSaveMode: "Auto-Save Mode",
      autoSaveModeDesc: "Automatically save a portion of income each month",
      notificationAlertDesc: "Get alerts for expenses and balance updates",
      emailNotifications: "Email Notifications",
      smsAlerts: "SMS Alerts",
      transactionUpdates: "Transaction Updates",

      // Security
      securitySettings: "Security Settings",
      oldPassword: "Old Password",
      newPassword: "New Password",
      logoutFromOthers: "Logout from others",
      updatePassword: "Update Password",
      activeSessions: "Active Sessions",
      activeSessionsDesc: "Manage your logged-in devices and revoke access to inactive sessions.",

      // Notification settings
      notificationSettings: "Notification Settings",
    },
  },

  // ---------------------------------------------------
  // 🇧🇩 Bangla (bn)
  // ---------------------------------------------------
  bn: {
    translation: {
      // Sidebar
      dashboard: "ড্যাশবোর্ড",
      wallet: "ওয়ালেট",
      goals: "লক্ষ্যসমূহ",
      transactions: "লেনদেনসমূহ",
      categories: "ক্যাটাগরিসমূহ",
      signOut: "সাইন আউট",
      settings: "সেটিংস",
      profile: "প্রোফাইল",
      security: "সিকিউরিটি",
      // General
      welcomeMessage: "ফিরে আসার জন্য ধন্যবাদ, {{name}}!!",
      availableBalance: "অবশিষ্ট ব্যালেন্স",
      income: "আয়",
      expense: "ব্যয়",
      used: "ব্যবহৃত",
      others: "অন্যান্য",
      loadMore: "আরো দেখুন",
      loadingMore: "আরও লোড হচ্ছে...",
      overview: "ওভারভিউ",

      update: "আপডেট",
      configure: "কনফিগার",
      manage: "ম্যানেজ",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      noResults: "কোনো ফলাফল নেই",
      viewDetails: "বিস্তারিত দেখুন",
      // Dashboard
      activeWallets: "একটিভ ওয়ালেট",
      monthlyGrowth: "মাসিক বৃদ্ধি",
      monthlyIncome: "মাসিক আয়",
      budgetLimit: "বাজেট সীমা",
      budgetUsage: "বাজেট ব্যবহার",
      expenseStatistics: "ব্যয় পরিসংখ্যান",
      incomeStatistics: "আয় পরিসংখ্যান",
      financeStatistics: "আর্থিক পরিসংখ্যান",
      recentBalanceEdits: "সাম্প্রতিক ব্যালেন্স পরিবর্তন",
      recentPayments: "সাম্প্রতিক পেমেন্টসমুহ",
      monthlyExpenses: "মাসিক ব্যয়সমূহ",
      monthlyPerformance: "এই মাসের পারফরম্যান্স",
      joined: "যুক্ত হয়েছেন",
      spent: "খরচ",
      // Menu
      accountSettings: "অ্যাকাউন্ট সেটিংস",
      privacySecurity: "গোপনীয়তা ও নিরাপত্তা",
      privacySecurityDesc: "পাসওয়ার্ড, সেশন এবং 2FA ম্যানেজ করুন।",
      notifications: "নোটিফিকেশসমূহ",
      notificationsDesc: "অ্যাকাউন্ট কার্যকলাপের জন্য নোটিফিকেশন কনফিগার করুন",
      accountPreferences: "অ্যাকাউন্ট প্রিফারেন্স",
      accountPreferencesDesc: "থিম, ভাষা এবং টাইমজোন পরিবর্তন করুন।",
      logout: "লগআউট",
      logoutDesc: "নিরাপদভাবে এই একাউন্ট থেকে সাইন আউট করুন।",

      // Transactions
      transactionsOverview: "লেনদেনের ওভারভিউ",
      last30Days: "শেষ ৩০ দিন",
      yourTransactions: "আপনার লেনদেনসমুহ",
      createTransaction: "নতুন লেনদেন তৈরি করুন",
      addNewTransaction: "নতুন লেনদেন যোগ করুন",

      // Balance Overview
      totalBalance: "মোট ব্যালেন্স",
      spendableBalance: "ব্যবহারযোগ্য ব্যালেন্স",
      onSavings: "সঞ্চয়ে",
      pendingBills: "অমীমাংসিত বিল",
      monthlyBudget: "মাসিক বাজেট",
      lastMonthSpent: "গত মাসের ব্যয়",
      userIncomeStats: "আয়ের পরিসংখ্যান",

      // Categories
      unusedCategories: "অব্যবহৃত ক্যাটেগরিসমুহ",
      mostUsedCategory: "সবচেয়ে ব্যবহৃত ক্যাটেগরি",
      mostUsedPercentage: "ব্যবহারের শতাংশ",
      yourCategories: "আপনার ক্যাটেগরিসমুহ",
      createCategory: "নতুন ক্যাটাগরি তৈরি করুন",
      createCategoryModalTitle: "আপনার নতুন ক্যাটাগরি তৈরি করুন",

      // Profile
      profileSettings: "প্রোফাইল সেটিংস",
      fullName: "পূর্ণ নাম",
      email: "ইমেইল",
      gender: "লিঙ্গ",
      country: "দেশ",

      // Wallet
      myWallet: "আমার ওয়ালেট",
      walletSettings: "ওয়ালেট সেটিংস",
      currency: "পছন্দের মুদ্রা নির্বাচন করুন",
      monthlySpendingLimit: "মাসিক ব্যয়ের সীমা",
      monthlySpendingLimitDesc: "আপনার সর্বোচ্চ মাসিক ব্যয় সীমা নির্ধারণ করুন",
      autoSaveMode: "অটো-সেভ মোড",
      autoSaveModeDesc: "প্রতি মাসে স্বয়ংক্রিয়ভাবে আয়ের একটি অংশ সঞ্চয় করুন",
      notificationAlertDesc: "ব্যয় ও ব্যালেন্স আপডেটের জন্য নোটিফিকেশন পান",
      emailNotifications: "ইমেইল নোটিফিকেশন",
      smsAlerts: "এসএমএস সতর্কতা",
      transactionUpdates: "লেনদেন আপডেট",

      // Goals",
      goalsOverview: "লক্ষ্যের সংক্ষিপ্তসার",
      yourGoals: "আপনার লক্ষ্যসমূহ",
      createYourNewGoal: "আপনার নতুন লক্ষ্য তৈরি করুন",
      availableSavings: "উপলভ্য সঞ্চয়",
      achieved: "সফল হয়েছে",
      avgProgress: "গড় অগ্রগতি",
      ongoing: "চলমান",
      createGoal: "লক্ষ্য তৈরি করুন",

      // Security
      securitySettings: "নিরাপত্তা সেটিংস",
      oldPassword: "পুরাতন পাসওয়ার্ড",
      newPassword: "নতুন পাসওয়ার্ড",
      logoutFromOthers: "অন্যান্য ডিভাইস থেকে লগআউট",
      updatePassword: "পাসওয়ার্ড আপডেট",
      activeSessions: "সক্রিয় সেশন",
      activeSessionsDesc: "আপনার লগইন করা ডিভাইসগুলো পরিচালনা করুন এবং নিষ্ক্রিয় সেশন বন্ধ করুন।",

      // Notifications settings
      notificationSettings: "নোটিফিকেশন সেটিংস",
    },
  },

  // ---------------------------------------------------
  // 🇪🇸 Spanish (es)
  // ---------------------------------------------------
  es: {
    translation: {
      // Sideber
      dashboard: "Tablero",
      wallet: "Cartera",
      goals: "Metas",
      transactions: "Transacciones",
      categories: "Categorías",
      signOut: "Cerrar sesión",
      settings: "Configuración",
      profile: "Perfil",
      security: "Seguridad",
      // General
      welcomeMessage: "¡Bienvenido de nuevo, {{name}}!",
      availableBalance: "Saldo disponible",
      income: "Ingreso",
      expense: "Gasto",
      used: "usado",
      others: "Otros",
      loadMore: "Cargar más",
      loadingMore: "Cargando más...",
      overview: "Resumen",

      update: "Actualizar",
      configure: "Configurar",
      manage: "Gestionar",
      editProfile: "Editar perfil",
      noResults: "Sin resultados",
      viewDetails: "Ver detalles",
      // Dashboard
      activeWallets: "Carteras activas",
      monthlyGrowth: "Crecimiento mensual",
      monthlyIncome: "Ingreso mensual",
      budgetLimit: "Límite de presupuesto",
      budgetUsage: "Uso del presupuesto",
      spent: "Gastado",
      incomeStatistics: "Estadísticas de ingresos",
      expenseStatistics: "Estadísticas de gastos",
      financeStatistics: "Estadísticas financieras",
      recentBalanceEdits: "Ediciones recientes de balance",
      recentPayments: "Pagos recientes",
      monthlyExpenses: "Gastos mensuales",
      monthlyPerformance: "Desempeño del mes",
      joined: "Unido",

      // Menu
      accountSettings: "Configuración de la cuenta",
      privacySecurity: "Privacidad y seguridad",
      privacySecurityDesc: "Administra contraseñas, sesiones y autenticación 2FA.",
      notifications: "Notificaciones",
      notificationsDesc: "Configura alertas por correo y notificaciones push",
      accountPreferences: "Preferencias de la cuenta",
      accountPreferencesDesc: "Cambiar tema, idioma y configuración de zona horaria.",
      logout: "Cerrar sesión",
      logoutDesc: "Cierra sesión de esta cuenta de forma segura.",

      // Transactions
      transactionsOverview: "Resumen de Transacciones",

      last30Days: "Últimos 30 días",
      yourTransactions: "Tus transacciones",
      createTransaction: "Crear transacción",
      addNewTransaction: "Agregar nueva transacción",

      // Balance
      totalBalance: "Saldo total",
      spendableBalance: "Saldo disponible",
      onSavings: "En ahorros",
      pendingBills: "Facturas pendientes",
      monthlyBudget: "Presupuesto mensual",
      lastMonthSpent: "Gastos del mes pasado",
      userIncomeStats: "Estadísticas de ingresos",

      // Categories

      unusedCategories: "Categorías no utilizadas",
      mostUsedCategory: "Categoría más utilizada",
      mostUsedPercentage: "Porcentaje de uso",
      yourCategories: "Tus categorías",
      createCategory: "Crear categoría",
      createCategoryModalTitle: "Crea tu nueva categoría",
      // Profile
      profileSettings: "Configuración del perfil",
      fullName: "Nombre completo",
      email: "Correo electrónico",
      gender: "Género",
      country: "País",

      // Wallet
      myWallet: "Mi billetera",
      walletSettings: "Configuración de la cartera",
      currency: "Seleccionar moneda preferida",
      monthlySpendingLimit: "Límite de gasto mensual",
      monthlySpendingLimitDesc: "Establece tu límite máximo de gasto mensual",
      autoSaveMode: "Modo de autoahorro",
      autoSaveModeDesc: "Ahorra automáticamente una parte de tus ingresos cada mes",
      notificationAlertDesc: "Recibe alertas sobre gastos y actualizaciones de saldo",
      emailNotifications: "Notificaciones por correo",
      smsAlerts: "Alertas por SMS",
      transactionUpdates: "Actualizaciones de transacciones",

      // Goals
      goalsOverview: "Resumen de Metas",
      yourGoals: "Tus Metas",
      createYourNewGoal: "Crea Tu Nueva Meta",
      availableSavings: "Ahorros Disponibles",
      achieved: "Logrado",
      avgProgress: "Progreso Promedio",
      ongoing: "En Curso",
      createGoal: "Crear Meta",

      // Security settings
      securitySettings: "Configuración de seguridad",
      oldPassword: "Contraseña anterior",
      newPassword: "Nueva contraseña",
      logoutFromOthers: "Cerrar sesión en otros dispositivos",
      updatePassword: "Actualizar contraseña",
      activeSessions: "Sesiones activas",
      activeSessionsDesc: "Administra tus dispositivos conectados y revoca sesiones inactivas.",

      // Notification settings
      notificationSettings: "Configuración de notificaciones",
    },
  },
};
(i18n.use(initReactI18next),
  i18n.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    resources: resources,
  }));

export default i18n;
