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
exports.default = exec;
var loaders_1 = require("../loaders");
var express_1 = require("express");
var path_1 = require("path");
var fs_1 = require("fs");
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
function exec(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var app, directory, filePath, scriptToExec, container, scriptParams, err_1;
        var file = _b.file, args = _b.args;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    logger_1.logger.info("Executing script at ".concat(file, "..."));
                    app = (0, express_1.default)();
                    directory = process.cwd();
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    filePath = path_1.default.resolve(directory, file);
                    if (!(0, fs_1.existsSync)(filePath)) {
                        throw new Error("File ".concat(filePath, " doesn't exist."));
                    }
                    return [4 /*yield*/, (0, utils_1.dynamicImport)(path_1.default.resolve(filePath))];
                case 2:
                    scriptToExec = (_c.sent()).default;
                    if (!scriptToExec || typeof scriptToExec !== "function") {
                        throw new Error("File doesn't default export a function to execute.");
                    }
                    // set worker mode
                    process.env.MEDUSA_WORKER_MODE = "worker";
                    return [4 /*yield*/, (0, loaders_1.default)({
                            directory: directory,
                            expressApp: app,
                        })];
                case 3:
                    container = (_c.sent()).container;
                    scriptParams = {
                        container: container,
                        args: args,
                    };
                    return [4 /*yield*/, scriptToExec(scriptParams)];
                case 4:
                    _c.sent();
                    logger_1.logger.info("Finished executing script.");
                    process.exit();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _c.sent();
                    logger_1.logger.error("Error running script", err_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
