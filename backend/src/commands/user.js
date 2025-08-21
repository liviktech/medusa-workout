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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
var express_1 = require("express");
var telemetry_1 = require("@medusajs/telemetry");
var loaders_1 = require("../loaders");
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var app, container, userService, authService, provider, invite_1, user, _c, authIdentity, error, err_1;
        var directory = _b.directory, id = _b.id, email = _b.email, password = _b.password, keepAlive = _b.keepAlive, invite = _b.invite;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    (0, telemetry_1.track)("CLI_USER", { with_id: !!id });
                    app = (0, express_1.default)();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 9, , 10]);
                    /**
                     * Enabling worker mode to prevent discovering/loading
                     * of API routes from the starter kit
                     */
                    process.env.MEDUSA_WORKER_MODE = "worker";
                    return [4 /*yield*/, (0, loaders_1.default)({
                            directory: directory,
                            expressApp: app,
                        })];
                case 2:
                    container = (_d.sent()).container;
                    userService = container.resolve(utils_1.Modules.USER);
                    authService = container.resolve(utils_1.Modules.AUTH);
                    provider = "emailpass";
                    if (!invite) return [3 /*break*/, 4];
                    return [4 /*yield*/, userService.createInvites({ email: email })];
                case 3:
                    invite_1 = _d.sent();
                    logger_1.logger.info("\n      Invite token: ".concat(invite_1.token, "\n      Open the invite in Medusa Admin at: [your-admin-url]/invite?token=").concat(invite_1.token));
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, userService.createUsers({ email: email })];
                case 5:
                    user = _d.sent();
                    return [4 /*yield*/, authService.register(provider, {
                            body: {
                                email: email,
                                password: password,
                            },
                        })];
                case 6:
                    _c = _d.sent(), authIdentity = _c.authIdentity, error = _c.error;
                    if (error) {
                        logger_1.logger.error(error);
                        process.exit(1);
                    }
                    // We know the authIdentity is not undefined
                    return [4 /*yield*/, authService.updateAuthIdentities({
                            id: authIdentity.id,
                            app_metadata: {
                                user_id: user.id,
                            },
                        })];
                case 7:
                    // We know the authIdentity is not undefined
                    _d.sent();
                    logger_1.logger.info("User created successfully.");
                    _d.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_1 = _d.sent();
                    console.error(err_1);
                    process.exit(1);
                    return [3 /*break*/, 10];
                case 10:
                    (0, telemetry_1.track)("CLI_USER_COMPLETED", { with_id: !!id });
                    if (!keepAlive) {
                        process.exit();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
