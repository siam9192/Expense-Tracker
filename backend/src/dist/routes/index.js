"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const country_route_1 = __importDefault(require("../modules/country/country.route"));
const avatar_route_1 = __importDefault(require("../modules/avatar/avatar.route"));
const profession_router_1 = __importDefault(require("../modules/profession/profession.router"));
const currency_route_1 = __importDefault(require("../modules/currency/currency.route"));
const category_route_1 = __importDefault(require("../modules/category/category.route"));
const goal_route_1 = __importDefault(require("../modules/goal/goal.route"));
const transaction_route_1 = __importDefault(require("../modules/transaction/transaction.route"));
const notification_route_1 = __importDefault(require("../modules/notification/notification.route"));
const metadata_route_1 = __importDefault(require("../modules/metadata/metadata.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        router: auth_route_1.default,
    },
    {
        path: "/users",
        router: user_route_1.default,
    },
    {
        path: "/categories",
        router: category_route_1.default,
    },
    {
        path: "/avatars",
        router: avatar_route_1.default,
    },
    {
        path: "/countries",
        router: country_route_1.default,
    },
    {
        path: "/professions",
        router: profession_router_1.default,
    },
    {
        path: "/currencies",
        router: currency_route_1.default,
    },
    {
        path: "/goals",
        router: goal_route_1.default,
    },
    {
        path: "/transactions",
        router: transaction_route_1.default,
    },
    {
        path: "/notifications",
        router: notification_route_1.default,
    },
    {
        path: "/metadata",
        router: metadata_route_1.default,
    },
];
const routes = moduleRoutes.map((route) => router.use(route.path, route.router));
exports.default = routes;
