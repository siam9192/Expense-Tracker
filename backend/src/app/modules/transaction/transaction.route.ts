import { Router } from "express";
import transactionController from "./transaction.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import transactionValidation from "./transaction.validation";

const router = Router();

router.post(
  "/me",
  auth([UserRole.USER]),
  validateRequest(transactionValidation.createTransactionPayloadValidation),
  transactionController.createTransaction,
);

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
