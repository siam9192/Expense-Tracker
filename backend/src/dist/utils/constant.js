"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CATEGORIES = exports.DEFAULT_PROFESSIONS = exports.DEFAULT_AVATARS = exports.FAST_FOREX_EXCHANGE_RATE_API = exports.GLOBAL_ERROR_MESSAGE = exports.ALL_ROLES = exports.PAGINATION_OPTION_KEYS = void 0;
const user_interface_1 = require("../modules/user/user.interface");
exports.PAGINATION_OPTION_KEYS = ["page", "limit", "sortBy", "sortOrder"];
exports.ALL_ROLES = Object.values(user_interface_1.UserRole);
exports.GLOBAL_ERROR_MESSAGE = "Oops! There is something happened wrong.Please try again later";
exports.FAST_FOREX_EXCHANGE_RATE_API = "https://api.fastforex.io/fetch-one?from=USD&to=EUR";
exports.DEFAULT_AVATARS = [
    {
        name: "Man Avatar",
        src: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
        name: "Woman Avatar",
        src: "https://img.freepik.com/premium-vector/woman-avatar-profile-picture-isolated-background-avatar-profile-picture-woman_1293239-4867.jpg?w=740",
    },
    {
        name: "Businessman Avatar",
        src: "https://img.freepik.com/premium-vector/businessman-avatar-profile-picture_1293239-4845.jpg?w=740",
    },
    {
        name: "Girl Avatar",
        src: "https://img.freepik.com/premium-vector/girl-avatar-profile-picture_1293239-4846.jpg?w=740",
    },
    {
        name: "Young Man Avatar",
        src: "https://img.freepik.com/premium-vector/young-man-avatar-profile-picture_1293239-4859.jpg?w=740",
    },
    {
        name: "Female Avatar",
        src: "https://img.freepik.com/premium-vector/female-avatar-profile-picture_1293239-4860.jpg?w=740",
    },
    {
        name: "Teen Boy Avatar",
        src: "https://img.freepik.com/premium-vector/teen-boy-avatar-profile-picture_1293239-4861.jpg?w=740",
    },
    {
        name: "Teen Girl Avatar",
        src: "https://img.freepik.com/premium-vector/teen-girl-avatar-profile-picture_1293239-4862.jpg?w=740",
    },
    {
        name: "Old Man Avatar",
        src: "https://img.freepik.com/premium-vector/old-man-avatar-profile-picture_1293239-4863.jpg?w=740",
    },
    {
        name: "Old Woman Avatar",
        src: "https://img.freepik.com/premium-vector/old-woman-avatar-profile-picture_1293239-4864.jpg?w=740",
    },
];
exports.DEFAULT_PROFESSIONS = [
    "Software Engineer",
    "Web Developer",
    "Mobile App Developer",
    "Data Scientist",
    "UX/UI Designer",
    "Product Manager",
    "Project Manager",
    "Graphic Designer",
    "Digital Marketer",
    "Content Writer",
    "Copywriter",
    "SEO Specialist",
    "Social Media Manager",
    "Accountant",
    "Financial Analyst",
    "HR Manager",
    "Teacher",
    "Professor",
    "Doctor",
    "Nurse",
    "Lawyer",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Architect",
    "Consultant",
    "Entrepreneur",
    "Photographer",
    "Videographer",
    "Animator",
    "Musician",
    "Artist",
    "Athlete",
    "Pilot",
    "Journalist",
    "Translator",
    "Librarian",
];
// Default visible categories for all users
exports.DEFAULT_CATEGORIES = [
    // INCOME
    {
        name: "Salary",
        type: "INCOME",
        is_default: true,
        is_hidden: false,
        description: "Salary represents the fixed or variable income that a user earns from their regular employment. It is typically received monthly or biweekly and forms the primary source of income for most users, helping to manage their financial stability and budgeting plans effectively.",
    },
    {
        name: "Business / Self-Employment",
        type: "INCOME",
        is_default: true,
        is_hidden: false,
        description: "Business or Self-Employment income includes all earnings generated from independent work, freelancing, or running a personal business. This category helps users track entrepreneurial income separately from regular salary and understand their total earnings more accurately for tax and financial planning purposes.",
    },
    {
        name: "Gift",
        type: "INCOME",
        is_default: true,
        is_hidden: false,
        description: "Gift income represents any money received as gifts from friends, family, or others. Tracking gift income separately allows users to distinguish between earned and unearned money, providing a clearer picture of disposable income and helping to plan for savings and personal expenses.",
    },
    // EXPENSE
    {
        name: "Food & Dining",
        type: "EXPENSE",
        is_default: true,
        is_hidden: false,
        description: "Food & Dining includes all expenses related to meals, groceries, restaurants, cafes, and snacks. Tracking this category allows users to monitor their spending on everyday nutrition, plan budgets effectively, and make informed choices to maintain a balanced financial lifestyle.",
    },
    {
        name: "Transport",
        type: "EXPENSE",
        is_default: true,
        is_hidden: false,
        description: "Transport expenses cover costs related to commuting, public transportation, fuel, vehicle maintenance, ride-sharing services, and parking. Monitoring this category helps users understand their mobility-related spending, optimize travel costs, and plan budgets for transportation more efficiently.",
    },
    {
        name: "Shopping",
        type: "EXPENSE",
        is_default: true,
        is_hidden: false,
        description: "Shopping includes all discretionary purchases such as clothing, electronics, personal items, and gifts. Tracking shopping expenses separately allows users to analyze non-essential spending patterns, manage personal budgets more effectively, and identify opportunities to save or reduce unnecessary expenditures.",
    },
    {
        name: "Bills & Utilities",
        type: "EXPENSE",
        is_default: true,
        is_hidden: false,
        description: "Bills & Utilities encompass recurring household and personal expenses such as electricity, water, gas, internet, phone bills, and other necessary services. Monitoring this category helps users plan fixed monthly expenses, avoid overdue payments, and maintain financial stability through effective budgeting.",
    },
    {
        name: "Entertainment",
        type: "EXPENSE",
        is_default: true,
        is_hidden: false,
        description: "Entertainment expenses cover activities such as movies, concerts, hobbies, subscriptions, and leisure events. Tracking this category enables users to monitor non-essential spending, understand lifestyle choices, and ensure that entertainment costs remain within a sustainable budget to maintain overall financial health.",
    },
    // SAVING (System Categories)
    {
        name: "Goal Deposit",
        type: "SAVING",
        is_default: true,
        is_hidden: true,
        description: "Goal Deposit is a system category used internally to track funds transferred into a user's savings goal. It allows the app to manage dedicated savings separately from the main available balance, ensuring accurate tracking of saved money, financial goals, and progress toward long-term objectives without affecting regular income or expenses.",
    },
    {
        name: "Goal Withdrawal",
        type: "SAVING",
        is_default: true,
        is_hidden: true,
        description: "Goal Withdrawal is a system category used internally when funds are released from a savings goal and become available to spend. It ensures accurate accounting of goal-based savings, helps maintain the integrity of financial reports, and provides a seamless experience for tracking funds that transition from restricted to accessible balances.",
    },
];
