import { Router } from "express";
import goalController from "./goal.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";
import goalValidation from "./goal.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/me",
  auth([UserRole.USER]),
  validateRequest(goalValidation.createCurrentUserGoalPayloadValidation),
  goalController.createGoal,
);
router.patch(
  "/me/deposit",
  auth([UserRole.USER]),
  validateRequest(goalValidation.depositCurrentUserGoalPayloadValidation),
  goalController.createGoalDeposit,
);
router.patch(
  "/me/:id/withdraw",
  auth([UserRole.USER]),
  goalController.createGoalWithdraw,
);
router.get("/me", auth([UserRole.USER]), goalController.getCurrentUserGoals);

const goalRouter = router;

export default goalRouter;
