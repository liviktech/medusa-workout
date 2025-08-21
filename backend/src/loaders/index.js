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
exports.initializeContainer = initializeContainer;
var framework_1 = require("@medusajs/framework");
var config_1 = require("@medusajs/framework/config");
var database_1 = require("@medusajs/framework/database");
var feature_flags_1 = require("@medusajs/framework/feature-flags");
var http_1 = require("@medusajs/framework/http");
var jobs_1 = require("@medusajs/framework/jobs");
var links_1 = require("@medusajs/framework/links");
var logger_1 = require("@medusajs/framework/logger");
var subscribers_1 = require("@medusajs/framework/subscribers");
var utils_1 = require("@medusajs/framework/utils");
var workflows_1 = require("@medusajs/framework/workflows");
var awilix_1 = require("awilix");
var path_1 = require("path");
var request_ip_1 = require("request-ip");
var uuid_1 = require("uuid");
var admin_1 = require("./admin");
var api_1 = require("./api");
var isWorkerMode = function (configModule) {
    return configModule.projectConfig.workerMode === "worker";
};
var shouldLoadBackgroundProcessors = function (configModule) {
    return (configModule.projectConfig.workerMode === "worker" ||
        configModule.projectConfig.workerMode === "shared");
};
function subscribersLoader(plugins) {
    return __awaiter(this, void 0, void 0, function () {
        var pluginSubscribersSourcePaths, subscriberLoader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pluginSubscribersSourcePaths = [
                        /**
                         * Load subscribers from the medusa/medusa package. Remove once the medusa core is converted to a plugin
                         */
                        (0, path_1.join)(__dirname, "../subscribers"),
                    ].concat(plugins.map(function (plugin) { return (0, path_1.join)(plugin.resolve, "subscribers"); }));
                    subscriberLoader = new subscribers_1.SubscriberLoader(pluginSubscribersSourcePaths);
                    return [4 /*yield*/, subscriberLoader.load()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function jobsLoader(plugins) {
    return __awaiter(this, void 0, void 0, function () {
        var pluginJobSourcePaths, jobLoader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pluginJobSourcePaths = [
                        /**
                         * Load jobs from the medusa/medusa package. Remove once the medusa core is converted to a plugin
                         */
                        (0, path_1.join)(__dirname, "../jobs"),
                    ].concat(plugins.map(function (plugin) { return (0, path_1.join)(plugin.resolve, "jobs"); }));
                    jobLoader = new jobs_1.JobLoader(pluginJobSourcePaths);
                    return [4 /*yield*/, jobLoader.load()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function loadEntrypoints(plugins, container, expressApp, rootDirectory) {
    return __awaiter(this, void 0, void 0, function () {
        var configModule, shutdown;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configModule = container.resolve(utils_1.ContainerRegistrationKeys.CONFIG_MODULE);
                    if (!shouldLoadBackgroundProcessors(configModule)) return [3 /*break*/, 3];
                    return [4 /*yield*/, subscribersLoader(plugins)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, jobsLoader(plugins)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    if (isWorkerMode(configModule)) {
                        return [2 /*return*/, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); }];
                    }
                    /**
                     * The scope and the ip address must be fetched before we execute any other
                     * middleware
                     */
                    expressApp.use(function (req, res, next) {
                        var _a;
                        req.scope = container.createScope();
                        req.requestId = (_a = req.headers["x-request-id"]) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
                        next();
                    });
                    // Add additional information to context of request
                    expressApp.use(function (req, res, next) {
                        var ipAddress = request_ip_1.default.getClientIp(req);
                        req.request_context = {
                            ip_address: ipAddress,
                        };
                        next();
                    });
                    return [4 /*yield*/, (0, http_1.expressLoader)({
                            app: expressApp,
                        })];
                case 4:
                    shutdown = (_a.sent()).shutdown;
                    return [4 /*yield*/, (0, admin_1.default)({ app: expressApp, configModule: configModule, rootDirectory: rootDirectory, plugins: plugins })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, api_1.default)({
                            container: container,
                            plugins: plugins,
                            app: expressApp,
                        })];
                case 6:
                    _a.sent();
                    return [2 /*return*/, shutdown];
            }
        });
    });
}
function initializeContainer(rootDirectory) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, config_1.configLoader)(rootDirectory, "medusa-config")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, feature_flags_1.featureFlagsLoader)((0, path_1.join)(__dirname, "feature-flags"))];
                case 2:
                    _b.sent();
                    framework_1.container.register((_a = {},
                        _a[utils_1.ContainerRegistrationKeys.LOGGER] = (0, awilix_1.asValue)(logger_1.logger),
                        _a[utils_1.ContainerRegistrationKeys.REMOTE_QUERY] = (0, awilix_1.asValue)(null),
                        _a));
                    return [4 /*yield*/, (0, database_1.pgConnectionLoader)()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, framework_1.container];
            }
        });
    });
}
exports.default = (function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var container, configModule, plugins, linksSourcePaths, _c, onApplicationStart, onApplicationShutdown, onApplicationPrepareShutdown, modules, gqlSchema, workflowsSourcePaths, workflowLoader, entrypointsShutdown, createDefaultsWorkflow, shutdown;
    var _d;
    var rootDirectory = _b.directory, expressApp = _b.expressApp;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, initializeContainer(rootDirectory)];
            case 1:
                container = _e.sent();
                configModule = container.resolve(utils_1.ContainerRegistrationKeys.CONFIG_MODULE);
                return [4 /*yield*/, (0, utils_1.getResolvedPlugins)(rootDirectory, configModule, true)];
            case 2:
                plugins = _e.sent();
                (0, utils_1.mergePluginModules)(configModule, plugins);
                Object.keys((_d = configModule.modules) !== null && _d !== void 0 ? _d : {}).forEach(function (key) {
                    (0, utils_1.validateModuleName)(key);
                });
                linksSourcePaths = plugins.map(function (plugin) {
                    return (0, path_1.join)(plugin.resolve, "links");
                });
                return [4 /*yield*/, new links_1.LinkLoader(linksSourcePaths).load()];
            case 3:
                _e.sent();
                return [4 /*yield*/, new framework_1.MedusaAppLoader().load()];
            case 4:
                _c = _e.sent(), onApplicationStart = _c.onApplicationStart, onApplicationShutdown = _c.onApplicationShutdown, onApplicationPrepareShutdown = _c.onApplicationPrepareShutdown, modules = _c.modules, gqlSchema = _c.gqlSchema;
                workflowsSourcePaths = plugins.map(function (p) { return (0, path_1.join)(p.resolve, "workflows"); });
                workflowLoader = new workflows_1.WorkflowLoader(workflowsSourcePaths);
                return [4 /*yield*/, workflowLoader.load()];
            case 5:
                _e.sent();
                return [4 /*yield*/, loadEntrypoints(plugins, container, expressApp, rootDirectory)];
            case 6:
                entrypointsShutdown = _e.sent();
                return [4 /*yield*/, Promise.resolve().then(function () { return require("@medusajs/core-flows"); })];
            case 7:
                createDefaultsWorkflow = (_e.sent()).createDefaultsWorkflow;
                return [4 /*yield*/, createDefaultsWorkflow(container).run()];
            case 8:
                _e.sent();
                return [4 /*yield*/, onApplicationStart()];
            case 9:
                _e.sent();
                shutdown = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var pgConnection;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                pgConnection = container.resolve(utils_1.ContainerRegistrationKeys.PG_CONNECTION);
                                return [4 /*yield*/, onApplicationPrepareShutdown()];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, onApplicationShutdown()];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, (0, utils_1.promiseAll)([
                                        container.dispose(),
                                        // @ts-expect-error "Do we want to call `client.destroy` "
                                        (_a = pgConnection === null || pgConnection === void 0 ? void 0 : pgConnection.context) === null || _a === void 0 ? void 0 : _a.destroy(),
                                        entrypointsShutdown(),
                                    ])];
                            case 3:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, {
                        container: container,
                        app: expressApp,
                        shutdown: shutdown,
                        modules: modules,
                        gqlSchema: gqlSchema,
                    }];
        }
    });
}); });
