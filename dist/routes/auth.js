"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validations_1 = require("../middlewares/validations");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('Hello world');
});
router.post('/signup', validations_1.validateSingUp, auth_controller_1.signUp);
router.post('/signin', validations_1.validateLogin, auth_controller_1.signIn);
router.get('/profile', validations_1.validateToken, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map