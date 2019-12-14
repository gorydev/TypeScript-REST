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
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        // calls the Model method to encrypt the password and assign it to the user
        user.password = yield user.encryptPassword(user.password);
        const newUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, process.env.SECRET_KEY || 'tokentest');
        return res
            .header('Bearer', token)
            .status(201)
            .json(newUser);
    }
    catch (e) {
        res.json(e);
    }
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: req.body.email });
    console.log(req.body);
    if (!user)
        return res.status(401).json('E-mail is not registered');
    const correctPswd = yield user.validatePassword(req.body.password);
    if (!correctPswd)
        return res.status(401).json('Incorrect password');
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY || 'tokentest', {
        expiresIn: 60 * 60 * 24 // 1 day
    });
    return res
        .header('Bearer', token)
        .status(200)
        .json(user);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json('No user found');
    res.json(user);
});
//# sourceMappingURL=auth.controller.js.map