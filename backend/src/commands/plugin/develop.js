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
exports.default = developPlugin;
var path_1 = require("path");
var swcCore = require("@swc/core");
var child_process_1 = require("child_process");
var logger_1 = require("@medusajs/framework/logger");
var build_tools_1 = require("@medusajs/framework/build-tools");
function developPlugin(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        /**
         * Publishes the build output to the registry and updates
         * installations
         */
        function publishChanges() {
            /**
             * Here we avoid multiple publish calls when the filesystem is
             * changed too quickly. This might result in stale content in
             * some edge cases. However, not preventing multiple publishes
             * at the same time will result in race conditions and the old
             * output might appear in the published package.
             */
            if (isBusy) {
                return;
            }
            isBusy = true;
            /**
             * Yalc is meant to be used a binary and not as a long-lived
             * module import. Therefore we will have to execute it like
             * a command to get desired outcome. Otherwise, yalc behaves
             * flaky.
             */
            (0, child_process_1.execFile)(yalcBin, ["publish", "--push", "--no-scripts"], {
                cwd: directory,
            }, function (error, stdout, stderr) {
                isBusy = false;
                if (error) {
                    console.log(error);
                }
                console.log(stdout);
                console.error(stderr);
            });
        }
        /**
         * Transforms a given file using @swc/core
         */
        function transformFile(filePath) {
            return __awaiter(this, void 0, void 0, function () {
                var output;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, swcCore.transformFile(filePath, {
                                sourceMaps: "inline",
                                module: {
                                    type: "commonjs",
                                    strictMode: true,
                                    noInterop: false,
                                },
                                jsc: {
                                    externalHelpers: false,
                                    target: "es2021",
                                    parser: {
                                        syntax: "typescript",
                                        tsx: true,
                                        decorators: true,
                                        dynamicImport: true,
                                    },
                                    transform: {
                                        legacyDecorator: true,
                                        decoratorMetadata: true,
                                        react: {
                                            throwIfNamespace: false,
                                            useBuiltins: false,
                                            pragma: "React.createElement",
                                            pragmaFrag: "React.Fragment",
                                            importSource: "react",
                                            runtime: "automatic",
                                        },
                                    },
                                    keepClassNames: true,
                                    baseUrl: directory,
                                },
                            })];
                        case 1:
                            output = _a.sent();
                            return [2 /*return*/, output.code];
                    }
                });
            });
        }
        var isBusy, compiler, parsedConfig, yalcBin;
        var directory = _b.directory;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    isBusy = false;
                    compiler = new build_tools_1.Compiler(directory, logger_1.logger);
                    return [4 /*yield*/, compiler.loadTSConfigFile()];
                case 1:
                    parsedConfig = _c.sent();
                    if (!parsedConfig) {
                        return [2 /*return*/];
                    }
                    yalcBin = path_1.default.join(path_1.default.dirname(require.resolve("yalc")), "yalc.js");
                    return [4 /*yield*/, compiler.buildPluginBackend(parsedConfig)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, compiler.developPluginBackend(transformFile, publishChanges)];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
