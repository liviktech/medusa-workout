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
exports.syncLinks = syncLinks;
var checkbox_1 = require("@inquirer/checkbox");
var framework_1 = require("@medusajs/framework");
var links_1 = require("@medusajs/framework/links");
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
var boxen_1 = require("boxen");
var chalk_1 = require("chalk");
var path_1 = require("path");
var loaders_1 = require("../../loaders");
var utils_2 = require("../utils");
/**
 * Groups action tables by their "action" property
 * @param actionPlan LinkMigrationsPlannerAction
 */
function groupByActionPlan(actionPlan) {
    return actionPlan.reduce(function (acc, action) {
        var _a;
        var _b;
        (_a = acc[_b = action.action]) !== null && _a !== void 0 ? _a : (acc[_b] = []);
        acc[action.action].push(action);
        return acc;
    }, {});
}
/**
 * Creates the link description for printing it to the
 * console
 *
 * @param action LinkMigrationsPlannerAction
 */
function buildLinkDescription(action) {
    var linkDescriptor = action.linkDescriptor;
    var from = chalk_1.default.yellow("".concat(linkDescriptor.fromModule, ".").concat(linkDescriptor.fromModel));
    var to = chalk_1.default.yellow("".concat(linkDescriptor.toModule, ".").concat(linkDescriptor.toModel));
    var table = chalk_1.default.dim("(".concat(action.tableName, ")"));
    return "".concat(from, " <> ").concat(to, " ").concat(table);
}
/**
 * Logs the actions of a given action type with a nice border and
 * a title
 */
function logActions(title, actionsOrContext) {
    var actionsList = actionsOrContext
        .map(function (action) { return "  - ".concat(buildLinkDescription(action)); })
        .join("\n");
    console.log((0, boxen_1.default)("".concat(title, "\n").concat(actionsList), { padding: 1 }));
}
/**
 * Displays a prompt to select tables that must be impacted with
 * action
 */
function askForLinkActionsToPerform(message, actions) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log((0, boxen_1.default)(message, { borderColor: "red", padding: 1 }));
                    return [4 /*yield*/, (0, checkbox_1.default)({
                            message: "Select tables to act upon",
                            instructions: chalk_1.default.dim(" <space> select, <a> select all, <i> inverse, <enter> submit"),
                            choices: actions.map(function (action) {
                                return {
                                    name: buildLinkDescription(action),
                                    value: action,
                                    checked: false,
                                };
                            }),
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Low-level utility to sync links. This utility is used
 * by the migrate command as-well.
 */
function syncLinks(medusaAppLoader_1, _a) {
    return __awaiter(this, arguments, void 0, function (medusaAppLoader, _b) {
        var planner, actionPlan, groupActionPlan, _c, answer, toCreate, toUpdate, toDelete, actionsToExecute;
        var _d;
        var _e, _f, _g, _h, _j, _k;
        var executeAll = _b.executeAll, executeSafe = _b.executeSafe;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0: return [4 /*yield*/, medusaAppLoader.getLinksExecutionPlanner()];
                case 1:
                    planner = _l.sent();
                    logger_1.logger.info("Syncing links...");
                    return [4 /*yield*/, planner.createPlan()];
                case 2:
                    actionPlan = _l.sent();
                    groupActionPlan = groupByActionPlan(actionPlan);
                    if (!((_e = groupActionPlan.delete) === null || _e === void 0 ? void 0 : _e.length)) return [3 /*break*/, 5];
                    if (!executeSafe) return [3 /*break*/, 3];
                    groupActionPlan.delete = [];
                    return [3 /*break*/, 5];
                case 3:
                    if (!!executeAll) return [3 /*break*/, 5];
                    _c = groupActionPlan;
                    return [4 /*yield*/, askForLinkActionsToPerform("Select the tables to ".concat(chalk_1.default.red("DELETE"), ". The following links have been removed"), groupActionPlan.delete)];
                case 4:
                    _c.delete = _l.sent();
                    _l.label = 5;
                case 5:
                    if (!((_f = groupActionPlan.notify) === null || _f === void 0 ? void 0 : _f.length)) return [3 /*break*/, 9];
                    answer = groupActionPlan.notify;
                    if (!executeSafe) return [3 /*break*/, 6];
                    answer = [];
                    return [3 /*break*/, 8];
                case 6:
                    if (!!executeAll) return [3 /*break*/, 8];
                    return [4 /*yield*/, askForLinkActionsToPerform("Select the tables to ".concat(chalk_1.default.red("UPDATE"), ". The following links have been updated"), groupActionPlan.notify)];
                case 7:
                    answer = _l.sent();
                    _l.label = 8;
                case 8:
                    (_g = groupActionPlan.update) !== null && _g !== void 0 ? _g : (groupActionPlan.update = []);
                    (_d = groupActionPlan.update).push.apply(_d, answer.map(function (action) {
                        return __assign(__assign({}, action), { action: "update" });
                    }));
                    _l.label = 9;
                case 9:
                    toCreate = (_h = groupActionPlan.create) !== null && _h !== void 0 ? _h : [];
                    toUpdate = (_j = groupActionPlan.update) !== null && _j !== void 0 ? _j : [];
                    toDelete = (_k = groupActionPlan.delete) !== null && _k !== void 0 ? _k : [];
                    actionsToExecute = __spreadArray(__spreadArray(__spreadArray([], toCreate, true), toUpdate, true), toDelete, true);
                    return [4 /*yield*/, planner.executePlan(actionsToExecute)];
                case 10:
                    _l.sent();
                    if (toCreate.length) {
                        logActions("Created following links tables", toCreate);
                    }
                    if (toUpdate.length) {
                        logActions("Updated following links tables", toUpdate);
                    }
                    if (toDelete.length) {
                        logActions("Deleted following links tables", toDelete);
                    }
                    if (actionsToExecute.length) {
                        logger_1.logger.info("Links sync completed");
                    }
                    else {
                        logger_1.logger.info("Database already up-to-date");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var main = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var container, configModule, medusaAppLoader, plugins, linksSourcePaths, error_1;
        var directory = _b.directory, executeSafe = _b.executeSafe, executeAll = _b.executeAll;
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
                    configModule = container.resolve(utils_1.ContainerRegistrationKeys.CONFIG_MODULE);
                    medusaAppLoader = new framework_1.MedusaAppLoader();
                    return [4 /*yield*/, (0, utils_1.getResolvedPlugins)(directory, configModule, true)];
                case 3:
                    plugins = _c.sent();
                    (0, utils_1.mergePluginModules)(configModule, plugins);
                    linksSourcePaths = plugins.map(function (plugin) {
                        return (0, path_1.join)(plugin.resolve, "links");
                    });
                    return [4 /*yield*/, new links_1.LinkLoader(linksSourcePaths).load()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, syncLinks(medusaAppLoader, { executeAll: executeAll, executeSafe: executeSafe })];
                case 5:
                    _c.sent();
                    process.exit();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _c.sent();
                    logger_1.logger.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.default = main;
