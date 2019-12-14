"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("@hapi/joi"));
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
exports.validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    try {
        yield schema.validateAsync(req.body);
    }
    catch (e) {
        res.status(400);
        next(e);
    }
    next();
});
exports.validateSingUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        username: joi_1.default.string()
            .min(4)
            .required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    try {
        yield schema.validateAsync(req.body);
    }
    catch (e) {
        res.status(400);
        next(e);
    }
    next();
});
//# sourceMappingURL=validations.js.map