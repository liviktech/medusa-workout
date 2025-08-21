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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminLoader;
var logger_1 = require("@medusajs/framework/logger");
var path_1 = require("path");
var utils_1 = require("../utils");
var NOT_ALLOWED_PATHS = ["/auth", "/store", "/admin"];
function adminLoader(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var admin, sources, pluginAdminPaths, _i, plugins_1, plugin, adminOptions;
        var app = _b.app, configModule = _b.configModule, rootDirectory = _b.rootDirectory, plugins = _b.plugins;
        return __generator(this, function (_c) {
            admin = configModule.admin;
            sources = [];
            pluginAdminPaths = [];
            for (_i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
                plugin = plugins_1[_i];
                if (!plugin.admin) {
                    continue;
                }
                if (plugin.admin.type === "local") {
                    sources.push(plugin.admin.resolve);
                }
                else {
                    pluginAdminPaths.push(plugin.admin.resolve);
                }
            }
            adminOptions = __assign(__assign({ disable: false, sources: sources, plugins: pluginAdminPaths }, admin), { outDir: path_1.default.join(rootDirectory, utils_1.ADMIN_RELATIVE_OUTPUT_DIR) });
            if (adminOptions === null || adminOptions === void 0 ? void 0 : adminOptions.disable) {
                return [2 /*return*/, app];
            }
            if (NOT_ALLOWED_PATHS.includes(adminOptions.path)) {
                logger_1.logger.error("The 'admin.path' in 'medusa-config.js' is set to a value that is not allowed. This can prevent your server from working correctly. Please set 'admin.path' to a value that is not one of the following: ".concat(NOT_ALLOWED_PATHS.join(", "), "."));
            }
            if (process.env.NODE_ENV === "development") {
                return [2 /*return*/, initDevelopmentServer(app, adminOptions)];
            }
            return [2 /*return*/, serveProductionBuild(app, adminOptions)];
        });
    });
}
function initDevelopmentServer(app, options) {
    return __awaiter(this, void 0, void 0, function () {
        var develop, adminMiddleware;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("@medusajs/admin-bundler"); })];
                case 1:
                    develop = (_a.sent()).develop;
                    return [4 /*yield*/, develop(options)];
                case 2:
                    adminMiddleware = _a.sent();
                    app.use(options.path, adminMiddleware);
                    return [2 /*return*/, app];
            }
        });
    });
}
function serveProductionBuild(app, options) {
    return __awaiter(this, void 0, void 0, function () {
        var serve, adminRoute;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("@medusajs/admin-bundler"); })];
                case 1:
                    serve = (_a.sent()).serve;
                    return [4 /*yield*/, serve(options)];
                case 2:
                    adminRoute = _a.sent();
                    app.use(options.path, adminRoute);
                    return [2 /*return*/, app];
            }
        });
    });
}
