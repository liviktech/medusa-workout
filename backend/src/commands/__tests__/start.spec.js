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
var start_1 = require("../start");
var utils = require("@medusajs/framework/utils");
var logger = require("@medusajs/framework/logger");
var instrumentationFixture = require("../__fixtures__/instrumentation");
var instrumentationFailureFixture = require("../__fixtures__/instrumentation-failure/instrumentation");
var path_1 = require("path");
describe("start", function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    describe("registerInstrumentation", function () {
        it("should not throw when registering the instrumentation if the file is not ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fsSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsSpy = jest.spyOn(utils.FileSystem.prototype, "exists", "");
                        return [4 /*yield*/, (0, start_1.registerInstrumentation)(__dirname)];
                    case 1:
                        _a.sent();
                        expect(fsSpy).toHaveBeenCalled();
                        expect(fsSpy).toHaveBeenCalledWith(expect.stringContaining("instrumentation.js"));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should log an info message if the file is present but not register function is found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fsSpy, loggerSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsSpy = jest.spyOn(utils.FileSystem.prototype, "exists", "");
                        loggerSpy = jest.spyOn(logger.logger, "info", "");
                        return [4 /*yield*/, (0, start_1.registerInstrumentation)(path_1.default.join(__dirname, "../__fixtures__/instrumentation-no-register"))];
                    case 1:
                        _a.sent();
                        expect(fsSpy).toHaveBeenCalled();
                        expect(fsSpy).toHaveBeenCalledWith(expect.stringContaining("instrumentation.js"));
                        expect(loggerSpy).toHaveBeenCalled();
                        expect(loggerSpy).toHaveBeenCalledWith("Skipping instrumentation registration. No register function found.");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should register the instrumentation if the file is present and exports a register function", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fsSpy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsSpy = jest.spyOn(utils.FileSystem.prototype, "exists", "");
                        instrumentationFixture.registerMock.mockReturnValue(true);
                        return [4 /*yield*/, (0, start_1.registerInstrumentation)(path_1.default.join(__dirname, "../__fixtures__"))];
                    case 1:
                        _a.sent();
                        expect(fsSpy).toHaveBeenCalled();
                        expect(instrumentationFixture.registerMock).toHaveBeenCalled();
                        expect(fsSpy).toHaveBeenCalledWith(expect.stringContaining("instrumentation.js"));
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw if the instrumentation file exists but cannot be imported", function () { return __awaiter(void 0, void 0, void 0, function () {
            var fsSpy, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsSpy = jest.spyOn(utils.FileSystem.prototype, "exists", "");
                        return [4 /*yield*/, (0, start_1.registerInstrumentation)(path_1.default.join(__dirname, "../__fixtures__/instrumentation-failure")).catch(function (e) { return e; })];
                    case 1:
                        err = _a.sent();
                        expect(fsSpy).toHaveBeenCalled();
                        expect(instrumentationFailureFixture.registerMock).toHaveBeenCalled();
                        expect(fsSpy).toHaveBeenCalledWith(expect.stringContaining("instrumentation.js"));
                        expect(err).toBeInstanceOf(Error);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
