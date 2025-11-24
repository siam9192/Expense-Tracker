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
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const constant_1 = require("../../utils/constant");
class ProfessionService {
    seedProfessionsIntoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCount = yield prisma_client_1.default.profession.count();
            if (existingCount > 0) {
                return {
                    success: false,
                    message: "Professions already exist in the database — skipping creation.",
                };
            }
            const professionData = constant_1.DEFAULT_PROFESSIONS.map((name) => ({ name }));
            yield prisma_client_1.default.profession.createMany({
                data: professionData,
                skipDuplicates: true,
            });
            return {
                success: true,
                message: `Inserted ${professionData.length} professions successfully.`,
            };
        });
    }
    getPublicProfessionsFromDB(filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search_term } = filterQuery;
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
            const whereConditions = {};
            if (search_term) {
                whereConditions.name = {
                    contains: search_term,
                    mode: "insensitive",
                };
            }
            const professions = yield prisma_client_1.default.profession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            const total_results = yield prisma_client_1.default.profession.count({
                where: whereConditions,
            });
            const meta = {
                page,
                limit,
                total_results,
            };
            return {
                data: professions,
                meta,
            };
        });
    }
}
exports.default = new ProfessionService();
