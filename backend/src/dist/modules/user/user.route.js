"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("./user.interface");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = __importDefault(require("./user.validation"));
const router = (0, express_1.Router)();
router.get("/me", (0, auth_1.default)([user_interface_1.UserRole.USER], {
    require_profile_complete: false,
}), user_controller_1.default.getCurrentUser);
router.post("/me/setup-profile", (0, auth_1.default)([user_interface_1.UserRole.USER], {
    require_profile_complete: false,
}), (0, validateRequest_1.default)(user_validation_1.default.setupUserProfilePayloadValidation), user_controller_1.default.setupUserProfile);
router.get("/me/settings", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.getCurrentUserSettings);
router.get("/me/sessions", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.getCurrentUserSessions);
router.get("/me/balance-updates", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.getCurrentUserLatestBalanceUpdates);
router.put("/me/profile", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(user_validation_1.default.updateUserProfilePayloadValidation), user_controller_1.default.updateCurrentUserProfile);
router.put("/me/settings", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(user_validation_1.default.updateCurrentUserSettingsPayloadValidation), user_controller_1.default.updateCurrentUserSettings);
router.patch("/me/sessions/all/revoke", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.revokeCurrentUserAllSession);
router.patch("/me/sessions/:sessionId/revoke", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.revokeCurrentUserSession);
router.patch("/me/wallet/spendable-balance", (0, auth_1.default)([user_interface_1.UserRole.USER]), user_controller_1.default.updateCurrentUserSpendableBalance);
const userRouter = router;
exports.default = userRouter;
