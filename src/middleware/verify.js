"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const token_1 = __importDefault(require("../utils/token"));
const Verify = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).send({ message: "You are not allowed to access this page" });
    }
    try {
        const decoded = token_1.default.verifyToken(token, "ROBERTSUPERENGINEERXXXXXXXXXXXXXXXXXXXGOGLE");
        const userId = decoded.userId;
        // Check for user existence in the database
        const user = await (0, user_service_1.findUniqueUser)({ id: userId });
        if (!user) {
            return res.status(401).send({ message: "Invalid token" });
        }
        if (user?.isBlocked) {
            return res.status(401).send({ message: "You were blocked by the administrator" });
        }
        if (!user?.isActive) {
            return res.status(401).send({ message: "Your account is not active" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(400).send({ message: "Invalid token" });
    }
};
exports.default = Verify;
