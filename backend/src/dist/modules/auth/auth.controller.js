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
const auth_service_1 = __importDefault(require("./auth.service"));
const response_1 = require("../../utils/response");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
class AuthController {
    constructor() {
        this.userSignup = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.initUserIntoDB(req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "OTP sent to email",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.resendVerificationOTP = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.resendVerificationOTP(req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "OTP resent to email",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.verifyUserSignup = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.verifyInitUser(req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Account verified successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.userSignin = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.userLogin(req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Sign in successful",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.userSignout = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.useSignout(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Signout successful",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.changePassword(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Password has been changed successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getNewAccessToken = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield auth_service_1.default.getNewAccessToken(req.body.refreshToken);
            (0, response_1.sendSuccessResponse)(res, {
                message: "New access token retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
    }
}
exports.default = new AuthController();
