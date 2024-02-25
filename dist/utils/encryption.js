"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassowrdProtection = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PassowrdProtection {
    static checkPassword(password, hashed) {
        return bcryptjs_1.default.compare(password, hashed);
    }
    static hashPassword(password) {
        return bcryptjs_1.default.hash(password, 10);
    }
}
exports.PassowrdProtection = PassowrdProtection;
