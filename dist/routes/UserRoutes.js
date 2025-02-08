"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserService_1 = __importDefault(require("../service/UserService"));
var dotenv = __importStar(require("dotenv"));
var token_1 = __importDefault(require("../middleware/token"));
var router = express_1.default.Router();
var userService = new UserService_1.default();
dotenv.config();
router.post('/user/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ error: 'email and password are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.getUserByEmail(email)];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    res.status(400).json({ error: 'email already exists' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                if (!hashedPassword) {
                    res.status(500).json({ error: 'failed to hash password' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.createUser(email, hashedPassword)];
            case 3:
                user = _b.sent();
                res.status(200).json(user);
                return [2 /*return*/];
        }
    });
}); });
router.post('/user/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ error: 'email and password are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.getUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({ error: 'user not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    res.status(400).json({ error: 'invalid password' });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    'message': 'login successful, token is valid for 1 hour',
                    'token': token
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/user/:id', token_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                if (!id) {
                    res.status(400).json({ error: 'id is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.getUserById(id)];
            case 1:
                user = _a.sent();
                res.status(200).json(user);
                return [2 /*return*/];
        }
    });
}); });
router.get('/user/email/:email', token_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                if (!email) {
                    res.status(400).json({ error: 'email is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.getUserByEmail(email)];
            case 1:
                user = _a.sent();
                res.status(200).json(user);
                return [2 /*return*/];
        }
    });
}); });
router.patch('/user/:id', token_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, old_password, password, existingUser, isPasswordValid, hashedPassword, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id);
                if (!id) {
                    res.status(400).json({ error: 'id is required' });
                    return [2 /*return*/];
                }
                _a = req.body, old_password = _a.old_password, password = _a.password;
                if (!old_password || !password) {
                    res.status(400).json({ error: 'password is required / old password must be specified' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userService.getUserById(id)];
            case 1:
                existingUser = _b.sent();
                if (!existingUser) {
                    res.status(400).json({ error: 'user not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(old_password, existingUser.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    res.status(400).json({ error: 'invalid old password' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, userService.updateUserPasswordById(id, hashedPassword)];
            case 4:
                user = _b.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
router.delete('/user/:id', token_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, userService.deleteUserById(id)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map