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
exports.calculateGrowth = exports.sumTransactions = exports.getLocationDetailsByIp = exports.getCurrencyConversionRate = exports.throwInternalError = exports.generateOTP = exports.flattenObject = exports.formatSecret = exports.isNumber = exports.generateChar = exports.generateTransactionId = exports.generateSlug = void 0;
const http_status_1 = __importDefault(require("../shared/http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const constant_1 = require("../utils/constant");
const axios_1 = __importDefault(require("axios"));
const env_config_1 = __importDefault(require("../config/env.config"));
function generateSlug(name) {
    return name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .trim(); // Remove leading/trailing spaces
}
exports.generateSlug = generateSlug;
function generateTransactionId(length = 10) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let transactionId = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        transactionId += characters[randomIndex];
    }
    return transactionId;
}
exports.generateTransactionId = generateTransactionId;
function generateChar(length = 20) {
    let secret = "";
    const source = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * source.length);
        secret += source[randomIndex];
    }
    return secret;
}
exports.generateChar = generateChar;
function isNumber(value) {
    return !isNaN(parseInt(value));
}
exports.isNumber = isNumber;
function formatSecret(secret, perChunk = 4) {
    const step = Math.floor(secret.length / perChunk);
    const arr = Array.from({ length: step + 1 }, (_, i) => secret.slice(i * perChunk, i * perChunk + perChunk)).filter((_) => _);
    return arr.join("-");
}
exports.formatSecret = formatSecret;
function flattenObject(obj, parent = "", result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = parent ? `${parent}.${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
            flattenObject(value, fullKey, result);
        }
        else {
            result[fullKey] = value;
        }
    }
    return result;
}
exports.flattenObject = flattenObject;
function generateOTP(length = 6) {
    const digits = [];
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * 10); // 0–9
        digits.push(random);
    }
    return digits.join("");
}
exports.generateOTP = generateOTP;
function throwInternalError() {
    throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, constant_1.GLOBAL_ERROR_MESSAGE);
}
exports.throwInternalError = throwInternalError;
function getCurrencyConversionRate(from, to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!from || !to) {
            return null;
        }
        if (!amount || amount <= 0) {
            return null;
        }
        try {
            const res = yield axios_1.default.get(`https://api.exchangerate-api.com/v4/latest/${from}`, {
                params: {
                    api_key: env_config_1.default.exchange_rate.api_key,
                },
            });
            const rate = res.data.rates[to];
            if (rate == null) {
                return null;
            }
            return {
                currency: to,
                rate,
                convertedAmount: amount * rate,
            };
        }
        catch (err) {
            return null;
        }
    });
}
exports.getCurrencyConversionRate = getCurrencyConversionRate;
function getLocationDetailsByIp(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`https://ipapi.co/${ip}/json/`);
            if (!data || data.error) {
                return null;
            }
            const addressParts = [
                data.city,
                data.region,
                data.country_name,
                data.postal,
            ].filter(Boolean);
            const addressString = addressParts.join(", ");
            return {
                ip,
                address_str: addressString,
                location: data,
            };
        }
        catch (error) {
            return null;
        }
    });
}
exports.getLocationDetailsByIp = getLocationDetailsByIp;
function sumTransactions(transactions) {
    let income = 0, expense = 0;
    transactions.forEach((item) => {
        var _a, _b;
        const value = (_b = (_a = item._sum.conversion_amount) !== null && _a !== void 0 ? _a : item._sum.amount) !== null && _b !== void 0 ? _b : 0;
        if (item.type === "INCOME")
            income += value;
        if (item.type === "EXPENSE")
            expense += value;
    });
    return { income, expense };
}
exports.sumTransactions = sumTransactions;
function calculateGrowth(current, previous) {
    if (previous === 0)
        return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
}
exports.calculateGrowth = calculateGrowth;
