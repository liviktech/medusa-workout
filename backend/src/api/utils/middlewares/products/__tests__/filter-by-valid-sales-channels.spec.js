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
var utils_1 = require("@medusajs/framework/utils");
var filter_by_valid_sales_channels_1 = require("../filter-by-valid-sales-channels");
describe("filter-by-valid-sales-channels", function () {
    describe("transformAndValidateSalesChannelIds", function () {
        var req;
        beforeEach(function () {
            req = {
                publishable_key_context: {
                    key: "test-key",
                    sales_channel_ids: ["sc-1", "sc-2"],
                },
                validatedQuery: {},
            };
        });
        it("should return sales channel ids from request when they exist and are in publishable key", function () {
            req.validatedQuery = { sales_channel_id: ["sc-1"] };
            var result = (0, filter_by_valid_sales_channels_1.transformAndValidateSalesChannelIds)(req);
            expect(result).toEqual(["sc-1"]);
        });
        it("should handle sales_channel_id as string and transform to array", function () {
            req.validatedQuery = { sales_channel_id: "sc-2" };
            var result = (0, filter_by_valid_sales_channels_1.transformAndValidateSalesChannelIds)(req);
            expect(result).toEqual(["sc-2"]);
        });
        it("should throw error when requested sales channel is not in publishable key", function () {
            req.validatedQuery = { sales_channel_id: ["sc-3"] };
            expect(function () {
                (0, filter_by_valid_sales_channels_1.transformAndValidateSalesChannelIds)(req);
            }).toThrow(utils_1.MedusaError);
        });
        it("should return sales channel ids from publishable key when no ids in request", function () {
            req.validatedQuery = {};
            var result = (0, filter_by_valid_sales_channels_1.transformAndValidateSalesChannelIds)(req);
            expect(result).toEqual(["sc-1", "sc-2"]);
        });
        it("should return empty array when no sales channel ids in publishable key or request", function () {
            req.publishable_key_context = {
                key: "test-key",
                sales_channel_ids: [],
            };
            req.validatedQuery = {};
            var result = (0, filter_by_valid_sales_channels_1.transformAndValidateSalesChannelIds)(req);
            expect(result).toEqual([]);
        });
    });
    describe("filterByValidSalesChannels", function () {
        var req;
        var res;
        var next;
        var middleware;
        beforeEach(function () {
            req = {
                publishable_key_context: {
                    key: "test-key",
                    sales_channel_ids: ["sc-1", "sc-2"],
                },
                validatedQuery: {},
                filterableFields: {},
            };
            res = {};
            next = jest.fn();
            middleware = (0, filter_by_valid_sales_channels_1.filterByValidSalesChannels)();
        });
        it("should set filterableFields.sales_channel_id and call next", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, middleware(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(req.filterableFields.sales_channel_id).toEqual(["sc-1", "sc-2"]);
                        expect(next).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw error when no sales channels available", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.publishable_key_context = {
                            key: "test-key",
                            sales_channel_ids: [],
                        };
                        return [4 /*yield*/, expect(middleware(req, res, next)).rejects.toThrow("Publishable key needs to have a sales channel configured")];
                    case 1:
                        _a.sent();
                        expect(next).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should use only sales channels from request that are in publishable key", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.validatedQuery = { sales_channel_id: ["sc-1"] };
                        return [4 /*yield*/, middleware(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(req.filterableFields.sales_channel_id).toEqual(["sc-1"]);
                        expect(next).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should handle sales_channel_id as string in request", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.validatedQuery = { sales_channel_id: "sc-2" };
                        return [4 /*yield*/, middleware(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(req.filterableFields.sales_channel_id).toEqual(["sc-2"]);
                        expect(next).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
