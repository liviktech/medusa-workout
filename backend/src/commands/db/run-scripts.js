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
exports.runMigrationScripts = runMigrationScripts;
var framework_1 = require("@medusajs/framework");
var links_1 = require("@medusajs/framework/links");
var logger_1 = require("@medusajs/framework/logger");
var migrations_1 = require("@medusajs/framework/migrations");
var utils_1 = require("@medusajs/framework/utils");
var path_1 = require("path");
var modules_sdk_1 = require("@medusajs/framework/modules-sdk");
var loaders_1 = require("../../loaders");
var utils_2 = require("../utils");
var TERMINAL_SIZE = process.stdout.columns;
/**
 * A low-level utility to migrate the migration scripts. This util should
 * never exit the process implicitly.
 */
function runMigrationScripts(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var onApplicationPrepareShutdown, onApplicationShutdown, container_, plugins, configModule, resources, scriptsSourcePaths, migrator, pendingScripts;
        var _this = this;
        var directory = _b.directory;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onApplicationPrepareShutdown = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve()];
                    }); }); };
                    onApplicationShutdown = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve()];
                    }); }); };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, , 9, 12]);
                    return [4 /*yield*/, (0, loaders_1.initializeContainer)(directory)];
                case 2:
                    container_ = _c.sent();
                    return [4 /*yield*/, (0, utils_2.ensureDbExists)(container_)];
                case 3:
                    _c.sent();
                    configModule = container_.resolve(utils_1.ContainerRegistrationKeys.CONFIG_MODULE);
                    return [4 /*yield*/, (0, utils_1.getResolvedPlugins)(directory, configModule, true)];
                case 4:
                    plugins = _c.sent();
                    (0, utils_1.mergePluginModules)(configModule, plugins);
                    return [4 /*yield*/, loadResources(plugins)];
                case 5:
                    resources = _c.sent();
                    onApplicationPrepareShutdown = resources.onApplicationPrepareShutdown;
                    onApplicationShutdown = resources.onApplicationShutdown;
                    scriptsSourcePaths = __spreadArray([
                        (0, path_1.join)((0, path_1.dirname)(require.resolve("@medusajs/medusa")), "migration-scripts")
                    ], plugins.map(function (plugin) { return (0, path_1.join)(plugin.resolve, "migration-scripts"); }), true);
                    migrator = new migrations_1.MigrationScriptsMigrator({ container: container_ });
                    return [4 /*yield*/, migrator.ensureMigrationsTable()];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, migrator.getPendingMigrations(scriptsSourcePaths)];
                case 7:
                    pendingScripts = _c.sent();
                    if (!(pendingScripts === null || pendingScripts === void 0 ? void 0 : pendingScripts.length)) {
                        logger_1.logger.info("No pending migration scripts to execute");
                        return [2 /*return*/, true];
                    }
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.info("Pending migration scripts to execute");
                    logger_1.logger.info("".concat(pendingScripts.join("\n")));
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.info("Running migration scripts...");
                    return [4 /*yield*/, migrator.run(scriptsSourcePaths)];
                case 8:
                    _c.sent();
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.info("Migration scripts completed");
                    return [2 /*return*/, true];
                case 9: return [4 /*yield*/, onApplicationPrepareShutdown()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, onApplicationShutdown()];
                case 11:
                    _c.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function loadResources(plugins) {
    return __awaiter(this, void 0, void 0, function () {
        var linksSourcePaths, medusaAppResources, onApplicationPrepareShutdown, onApplicationShutdown;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /**
                     * Clear all module instances to prevent cache from kicking in
                     */
                    modules_sdk_1.MedusaModule.clearInstances();
                    linksSourcePaths = plugins.map(function (plugin) {
                        return (0, path_1.join)(plugin.resolve, "links");
                    });
                    return [4 /*yield*/, new links_1.LinkLoader(linksSourcePaths).load()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new framework_1.MedusaAppLoader().load()];
                case 2:
                    medusaAppResources = _a.sent();
                    onApplicationPrepareShutdown = medusaAppResources.onApplicationPrepareShutdown;
                    onApplicationShutdown = medusaAppResources.onApplicationShutdown;
                    return [4 /*yield*/, medusaAppResources.onApplicationStart()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, {
                            onApplicationPrepareShutdown: onApplicationPrepareShutdown,
                            onApplicationShutdown: onApplicationShutdown,
                        }];
            }
        });
    });
}
var main = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var migrated, error_1;
        var directory = _b.directory;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, runMigrationScripts({
                            directory: directory,
                        })];
                case 1:
                    migrated = _c.sent();
                    process.exit(migrated ? 0 : 1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    logger_1.logger.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = main;
