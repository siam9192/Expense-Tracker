import { Router } from "express";
import goalController from "./goal.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post("/me", auth([UserRole.USER]), goalController.createGoal);
router.patch(
  "/me/deposit",
  auth([UserRole.USER]),
  goalController.createGoalDeposit,
);
router.patch(
  "/me/withdraw",
  auth([UserRole.USER]),
  goalController.createGoalWithdraw,
);
router.get("/me", auth([UserRole.USER]), goalController.getCurrentUserGoals);

const goalRouter = router;

export default goalRouter;
