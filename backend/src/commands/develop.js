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
exports.default = default_1;
var boxen_1 = require("boxen");
var child_process_1 = require("child_process");
var chokidar_1 = require("chokidar");
var telemetry_1 = require("@medusajs/telemetry");
var os_1 = require("os");
var path_1 = require("path");
var logger_1 = require("@medusajs/framework/logger");
var framework_1 = require("@medusajs/framework");
var defaultConfig = {
    padding: 5,
    borderColor: "blue",
    borderStyle: "double",
};
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var args, argv, cliPath, devServer;
        var types = _b.types, directory = _b.directory;
        return __generator(this, function (_c) {
            args = process.argv;
            argv = process.argv.indexOf("--") !== -1
                ? process.argv.slice(process.argv.indexOf("--") + 1)
                : [];
            args.shift();
            args.shift();
            args.shift();
            if (types) {
                args.push("--types");
            }
            cliPath = path_1.default.resolve(framework_1.MEDUSA_CLI_PATH, "..", "..", "cli.js");
            devServer = {
                childProcess: null,
                watcher: null,
                /**
                 * Start the development server by forking a new process.
                 *
                 * We do not kill the parent process when child process dies. This is
                 * because sometimes the dev server can die because of programming
                 * or logical errors and we can still watch the file system and
                 * restart the dev server instead of asking the user to re-run
                 * the command.
                 */
                start: function () {
                    this.childProcess = (0, child_process_1.fork)(cliPath, __spreadArray(["start"], args, true), {
                        cwd: directory,
                        env: __assign(__assign({}, process.env), { NODE_ENV: "development" }),
                        execArgv: argv,
                    });
                    this.childProcess.on("error", function (error) {
                        // @ts-ignore
                        logger_1.logger.error("Dev server failed to start", error);
                        logger_1.logger.info("The server will restart automatically after your changes");
                    });
                },
                /**
                 * Restarts the development server by cleaning up the existing
                 * child process and forking a new one
                 */
                restart: function () {
                    if (this.childProcess) {
                        this.childProcess.removeAllListeners();
                        if (process.platform === "win32") {
                            (0, child_process_1.execSync)("taskkill /PID ".concat(this.childProcess.pid, " /F /T"));
                        }
                        else {
                            this.childProcess.kill("SIGINT");
                        }
                    }
                    this.start();
                },
                /**
                 * Watches the entire file system and ignores the following files
                 *
                 * - Dot files
                 * - node_modules
                 * - dist
                 * - src/admin/**
                 */
                watch: function () {
                    var _this = this;
                    this.watcher = chokidar_1.default.watch(["."], {
                        ignoreInitial: true,
                        cwd: process.cwd(),
                        ignored: [
                            /(^|[\\/\\])\../,
                            "node_modules",
                            "dist",
                            "static",
                            "private",
                            "src/admin/**/*",
                            ".medusa/**/*",
                        ],
                    });
                    this.watcher.on("add", function (file) {
                        logger_1.logger.info("".concat(path_1.default.relative(directory, file), " created: Restarting dev server"));
                        _this.restart();
                    });
                    this.watcher.on("change", function (file) {
                        logger_1.logger.info("".concat(path_1.default.relative(directory, file), " modified: Restarting dev server"));
                        _this.restart();
                    });
                    this.watcher.on("unlink", function (file) {
                        logger_1.logger.info("".concat(path_1.default.relative(directory, file), " removed: Restarting dev server"));
                        _this.restart();
                    });
                    this.watcher.on("ready", function () {
                        logger_1.logger.info("Watching filesystem to reload dev server on file change");
                    });
                },
            };
            process.on("SIGINT", function () {
                var _a;
                var configStore = new telemetry_1.Store();
                var hasPrompted = (_a = configStore.getConfig("star.prompted")) !== null && _a !== void 0 ? _a : false;
                if (!hasPrompted) {
                    var defaultMessage = "\u2728 Thanks for using Medusa. \u2728".concat(os_1.EOL).concat(os_1.EOL) +
                        "If you liked it, please consider starring us on GitHub".concat(os_1.EOL) +
                        "https://medusajs.com/star".concat(os_1.EOL) +
                        "".concat(os_1.EOL) +
                        "Note: you will not see this message again.";
                    console.log();
                    console.log((0, boxen_1.default)(defaultMessage, defaultConfig));
                    configStore.setConfig("star.prompted", true);
                }
                process.exit(0);
            });
            devServer.start();
            devServer.watch();
            return [2 /*return*/];
        });
    });
}
