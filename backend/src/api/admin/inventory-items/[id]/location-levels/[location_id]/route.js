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
exports.POST = exports.DELETE = void 0;
var utils_1 = require("@medusajs/framework/utils");
var core_flows_1 = require("@medusajs/core-flows");
var helpers_1 = require("../../../helpers");
var DELETE = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, location_id, query, result, _b, levelId, reservedQuantity, deleteInventoryLevelWorkflow, inventoryItem;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, location_id = _a.location_id;
                query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
                return [4 /*yield*/, query.graph({
                        entity: "inventory_level",
                        filters: { inventory_item_id: id, location_id: location_id },
                        fields: ["id", "reserved_quantity"],
                    })];
            case 1:
                result = _c.sent();
                if (!result.data.length) {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_FOUND, "Inventory Level for Item ".concat(id, " at Location ").concat(location_id, " not found"));
                }
                _b = result.data[0], levelId = _b.id, reservedQuantity = _b.reserved_quantity;
                if (reservedQuantity > 0) {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Cannot remove Inventory Level ".concat(id, " at Location ").concat(location_id, " because there are reservations at location"));
                }
                deleteInventoryLevelWorkflow = (0, core_flows_1.deleteInventoryLevelsWorkflow)(req.scope);
                return [4 /*yield*/, deleteInventoryLevelWorkflow.run({
                        input: {
                            id: [levelId],
                        },
                    })];
            case 2:
                _c.sent();
                return [4 /*yield*/, (0, helpers_1.refetchInventoryItem)(id, req.scope, req.queryConfig.fields)];
            case 3:
                inventoryItem = _c.sent();
                res.status(200).json({
                    id: levelId,
                    object: "inventory-level",
                    deleted: true,
                    parent: inventoryItem,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.DELETE = DELETE;
var POST = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, location_id, inventoryItem;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, location_id = _a.location_id;
                return [4 /*yield*/, (0, core_flows_1.updateInventoryLevelsWorkflow)(req.scope).run({
                        input: {
                            updates: [__assign(__assign({}, req.validatedBody), { inventory_item_id: id, location_id: location_id })],
                        },
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, helpers_1.refetchInventoryItem)(id, req.scope, req.queryConfig.fields)];
            case 2:
                inventoryItem = _b.sent();
                res.status(200).json({
                    inventory_item: inventoryItem,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.POST = POST;
