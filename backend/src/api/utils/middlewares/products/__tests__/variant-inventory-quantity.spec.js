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
var utils_1 = require("@medusajs/framework/utils");
var variant_inventory_quantity_1 = require("../variant-inventory-quantity");
jest.mock("@medusajs/framework/utils", function () {
    var originalModule = jest.requireActual("@medusajs/framework/utils");
    return __assign(__assign({}, originalModule), { getTotalVariantAvailability: jest.fn(), getVariantAvailability: jest.fn() });
});
describe("variant-inventory-quantity", function () {
    var req;
    var mockQuery;
    var variants;
    beforeEach(function () {
        mockQuery = jest.fn();
        variants = [
            { id: "variant-1", manage_inventory: true },
            { id: "variant-2", manage_inventory: true },
            { id: "variant-3", manage_inventory: false },
        ];
        req = {
            scope: {
                resolve: jest.fn().mockReturnValue(mockQuery),
            },
        };
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe("wrapVariantsWithTotalInventoryQuantity", function () {
        it("should not call getTotalVariantAvailability when variants array is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithTotalInventoryQuantity)(req, [])];
                    case 1:
                        _a.sent();
                        expect(utils_1.getTotalVariantAvailability).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should call getTotalVariantAvailability with correct parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAvailability = {
                            "variant-1": { availability: 10 },
                            "variant-2": { availability: 5 },
                        };
                        utils_1.getTotalVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithTotalInventoryQuantity)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(req.scope.resolve).toHaveBeenCalledWith(utils_1.ContainerRegistrationKeys.QUERY);
                        expect(utils_1.getTotalVariantAvailability).toHaveBeenCalledWith(mockQuery, {
                            variant_ids: ["variant-1", "variant-2", "variant-3"],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should update inventory_quantity for variants with manage_inventory=true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAvailability = {
                            "variant-1": { availability: 10 },
                            "variant-2": { availability: 5 },
                            "variant-3": { availability: 20 },
                        };
                        utils_1.getTotalVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithTotalInventoryQuantity)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(variants[0].inventory_quantity).toBe(10);
                        expect(variants[1].inventory_quantity).toBe(5);
                        expect(variants[2].inventory_quantity).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("wrapVariantsWithInventoryQuantityForSalesChannel", function () {
        beforeEach(function () {
            req = {
                scope: {
                    resolve: jest.fn().mockReturnValue(mockQuery),
                },
                publishable_key_context: {
                    sales_channel_ids: ["sc-1"],
                },
                validatedQuery: {},
            };
        });
        it("should throw an error when multiple sales channels are available and no single one is specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.publishable_key_context.sales_channel_ids = ["sc-1", "sc-2"];
                        req.validatedQuery = { sales_channel_id: ["sc-1", "sc-2"] };
                        return [4 /*yield*/, expect((0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, variants)).rejects.toThrow(utils_1.MedusaError)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should use sales channel from query when single channel is specified", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.validatedQuery = { sales_channel_id: ["sc-2"] };
                        req.publishable_key_context = {
                            key: "test-key",
                            sales_channel_ids: ["sc-1", "sc-2"],
                        };
                        mockAvailability = {
                            "variant-1": { availability: 7 },
                            "variant-2": { availability: 3 },
                        };
                        utils_1.getVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(utils_1.getVariantAvailability).toHaveBeenCalledWith(mockQuery, {
                            variant_ids: ["variant-1", "variant-2", "variant-3"],
                            sales_channel_id: "sc-2",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should use sales channel from publishable key when single channel is available", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAvailability = {
                            "variant-1": { availability: 12 },
                            "variant-2": { availability: 8 },
                        };
                        utils_1.getVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(utils_1.getVariantAvailability).toHaveBeenCalledWith(mockQuery, {
                            variant_ids: ["variant-1", "variant-2", "variant-3"],
                            sales_channel_id: "sc-1",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should handle non-array sales_channel_id in query", function () { return __awaiter(void 0, void 0, void 0, function () {
            var originalPublishableKeyContext, mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.validatedQuery = { sales_channel_id: "sc-2" };
                        originalPublishableKeyContext = (0, utils_1.deepCopy)(req.publishable_key_context);
                        req.publishable_key_context = {
                            key: "test-key",
                            sales_channel_ids: ["sc-1", "sc-2"],
                        };
                        mockAvailability = {
                            "variant-1": { availability: 7 },
                            "variant-2": { availability: 3 },
                        };
                        utils_1.getVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(utils_1.getVariantAvailability).toHaveBeenCalledWith(mockQuery, {
                            variant_ids: ["variant-1", "variant-2", "variant-3"],
                            sales_channel_id: "sc-2",
                        });
                        req.publishable_key_context = originalPublishableKeyContext;
                        return [2 /*return*/];
                }
            });
        }); });
        it("should update inventory_quantity for variants with manage_inventory=true", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAvailability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAvailability = {
                            "variant-1": { availability: 15 },
                            "variant-2": { availability: 9 },
                            "variant-3": { availability: 25 },
                        };
                        utils_1.getVariantAvailability.mockResolvedValueOnce(mockAvailability);
                        return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, variants)];
                    case 1:
                        _a.sent();
                        expect(variants[0].inventory_quantity).toBe(15);
                        expect(variants[1].inventory_quantity).toBe(9);
                        expect(variants[2].inventory_quantity).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should not call getVariantAvailability when variants array is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, variant_inventory_quantity_1.wrapVariantsWithInventoryQuantityForSalesChannel)(req, [])];
                    case 1:
                        _a.sent();
                        expect(utils_1.getVariantAvailability).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
