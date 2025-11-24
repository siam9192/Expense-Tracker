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
const category_service_1 = __importDefault(require("./category.service"));
class CategoryController {
    constructor() {
        this.getCurrentUserCategories = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_service_1.default.getCurrentUserCategoriesFromDB(req.user, (0, helpers_1.pick)(req.query, ["search_term", "type"]), (0, pagination_helper_1.paginationOptionPicker)(req.query));
            (0, response_1.sendSuccessResponse)(res, Object.assign({ message: "Current user categories retrieved  successfully", status_code: http_status_1.default.OK }, result));
        }));
        this.createCurrentUserCategory = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_service_1.default.createCurrentUserCategory(req.user, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Category created successfully",
                status_code: http_status_1.default.CREATED,
                data: result,
            });
        }));
        this.updateCurrentUserCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_service_1.default.updateCurrentUserCategoryById(req.user, req.params.categoryId, req.body);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Category created successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
        this.softDeleteCurrentUserCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield category_service_1.default.softDeleteCurrentUserCategoryById(req.user, req.params.categoryId);
            (0, response_1.sendSuccessResponse)(res, {
                message: "Category deleted successfully",
                status_code: http_status_1.default.OK,
                data: result,
            });
        }));
    }
}
exports.default = new CategoryController();
