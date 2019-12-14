"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.validateToken = (req, res, next) => {
    const userToken = req.header('Bearer');
    if (!userToken)
        return res.status(401).json('Access denied');
    const payload = jsonwebtoken_1.default.verify(userToken, process.env.SECRET_KEY || 'tokentest');
    console.log(payload);
    // userId doesnt exist on Request interface hence I need to extend it trough "declaration mergin"
    req.userId = payload._id;
    next();
};
//# sourceMappingURL=validateToken.js.map