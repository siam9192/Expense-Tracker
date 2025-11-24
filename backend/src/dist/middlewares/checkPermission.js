"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../modules/User/user.model"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("../shared/http-status"));
function default_1(...requirePermissions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authUser = req.user;
            if (!authUser) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized user");
            }
            const user = yield user_model_1.default.findById(authUser.userId).select("permissions");
            const permissions = user === null || user === void 0 ? void 0 : user.permissions;
            if (!permissions) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User permissions not found");
            }
            const hasAllPermissions = requirePermissions.every((permission) => {
                var _a;
                if (permission.includes(".")) {
                    const [parent, child] = permission.split(".");
                    return (_a = permissions === null || permissions === void 0 ? void 0 : permissions[parent]) === null || _a === void 0 ? void 0 : _a[child];
                }
                else {
                    return permissions[permission];
                }
            });
            if (!hasAllPermissions) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Access denied: Missing required permission(s)");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = default_1;
