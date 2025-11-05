import { Router } from "express";
import transactionController from "./transaction.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post("/me", transactionController.createTransaction);

router.get(
  "/me",
  auth([UserRole.USER]),
  transactionController.getCurrentUserTransactions,
);
router.get(
  "/me/:id",
  auth([UserRole.USER]),
  transactionController.getCurrentUserTransactionById,
);

const transitionRouter = router;

export default transitionRouter;
