"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const category_controller_1 = __importDefault(require("./category.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = __importDefault(require("./category.validation"));
const router = (0, express_1.Router)();
router.get("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), category_controller_1.default.getCurrentUserCategories);
router.post("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(category_validation_1.default.createCurrentUserCategoryPayloadValidation), category_controller_1.default.createCurrentUserCategory);
router.put("/me/:categoryId", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(category_validation_1.default.updateCurrentUserCategoryPayloadValidation), category_controller_1.default.updateCurrentUserCategoryById);
router.delete("/me/:categoryId", (0, auth_1.default)([user_interface_1.UserRole.USER]), category_controller_1.default.softDeleteCurrentUserCategoryById);
const categoryRouter = router;
exports.default = categoryRouter;
