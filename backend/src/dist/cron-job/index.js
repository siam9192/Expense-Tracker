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
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_client_1 = __importDefault(require("../prisma-client"));
const client_1 = require("@prisma/client");
function runCronJob() {
    return __awaiter(this, void 0, void 0, function* () {
        node_cron_1.default.schedule("* * * * *", () => __awaiter(this, void 0, void 0, function* () {
            yield prisma_client_1.default.goal.updateMany({
                where: {
                    status: client_1.GoalStatus.ACTIVE,
                    deadline: {
                        lt: new Date(),
                    },
                },
                data: {
                    status: client_1.GoalStatus.FAILED,
                },
            });
            yield prisma_client_1.default.otpVerification.updateMany({
                where: {
                    status: client_1.OTPVerificationStatus.PENDING,
                },
                data: {
                    status: client_1.OTPVerificationStatus.EXPIRED,
                },
            });
        }));
    });
}
exports.default = runCronJob;
