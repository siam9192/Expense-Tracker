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
const pagination_helper_1 = require("../../helpers/pagination.helper");
const http_status_1 = __importDefault(require("../../shared/http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const helpers_1 = require("../../utils/helpers");
const response_1 = require("../../utils/response");
const transaction_service_1 = __importDefault(require("./transaction.service"));
class TransactionController {
    constructor() {
        this.getCurrentUserTransactions = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.query);
            const result = yield transaction_service_1.default.getCurrentUserTransactionsFromDB(req.user, (0, helpers_1.pick)(req.query, ["id", "type"]), (0, pagination_helper_1.paginationOptionPicker)(req.query));
            (0, response_1.sendSuccessResponse)(res, Object.assign({ message: "Goals retrieved successfully", status_code: http_status_1.default.OK }, result));
        }));
        this.getCurrentUserTransactionById = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield transaction_service_1.default.getCurrentUserTransactionById(req.user, req.params.id);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Transaction retrieved successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.createTransaction = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield transaction_service_1.default.createTransactionIntoDB(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Transaction created successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
    }
}
exports.default = new TransactionController();
