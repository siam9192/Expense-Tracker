import { Router } from "express";
import metadataController from "./metadata.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

// 🔹 Summary endpoints
router.get(
  "/me/global",
  auth([UserRole.USER]),
  metadataController.getCurrentUserSummary,
);
router.get(
  "/me/budget",
  auth([UserRole.USER]),
  metadataController.getCurrentUserMonthlyBudgetSummary,
);
router.get(
  "/me/wallet",
  auth([UserRole.USER]),
  metadataController.getCurrentUserWalletSummary,
);
router.get(
  "/me/transactions",
  auth([UserRole.USER]),
  metadataController.getCurrentUserTransactionsSummary,
);
router.get(
  "/me/goals",
  auth([UserRole.USER]),
  metadataController.getCurrentUserGoalSummary,
);
router.get(
  "/me/categories",
  auth([UserRole.USER]),
  metadataController.getCurrentUserCategoriesSummary,
);
// 🔹 Stats endpoints with optional sequence
router.get(
  "/me/expenses",
  auth([UserRole.USER]),
  metadataController.getCurrentUserExpenseStats,
);
router.get(
  "/me/incomes",
  auth([UserRole.USER]),
  metadataController.getCurrentUserIncomeStats,
);
router.get(
  "/me/finance",
  auth([UserRole.USER]),
  metadataController.getCurrentUserFinanceStats,
);
router.get(
  "/me/categories/expense/breakdown",
  auth([UserRole.USER]),
  metadataController.getCurrentUserExpenseCategoryBreakdown,
);


router.get(
  "/me/notifications",
  auth([UserRole.USER]),
  metadataController.getCurrentUserNotificationsSummary,
);
const metadataRouter = router;

export default metadataRouter;
