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
exports.setPricingContext = setPricingContext;
var http_1 = require("@medusajs/framework/http");
var utils_1 = require("@medusajs/framework/utils");
function setPricingContext() {
    var _this = this;
    return function (req, _, next) { return __awaiter(_this, void 0, void 0, function () {
        var withCalculatedPrice, region, pricingContext, customerGroups;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    withCalculatedPrice = req.queryConfig.fields.some(function (field) {
                        return field.startsWith("variants.calculated_price");
                    });
                    if (!withCalculatedPrice) {
                        return [2 /*return*/, next()];
                    }
                    return [4 /*yield*/, (0, http_1.refetchEntity)("region", req.filterableFields.region_id, req.scope, ["id", "currency_code"])];
                case 1:
                    region = _b.sent();
                    if (!region) {
                        try {
                            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Region with id ".concat(req.filterableFields.region_id, " not found when populating the pricing context"));
                        }
                        catch (e) {
                            return [2 /*return*/, next(e)];
                        }
                    }
                    pricingContext = {
                        region_id: region.id,
                        currency_code: region.currency_code,
                    };
                    if (!((_a = req.auth_context) === null || _a === void 0 ? void 0 : _a.actor_id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, http_1.refetchEntities)("customer_group", { customers: { id: req.auth_context.actor_id } }, req.scope, ["id"])];
                case 2:
                    customerGroups = _b.sent();
                    pricingContext.customer = { groups: [] };
                    customerGroups.map(function (cg) { var _a, _b; return (_b = (_a = pricingContext.customer) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.push({ id: cg.id }); });
                    _b.label = 3;
                case 3:
                    req.pricingContext = pricingContext;
                    return [2 /*return*/, next()];
            }
        });
    }); };
}
