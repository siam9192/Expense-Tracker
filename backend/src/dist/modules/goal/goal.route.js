"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goal_controller_1 = __importDefault(require("./goal.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const goal_validation_1 = __importDefault(require("./goal.validation"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(goal_validation_1.default.createCurrentUserGoalPayloadValidation), goal_controller_1.default.createGoal);
router.patch("/me/deposit", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(goal_validation_1.default.depositCurrentUserGoalPayloadValidation), goal_controller_1.default.createGoalDeposit);
router.patch("/me/:id/withdraw", (0, auth_1.default)([user_interface_1.UserRole.USER]), goal_controller_1.default.createGoalWithdraw);
router.get("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), goal_controller_1.default.getCurrentUserGoals);
const goalRouter = router;
exports.default = goalRouter;
