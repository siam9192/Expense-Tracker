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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("../shared/http-status"));
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma_client_1 = __importDefault(require("../prisma-client"));
const client_1 = require("@prisma/client");
function auth(requiredRoles, configs) {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // checking if the given token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, env_config_1.default.jwt.access_token_secret);
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized");
        }
        // checking if the user is exist
        const user = yield prisma_client_1.default.user.findUnique({
            where: {
                id: decoded.user_id,
            },
            include: {
                auth_info: true,
            },
        });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
        }
        if ((configs === null || configs === void 0 ? void 0 : configs.require_profile_complete) !== false &&
            user.isSetupComplete === false) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user profile setup completely !");
        }
        // checking if the user is already deleted
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted ! !");
        }
        // checking if the user is blocked
        if (user.status === client_1.UserStatus.BLOCKED) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
        }
        const session = yield prisma_client_1.default.session.findUnique({
            where: { id: decoded.session_id, status: client_1.SessionStatus.ACTIVE },
        });
        if (!session) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, // 401 status code
            "Session not found or already logged out");
        }
        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized  !");
        }
        req.user = decoded;
        next();
    }));
}
exports.default = auth;
