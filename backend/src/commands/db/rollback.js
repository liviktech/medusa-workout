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
var framework_1 = require("@medusajs/framework");
var links_1 = require("@medusajs/framework/links");
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
var path_1 = require("path");
var loaders_1 = require("../../loaders");
var utils_2 = require("../utils");
var TERMINAL_SIZE = process.stdout.columns;
var main = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var container, medusaAppLoader, configModule, plugins, linksSourcePaths, error_1, modulesList;
        var directory = _b.directory, modules = _b.modules;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, loaders_1.initializeContainer)(directory)];
                case 1:
                    container = _c.sent();
                    return [4 /*yield*/, (0, utils_2.ensureDbExists)(container)];
                case 2:
                    _c.sent();
                    medusaAppLoader = new framework_1.MedusaAppLoader();
                    configModule = container.resolve(utils_1.ContainerRegistrationKeys.CONFIG_MODULE);
                    return [4 /*yield*/, (0, utils_1.getResolvedPlugins)(directory, configModule, true)];
                case 3:
                    plugins = _c.sent();
                    (0, utils_1.mergePluginModules)(configModule, plugins);
                    linksSourcePaths = plugins.map(function (plugin) {
                        return (0, path_1.join)(plugin.resolve, "links");
                    });
                    return [4 /*yield*/, new links_1.LinkLoader(linksSourcePaths).load()
                        /**
                         * Reverting migrations
                         */
                    ];
                case 4:
                    _c.sent();
                    /**
                     * Reverting migrations
                     */
                    logger_1.logger.info("Reverting migrations...");
                    return [4 /*yield*/, medusaAppLoader.runModulesMigrations({
                            moduleNames: modules,
                            action: "revert",
                        })];
                case 5:
                    _c.sent();
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.info("Migrations reverted");
                    process.exit();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    if (error_1.code && error_1.code === utils_1.MedusaError.Codes.UNKNOWN_MODULES) {
                        logger_1.logger.error(error_1.message);
                        modulesList = error_1.allModules.map(function (name) { return "          - ".concat(name); });
                        logger_1.logger.error("Available modules:\n".concat(modulesList.join("\n")));
                    }
                    else {
                        logger_1.logger.error(error_1.message, error_1);
                    }
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.default = main;
