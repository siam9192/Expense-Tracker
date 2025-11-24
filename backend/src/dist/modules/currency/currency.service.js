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
const axios_1 = __importDefault(require("axios"));
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
class CurrencyService {
    seedCurrenciesIntoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Check if currencies already exist
            const existingCount = yield prisma_client_1.default.currency.count();
            if (existingCount > 0) {
                return {
                    success: false,
                    message: "Currencies already exist in the database — skipping creation.",
                };
            }
            // 2️⃣ Fetch currencies from REST Countries API
            const { data } = yield axios_1.default.get("https://restcountries.com/v3.1/all?fields=currencies");
            // 3️⃣ Extract unique currencies
            const currencyMap = {};
            data.forEach((country) => {
                if (country.currencies) {
                    for (const [code, info] of Object.entries(country.currencies)) {
                        currencyMap[code] = info;
                    }
                }
            });
            const currencies = Object.entries(currencyMap)
                .map(([code, info]) => ({
                code,
                name: info.name,
                symbol: info.symbol,
            }))
                .filter((_) => _.symbol !== undefined);
            // 4️⃣ Bulk insert
            yield prisma_client_1.default.currency.createMany({
                data: currencies,
                skipDuplicates: true,
            });
            return {
                success: true,
                message: `Inserted ${currencies.length} currencies successfully.`,
            };
        });
    }
    getPublicCurrenciesFromDB(filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search_term } = filterQuery;
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions, {
                defaultSortBy: "name",
            });
            const whereConditions = {};
            if (search_term) {
                whereConditions.OR = [
                    {
                        name: {
                            contains: search_term,
                            mode: "insensitive",
                        },
                    },
                    {
                        code: {
                            contains: search_term,
                            mode: "insensitive",
                        },
                    },
                ];
            }
            const currencies = yield prisma_client_1.default.currency.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            const total_results = yield prisma_client_1.default.currency.count({
                where: whereConditions,
            });
            const meta = {
                page,
                limit,
                total_results,
            };
            return {
                data: currencies,
                meta,
            };
        });
    }
}
exports.default = new CurrencyService();
