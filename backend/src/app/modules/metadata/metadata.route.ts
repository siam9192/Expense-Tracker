import { Router } from "express";
import metadataController from "./metadata.controller";

const router = Router();

// 🔹 Summary endpoints
router.get("/me/global", metadataController.getCurrentUserSummary);
router.get("/me/budget", metadataController.getCurrentUserMonthlyBudgetSummary);
router.get(
  "/me/transactions",
  metadataController.getCurrentUserTransactionsSummary,
);
router.get("/me/goals", metadataController.getCurrentUserGoalSummary);
router.get(
  "/me/categories",
  metadataController.getCurrentUserCategoriesSummary,
);

// 🔹 Stats endpoints with optional sequence
router.get("/me/expenses", metadataController.getCurrentUserExpenseStats);
router.get("/me/incomes", metadataController.getCurrentUserIncomeStats);
router.get("/me/finance", metadataController.getCurrentUserFinanceStats);
router.get(
  "/me/expense-categories",
  metadataController.getCurrentUserExpenseCategoryBreakdown,
);

const metadataRouter = router;

export default metadataRouter;
