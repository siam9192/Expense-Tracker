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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_helper_1 = require("../../helpers/pagination.helper");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
class CategoryService {
    seedCategoriesIntoDB(userId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    createCurrentUserCategory(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Check if category with same name & type already exists for user
            const existingCategory = yield prisma_client_1.default.category.findUnique({
                where: {
                    user_id_name_type: {
                        user_id: authUser.user_id,
                        name: payload.name.trim(),
                        type: payload.type,
                    },
                },
            });
            if (existingCategory) {
                throw new AppError_1.default(http_status_1.default.CONFLICT, `Category "${payload.name}" already exists in ${payload.type.toLowerCase()} type.`);
            }
            // 2️⃣ Create the new category
            const newCategory = yield prisma_client_1.default.category.create({
                data: {
                    user_id: authUser.user_id,
                    name: payload.name.trim(),
                    type: payload.type,
                    description: payload.description,
                    is_default: false,
                    is_hidden: false,
                },
            });
            return newCategory;
        });
    }
    getCurrentUserCategoriesFromDB(authUser, filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search_term } = filterQuery, other_filters = __rest(filterQuery, ["search_term"]);
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
            const whereConditions = Object.assign({ user_id: authUser.user_id }, other_filters);
            if (search_term) {
                whereConditions.name = {
                    contains: search_term,
                    mode: "insensitive",
                };
            }
            const categories = yield prisma_client_1.default.category.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            const transactions = yield prisma_client_1.default.transaction.findMany({
                where: {
                    user_id: authUser.id,
                    category_id: {
                        in: categories.map((_) => _.id),
                    },
                },
            });
            const data = categories.map((cat) => {
                const catTrans = transactions.filter((t) => t.category_id === cat.id);
                const transactionAmount = catTrans.reduce((sum, t) => {
                    var _a;
                    // If conversion_amount exists, use it; otherwise use amount
                    return sum + ((_a = t.conversion_amount) !== null && _a !== void 0 ? _a : t.amount);
                }, 0);
                return Object.assign(Object.assign({}, cat), { transaction_amount: transactionAmount });
            });
            const total_results = yield prisma_client_1.default.category.count({
                where: whereConditions,
            });
            const meta = {
                page,
                limit,
                total_results,
            };
            return {
                data,
                meta,
            };
        });
    }
    updateCurrentUserCategoryById(authUser, categoryId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            categoryId = Number(categoryId);
            // 1️⃣ Fetch the category to ensure it belongs to the user
            const category = yield prisma_client_1.default.category.findUnique({
                where: {
                    id: categoryId,
                    is_default: false,
                    is_hidden: false,
                    is_deleted: false,
                },
            });
            if (!category || category.user_id !== authUser.user_id) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found or you don't have permission to update it.");
            }
            if (payload.name) {
                // 2️⃣ Check for duplicate name in the same type
                const duplicate = yield prisma_client_1.default.category.findUnique({
                    where: {
                        user_id_name_type: {
                            user_id: authUser.user_id,
                            name: payload.name,
                            type: category.type,
                        },
                    },
                });
                if (duplicate) {
                    throw new AppError_1.default(http_status_1.default.CONFLICT, `Category "${payload.name}" already exists in ${category.type.toLowerCase()} type.`);
                }
            }
            // 3️⃣ Update only the name
            const updatedCategory = yield prisma_client_1.default.category.update({
                where: { id: categoryId },
                data: Object.assign({}, payload),
            });
            return updatedCategory;
        });
    }
    softDeleteCurrentUserCategoryById(authUser, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Fetch the category to ensure it belongs to the user
            const category = yield prisma_client_1.default.category.findUnique({
                where: {
                    id: parseInt(categoryId, 10),
                    is_default: false,
                    is_hidden: false,
                    is_deleted: false,
                },
            });
            if (!category || category.user_id !== authUser.user_id) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found or you don't have permission to delete it.");
            }
            // 2️⃣ Prevent deletion of default or hidden system categories
            if (category.is_default || category.is_hidden) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This category cannot be deleted.");
            }
            // 3️⃣ Soft delete: mark as deleted
            const deletedCategory = yield prisma_client_1.default.category.update({
                where: { id: parseInt(categoryId, 10) },
                data: { is_deleted: true },
            });
            return null;
        });
    }
}
exports.default = new CategoryService();
