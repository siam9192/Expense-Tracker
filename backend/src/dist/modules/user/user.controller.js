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
const http_status_1 = __importDefault(require("../../shared/http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const response_1 = require("../../utils/response");
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    constructor() {
        this.setupUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.setupUserProfileIntoDB(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Profile setup completed",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.updateCurrentUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.updateCurrentUserProfileIntoDB(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Profile updated successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUser = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.getCurrentUserFromDB(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserSettings = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.getCurrentUserSettingsFromDB(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user settings retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserSessions = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.getCurrentUserSessionsFromDB(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user sessions retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserLatestBalanceUpdates = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.getCurrentUserLatestBalanceUpdatesFromDB(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Latest balance retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.revokeCurrentUserSession = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.revokeUserSessionIntoDB(req.user, req.params.sessionId);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user session revoked successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.revokeCurrentUserAllSession = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.revokeUserAllSessionIntoDB(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "All session revoked successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.updateCurrentUserSettings = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.updateCurrentUserSettingsIntoDB(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user settings updated successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.updateCurrentUserSpendableBalance = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.default.updateCurrentUserSpendableBalanceIntoDB(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Balance updated successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
    }
}
exports.default = new UserController();
