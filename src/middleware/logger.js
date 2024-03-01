"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger = (req, res, next) => {
    const { method, path: requestPath, body, user } = req;
    const logData = `[${new Date().toISOString()}] ${method} ${requestPath} ${JSON.stringify(body)} ${JSON.stringify(user || {})}\n`;
    fs_1.default.appendFile(path_1.default.join(__dirname, '..', '..', 'logs', 'access.log'), logData, (err) => {
        if (err) {
            console.error(err);
        }
    });
    res.on('finish', () => {
        const { statusCode } = res;
        const logData = `[${new Date().toISOString()}] ${method} ${requestPath} ${statusCode}\n`;
        fs_1.default.appendFile(path_1.default.join(__dirname, '..', '..', 'logs', 'access.log'), logData, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
    next();
};
exports.default = logger;
