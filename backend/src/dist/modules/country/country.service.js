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
class CountryService {
    seedCountriesIntoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Check if countries already exist
            const existingCount = yield prisma_client_1.default.country.count();
            if (existingCount > 0) {
                return {
                    success: false,
                    message: "Countries already exist in the database — skipping creation.",
                };
            }
            // 2️⃣ Fetch countries from API
            const { data } = yield axios_1.default.get("https://restcountries.com/v3.1/all?fields=name,cca2,flags");
            // 3️⃣ Map data to your model
            const countries = data.map((country) => {
                var _a, _b, _c;
                return ({
                    name: ((_a = country.name) === null || _a === void 0 ? void 0 : _a.common) || "Unknown",
                    code: country.cca2 || "",
                    flag_png: ((_b = country.flags) === null || _b === void 0 ? void 0 : _b.png) || "",
                    flag_svg: ((_c = country.flags) === null || _c === void 0 ? void 0 : _c.svg) || "",
                });
            });
            // 4️⃣ Insert all (skip duplicates just in case)
            yield prisma_client_1.default.country.createMany({
                data: countries,
                skipDuplicates: true,
            });
            return {
                success: true,
                message: `Inserted ${countries.length} countries successfully.`,
            };
        });
    }
    getPublicCountriesFromDB(filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search_term } = filterQuery;
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
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
            console.log(paginationOptions);
            const countries = yield prisma_client_1.default.country.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            const total_results = yield prisma_client_1.default.country.count({
                where: whereConditions,
            });
            const meta = {
                page,
                limit,
                total_results,
            };
            return {
                data: countries,
                meta,
            };
        });
    }
}
exports.default = new CountryService();
