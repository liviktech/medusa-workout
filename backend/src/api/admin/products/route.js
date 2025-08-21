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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
var core_flows_1 = require("@medusajs/core-flows");
var framework_1 = require("@medusajs/framework");
var http_1 = require("@medusajs/framework/http");
var utils_1 = require("@medusajs/framework/utils");
var index_engine_1 = require("../../../loaders/feature-flags/index-engine");
var helpers_1 = require("./helpers");
var GET = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!framework_1.featureFlagRouter.isFeatureEnabled(index_engine_1.default.key)) return [3 /*break*/, 4];
                if (!(Object.keys(req.filterableFields).length === 0 ||
                    (0, utils_1.isPresent)(req.filterableFields.tags) ||
                    (0, utils_1.isPresent)(req.filterableFields.categories))) return [3 /*break*/, 2];
                return [4 /*yield*/, getProducts(req, res)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, getProductsWithIndexEngine(req, res)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [4 /*yield*/, getProducts(req, res)];
            case 5: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.GET = GET;
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var selectFields, _a, products, metadata;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    selectFields = (0, helpers_1.remapKeysForProduct)((_b = req.queryConfig.fields) !== null && _b !== void 0 ? _b : []);
                    return [4 /*yield*/, (0, http_1.refetchEntities)("product", req.filterableFields, req.scope, selectFields, req.queryConfig.pagination, req.queryConfig.withDeleted)];
                case 1:
                    _a = _c.sent(), products = _a.rows, metadata = _a.metadata;
                    res.json({
                        products: products.map(helpers_1.remapProductResponse),
                        count: metadata.count,
                        offset: metadata.skip,
                        limit: metadata.take,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getProductsWithIndexEngine(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, filters, salesChannelIds, _a, products, metadata;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
                    filters = req.filterableFields;
                    if ((0, utils_1.isPresent)(filters.sales_channel_id)) {
                        salesChannelIds = filters.sales_channel_id;
                        (_b = filters["sales_channels"]) !== null && _b !== void 0 ? _b : (filters["sales_channels"] = {});
                        filters["sales_channels"]["id"] = salesChannelIds;
                        delete filters.sales_channel_id;
                    }
                    return [4 /*yield*/, query.index({
                            entity: "product",
                            fields: (_c = req.queryConfig.fields) !== null && _c !== void 0 ? _c : [],
                            filters: filters,
                            pagination: req.queryConfig.pagination,
                            withDeleted: req.queryConfig.withDeleted,
                        })];
                case 1:
                    _a = _d.sent(), products = _a.data, metadata = _a.metadata;
                    res.json({
                        products: products.map(helpers_1.remapProductResponse),
                        count: metadata.estimate_count,
                        estimate_count: metadata.estimate_count,
                        offset: metadata.skip,
                        limit: metadata.take,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var POST = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, additional_data, products, result, product;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.validatedBody, additional_data = _a.additional_data, products = __rest(_a, ["additional_data"]);
                return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(req.scope).run({
                        input: { products: [products], additional_data: additional_data },
                    })];
            case 1:
                result = (_c.sent()).result;
                return [4 /*yield*/, (0, http_1.refetchEntity)("product", result[0].id, req.scope, (0, helpers_1.remapKeysForProduct)((_b = req.queryConfig.fields) !== null && _b !== void 0 ? _b : []))];
            case 2:
                product = _c.sent();
                res.status(200).json({ product: (0, helpers_1.remapProductResponse)(product) });
                return [2 /*return*/];
        }
    });
}); };
exports.POST = POST;
