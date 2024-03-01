"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const encryption_1 = require("../utils/encryption");
const token_1 = __importDefault(require("../utils/token"));
class AuthController {
    static loginController = async (req, res) => {
        const { email, password } = req.body;
        const user = await (0, user_service_1.findUniqueUser)({ email });
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        const validPassword = await encryption_1.PassowrdProtection.checkPassword(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        const data = {
            userId: user.id,
            role: user.role,
        };
        const token = token_1.default.generateToken(data, {
            secret: "ROBERTSUPERENGINEERXXXXXXXXXXXXXXXXXXXGOGLE",
            expiresIn: "7d",
        });
        return res.status(200).json({ token });
    };
}
exports.default = AuthController;
