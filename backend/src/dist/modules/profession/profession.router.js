"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profession_controller_1 = __importDefault(require("./profession.controller"));
const router = (0, express_1.Router)();
router.get("/public", profession_controller_1.default.getPublicProfessions);
const professionRouter = router;
exports.default = professionRouter;
