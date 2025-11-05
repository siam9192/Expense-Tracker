import { Router } from "express";
import userController from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/me", auth([UserRole.USER]), userController.getCurrentUser);

router.post(
  "/me/setup-profile",
  auth([UserRole.USER]),
  userController.setupUserProfile,
);
router.get(
  "/me/settings",
  auth([UserRole.USER]),
  userController.getCurrentUserSettings,
);
router.get(
  "/me/sessions",
  auth([UserRole.USER]),
  userController.getCurrentUserSessions,
);
router.get(
  "/me/balance-updates",
  auth([UserRole.USER]),
  userController.getCurrentUserLatestBalanceUpdates,
);
router.put(
  "/me/profile",
  auth([UserRole.USER]),
  userController.updateCurrentUserProfile,
);
router.put(
  "/me/settings",
  auth([UserRole.USER]),
  userController.updateCurrentUserSettings,
);

router.patch(
  "/me/sessions/:sessionId/revoke",
  auth([UserRole.USER]),
  userController.revokeCurrentUserSession,
);

router.patch(
  "/me/wallet/spendable-balance",
  auth([UserRole.USER]),
  userController.updateCurrentUserSpendableBalance,
);

const userRouter = router;

export default userRouter;
