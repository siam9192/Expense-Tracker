"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config({ path: node_path_1.default.join((process.cwd(), ".env")) });
const envConfig = {
    environment: process.env.ENVIRONMENT,
    url: {
        database: process.env.DATABASE_URL,
    },
    exchange_rate: {
        api_key: process.env.EXCHANGE_RATE_API_KEY,
    },
    app: {
        user_name: process.env.APP_USER_NAME,
        pass_key: process.env.APP_PASS_KEY,
    },
    jwt: {
        access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        otp_verification_token_secret: process.env.OTP_VERIFICATION_TOKEN_SECRET,
    },
    open_ai: {
        api_key: process.env.OPEN_API_API_KEY,
    },
};
exports.default = envConfig;
