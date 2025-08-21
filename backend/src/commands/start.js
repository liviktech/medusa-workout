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
exports.traceRequestHandler = void 0;
exports.registerInstrumentation = registerInstrumentation;
var os_1 = require("os");
var path_1 = require("path");
var http_1 = require("http");
var express_1 = require("express");
var cluster_1 = require("cluster");
var telemetry_1 = require("@medusajs/telemetry");
var node_schedule_1 = require("node-schedule");
var utils_1 = require("@medusajs/framework/utils");
var logger_1 = require("@medusajs/framework/logger");
var loaders_1 = require("../loaders");
var modules_sdk_1 = require("@medusajs/framework/modules-sdk");
var url_1 = require("url");
var EVERY_SIXTH_HOUR = "0 */6 * * *";
var CRON_SCHEDULE = EVERY_SIXTH_HOUR;
var INSTRUMENTATION_FILE = "instrumentation";
/**
 * Imports the "instrumentation.js" file from the root of the
 * directory and invokes the register function. The existence
 * of this file is optional, hence we ignore "ENOENT"
 * errors.
 */
function registerInstrumentation(directory) {
    return __awaiter(this, void 0, void 0, function () {
        var fileSystem, exists, _a, instrumentation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileSystem = new utils_1.FileSystem(directory);
                    return [4 /*yield*/, fileSystem.exists("".concat(INSTRUMENTATION_FILE, ".ts"))];
                case 1:
                    _a = (_b.sent());
                    if (_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, fileSystem.exists("".concat(INSTRUMENTATION_FILE, ".js"))];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    exists = _a;
                    if (!exists) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, utils_1.dynamicImport)(path_1.default.join(directory, INSTRUMENTATION_FILE))];
                case 4:
                    instrumentation = _b.sent();
                    if (typeof instrumentation.register === "function") {
                        logger_1.logger.info("OTEL registered");
                        instrumentation.register();
                    }
                    else {
                        logger_1.logger.info("Skipping instrumentation registration. No register function found.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Wrap request handler inside custom implementation to enabled
 * instrumentation.
 */
// eslint-disable-next-line no-var
exports.traceRequestHandler = void 0;
function displayAdminUrl(_a) {
    var host = _a.host, port = _a.port, container = _a.container;
    var isProduction = ["production", "prod"].includes(process.env.NODE_ENV || "");
    if (isProduction) {
        return;
    }
    var logger = container.resolve("logger");
    var _b = container.resolve("configModule").admin, adminPath = _b.path, disable = _b.disable;
    if (disable) {
        return;
    }
    logger.info("Admin URL \u2192 http://".concat(host || "localhost", ":").concat(port).concat(adminPath));
}
/**
 * Retrieve the route path from the express stack based on the input url
 * @param stack - The express stack
 * @param url - The input url
 * @returns The route path
 */
function findExpressRoutePath(_a) {
    var _b, _c;
    var stack = _a.stack, url = _a.url;
    var stackToProcess = __spreadArray([], stack, true);
    while (stackToProcess.length > 0) {
        var layer = stackToProcess.pop();
        if (layer.name === "bound dispatch" && layer.match(url)) {
            return layer.route.path;
        }
        // Add nested stack items to be processed if they exist
        if ((_c = (_b = layer.handle) === null || _b === void 0 ? void 0 : _b.stack) === null || _c === void 0 ? void 0 : _c.length) {
            stackToProcess.push.apply(stackToProcess, layer.handle.stack);
        }
    }
    return undefined;
}
function start(args) {
    return __awaiter(this, void 0, void 0, function () {
        function internalStart(generateTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var app, http_, _a, shutdown_1, gqlSchema, container_1, modules, typesDirectory, serverActivity_1, server_1, gracefulShutDown, err_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (0, telemetry_1.track)("CLI_START");
                            return [4 /*yield*/, registerInstrumentation(directory)];
                        case 1:
                            _b.sent();
                            app = (0, express_1.default)();
                            http_ = http_1.default.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                                var stack;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            stack = app._router.stack;
                                            return [4 /*yield*/, new Promise(function (resolve) {
                                                    res.on("finish", resolve);
                                                    if (exports.traceRequestHandler) {
                                                        var expressHandlerPath = findExpressRoutePath({
                                                            stack: stack,
                                                            url: (0, url_1.parse)(req.url, false).pathname,
                                                        });
                                                        void (0, exports.traceRequestHandler)(function () { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                app(req, res);
                                                                return [2 /*return*/];
                                                            });
                                                        }); }, req, res, expressHandlerPath);
                                                    }
                                                    else {
                                                        app(req, res);
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 8, , 9]);
                            return [4 /*yield*/, (0, loaders_1.default)({
                                    directory: directory,
                                    expressApp: app,
                                })];
                        case 3:
                            _a = _b.sent(), shutdown_1 = _a.shutdown, gqlSchema = _a.gqlSchema, container_1 = _a.container, modules = _a.modules;
                            if (!generateTypes) return [3 /*break*/, 7];
                            typesDirectory = path_1.default.join(directory, ".medusa/types");
                            /**
                             * Cleanup existing types directory before creating new artifacts
                             */
                            return [4 /*yield*/, new utils_1.FileSystem(typesDirectory).cleanup({ recursive: true })];
                        case 4:
                            /**
                             * Cleanup existing types directory before creating new artifacts
                             */
                            _b.sent();
                            return [4 /*yield*/, (0, utils_1.generateContainerTypes)(modules, {
                                    outputDir: typesDirectory,
                                    interfaceName: "ModuleImplementations",
                                })];
                        case 5:
                            _b.sent();
                            logger_1.logger.debug("Generated container types");
                            if (!gqlSchema) return [3 /*break*/, 7];
                            return [4 /*yield*/, (0, utils_1.gqlSchemaToTypes)({
                                    outputDir: typesDirectory,
                                    filename: "query-entry-points",
                                    interfaceName: "RemoteQueryEntryPoints",
                                    schema: gqlSchema,
                                    joinerConfigs: modules_sdk_1.MedusaModule.getAllJoinerConfigs(),
                                })];
                        case 6:
                            _b.sent();
                            logger_1.logger.debug("Generated modules types");
                            _b.label = 7;
                        case 7:
                            serverActivity_1 = logger_1.logger.activity("Creating server");
                            // Register a health check endpoint. Ideally this also checks the readiness of the service, rather than just returning a static response.
                            app.get("/health", function (_, res) {
                                res.status(200).send("OK");
                            });
                            server_1 = utils_1.GracefulShutdownServer.create(http_.listen(port, host).on("listening", function () {
                                logger_1.logger.success(serverActivity_1, "Server is ready on port: ".concat(port));
                                displayAdminUrl({ container: container_1, host: host, port: port });
                                (0, telemetry_1.track)("CLI_START_COMPLETED");
                            }));
                            gracefulShutDown = function () {
                                logger_1.logger.info("Gracefully shutting down server");
                                server_1
                                    .shutdown()
                                    .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, shutdown_1()];
                                            case 1:
                                                _a.sent();
                                                process.exit(0);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })
                                    .catch(function (e) {
                                    logger_1.logger.error("Error received when shutting down the server.", e);
                                    process.exit(1);
                                });
                            };
                            process.on("SIGTERM", gracefulShutDown);
                            process.on("SIGINT", gracefulShutDown);
                            (0, node_schedule_1.scheduleJob)(CRON_SCHEDULE, function () {
                                (0, telemetry_1.track)("PING");
                            });
                            return [2 /*return*/, { server: server_1 }];
                        case 8:
                            err_1 = _b.sent();
                            logger_1.logger.error("Error starting server", err_1);
                            process.exit(1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        var _a, port, host, directory, types, maxCpus, cpus, isShuttingDown_1, numCPUs, killMainProccess_1, gracefulShutDown, index;
        var _this = this;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = args.port, port = _a === void 0 ? 9000 : _a, host = args.host, directory = args.directory, types = args.types;
                    if (!("cluster" in args)) return [3 /*break*/, 1];
                    maxCpus = os_1.default.cpus().length;
                    cpus = (_b = args.cluster) !== null && _b !== void 0 ? _b : maxCpus;
                    if (cluster_1.default.isPrimary) {
                        isShuttingDown_1 = false;
                        numCPUs = Math.min(maxCpus, cpus);
                        killMainProccess_1 = function () { return process.exit(0); };
                        gracefulShutDown = function () {
                            var _a, _b, _c;
                            isShuttingDown_1 = true;
                            for (var _i = 0, _d = Object.keys((_a = cluster_1.default.workers) !== null && _a !== void 0 ? _a : {}); _i < _d.length; _i++) {
                                var id = _d[_i];
                                (_c = (_b = cluster_1.default.workers) === null || _b === void 0 ? void 0 : _b[id]) === null || _c === void 0 ? void 0 : _c.kill("SIGTERM");
                            }
                        };
                        for (index = 0; index < numCPUs; index++) {
                            cluster_1.default.fork().send({ index: index });
                        }
                        cluster_1.default.on("exit", function () {
                            if (!isShuttingDown_1) {
                                cluster_1.default.fork();
                            }
                            else if (!(0, utils_1.isPresent)(cluster_1.default.workers)) {
                                setTimeout(killMainProccess_1, 100).unref();
                            }
                        });
                        process.on("SIGTERM", gracefulShutDown);
                        process.on("SIGINT", gracefulShutDown);
                    }
                    else {
                        process.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (msg.index > 0) {
                                            process.env.PLUGIN_ADMIN_UI_SKIP_CACHE = "true";
                                        }
                                        return [4 /*yield*/, internalStart(!!types && msg.index === 0)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [3 /*break*/, 3];
                case 1: 
                /**
                 * Not in cluster mode
                 */
                return [4 /*yield*/, internalStart(!!types)];
                case 2:
                    /**
                     * Not in cluster mode
                     */
                    _c.sent();
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = start;
