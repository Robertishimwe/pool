"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const client_1 = require("@prisma/client");
const isAdmin = (req, res, next) => {
    const { user } = req;
    if (!user || user.role !== client_1.Role.ADMIN) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
exports.isAdmin = isAdmin;
