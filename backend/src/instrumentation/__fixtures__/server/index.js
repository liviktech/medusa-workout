"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var modules_sdk_1 = require("@medusajs/modules-sdk");
var utils_1 = require("@medusajs/utils");
var awilix_1 = require("awilix");
var express_1 = require("express");
var querystring_1 = require("querystring");
var supertest_1 = require("supertest");
var mocks_1 = require("../mocks");
var config_1 = require("@medusajs/framework/config");
var framework_1 = require("@medusajs/framework");
function asArray(resolvers) {
    return {
        resolve: function (container) {
            return resolvers.map(function (resolver) { return container.build(resolver); });
        },
    };
}
/**
 * Sets up a test server that injects API Routes using the RoutesLoader
 *
 * @param {String} rootDir - The root directory of the project
 */
var createServer = function (rootDir) { return __awaiter(void 0, void 0, void 0, function () {
    var app, moduleResolutions, superRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                moduleResolutions = {};
                Object.entries(modules_sdk_1.ModulesDefinition).forEach(function (_a) {
                    var moduleKey = _a[0], module = _a[1];
                    moduleResolutions[moduleKey] = (0, modules_sdk_1.registerMedusaModule)(moduleKey, module.defaultModuleDeclaration, undefined, module)[moduleKey];
                });
                config_1.configManager.loadConfig({
                    projectConfig: mocks_1.config,
                    baseDir: rootDir,
                });
                framework_1.container.registerAdd = function (name, registration) {
                    var storeKey = name + "_STORE";
                    if (this.registrations[storeKey] === undefined) {
                        this.register(storeKey, (0, awilix_1.asValue)([]));
                    }
                    var store = this.resolve(storeKey);
                    if (this.registrations[name] === undefined) {
                        this.register(name, asArray(store));
                    }
                    store.unshift(registration);
                    return this;
                }.bind(framework_1.container);
                framework_1.container.register(utils_1.ContainerRegistrationKeys.PG_CONNECTION, (0, awilix_1.asValue)({}));
                framework_1.container.register("configModule", (0, awilix_1.asValue)(mocks_1.config));
                framework_1.container.register({
                    logger: (0, awilix_1.asValue)({
                        error: function () { },
                    }),
                    manager: (0, awilix_1.asValue)({}),
                });
                app.set("trust proxy", 1);
                app.use(function (req, _res, next) {
                    req["session"] = {};
                    var data = req.get("Cookie");
                    if (data) {
                        req["session"] = __assign(__assign({}, req["session"]), JSON.parse(data));
                    }
                    next();
                });
                return [4 /*yield*/, (0, framework_1.featureFlagsLoader)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, modules_sdk_1.moduleLoader)({ container: framework_1.container, moduleResolutions: moduleResolutions, logger: framework_1.logger })];
            case 2:
                _a.sent();
                app.use(function (req, res, next) {
                    ;
                    req.scope = framework_1.container.createScope();
                    next();
                });
                return [4 /*yield*/, new framework_1.ApiLoader({
                        app: app,
                        sourceDir: rootDir,
                    }).load()];
            case 3:
                _a.sent();
                superRequest = (0, supertest_1.default)(app);
                return [2 /*return*/, {
                        request: function (method_1, url_1) {
                            var args_1 = [];
                            for (var _i = 2; _i < arguments.length; _i++) {
                                args_1[_i - 2] = arguments[_i];
                            }
                            return __awaiter(void 0, __spreadArray([method_1, url_1], args_1, true), void 0, function (method, url, opts) {
                                var payload, query, _a, headers, queryParams, req, token, token, name_1, res, e_1;
                                var _b, _c, _d, _e;
                                if (opts === void 0) { opts = {}; }
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            payload = opts.payload, query = opts.query, _a = opts.headers, headers = _a === void 0 ? {} : _a;
                                            queryParams = query && querystring_1.default.stringify(query);
                                            req = superRequest[method.toLowerCase()]("".concat(url).concat(queryParams ? "?" + queryParams : ""));
                                            headers.Cookie = headers.Cookie || "";
                                            if (opts.adminSession) {
                                                token = (0, utils_1.generateJwtToken)({
                                                    actor_id: opts.adminSession.userId || ((_b = opts.adminSession.jwt) === null || _b === void 0 ? void 0 : _b.userId),
                                                    actor_type: "user",
                                                    app_metadata: {
                                                        user_id: opts.adminSession.userId || ((_c = opts.adminSession.jwt) === null || _c === void 0 ? void 0 : _c.userId),
                                                    },
                                                }, {
                                                    secret: mocks_1.config.projectConfig.http.jwtSecret,
                                                    expiresIn: "1d",
                                                });
                                                headers.Authorization = "Bearer ".concat(token);
                                            }
                                            if (opts.clientSession) {
                                                token = (0, utils_1.generateJwtToken)({
                                                    actor_id: opts.clientSession.customer_id ||
                                                        ((_d = opts.clientSession.jwt) === null || _d === void 0 ? void 0 : _d.customer_id),
                                                    actor_type: "customer",
                                                    app_metadata: {
                                                        customer_id: opts.clientSession.customer_id ||
                                                            ((_e = opts.clientSession.jwt) === null || _e === void 0 ? void 0 : _e.customer_id),
                                                    },
                                                }, { secret: mocks_1.config.projectConfig.http.jwtSecret, expiresIn: "1d" });
                                                headers.Authorization = "Bearer ".concat(token);
                                            }
                                            for (name_1 in headers) {
                                                if ({}.hasOwnProperty.call(headers, name_1)) {
                                                    req.set(name_1, headers[name_1]);
                                                }
                                            }
                                            if (payload && !req.get("content-type")) {
                                                req.set("Content-Type", "application/json");
                                            }
                                            if (!req.get("accept")) {
                                                req.set("Accept", "application/json");
                                            }
                                            req.set("Host", "localhost");
                                            _f.label = 1;
                                        case 1:
                                            _f.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, req.send(JSON.stringify(payload))];
                                        case 2:
                                            res = _f.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_1 = _f.sent();
                                            if (e_1.response) {
                                                res = e_1.response;
                                            }
                                            else {
                                                throw e_1;
                                            }
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/, res];
                                    }
                                });
                            });
                        },
                    }];
        }
    });
}); };
exports.createServer = createServer;
