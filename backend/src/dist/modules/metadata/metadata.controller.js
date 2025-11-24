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
const metadata_service_1 = __importDefault(require("./metadata.service"));
class MetadataController {
    constructor() {
        this.getCurrentUserSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserWalletSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserWalletSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user wallet summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserMonthlyBudgetSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserMonthlyBudgetSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user monthly budget summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserTransactionsSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserTransactionsSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user transactions summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserGoalSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserGoalsSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user goals summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserCategoriesSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserCategoriesSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user categories summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserExpenseStats = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const sequence = req.query.sequence;
            const validSequence = ["day", "month", "year"].includes(sequence)
                ? sequence
                : "day";
            const result = yield metadata_service_1.default.getCurrentUserExpenseStats(req.user, validSequence);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user expense stats retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserIncomeStats = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const sequence = req.query.sequence;
            const validSequence = ["day", "month", "year"].includes(sequence)
                ? sequence
                : "day";
            const result = yield metadata_service_1.default.getCurrentUserIncomeStats(req.user, validSequence);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user income stats retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserFinanceStats = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const sequence = req.query.sequence;
            const validSequence = ["month", "year"].includes(sequence)
                ? sequence
                : "month";
            const result = yield metadata_service_1.default.getCurrentUserFinanceStats(req.user, validSequence);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user finance stats retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserExpenseCategoryBreakdown = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const sequence = req.query.sequence;
            const validSequence = ["month", "year"].includes(sequence)
                ? sequence
                : "month";
            const result = yield metadata_service_1.default.getCurrentUserExpenseCategoryBreakdown(req.user, validSequence);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user finance stats retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.getCurrentUserNotificationsSummary = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield metadata_service_1.default.getCurrentUserNotificationsSummary(req.user);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Current user notifications summary retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
    }
}
exports.default = new MetadataController();
