"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = void 0;
const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    if (id !== user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};
exports.isOwner = isOwner;
