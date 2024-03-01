"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
const verify_1 = __importDefault(require("../middleware/verify"));
const router = (0, express_1.Router)();
router.post('/create', verify_1.default, chat_controller_1.default.messageController);
exports.default = router;
