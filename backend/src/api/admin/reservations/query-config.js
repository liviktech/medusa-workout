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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminReservationFields = void 0;
var query_config_1 = require("../inventory-items/query-config");
exports.defaultAdminReservationFields = __spreadArray([
    "id",
    "location_id",
    "inventory_item_id",
    "quantity",
    "line_item_id",
    "description",
    "metadata",
    "created_at",
    "updated_at"
], query_config_1.defaultAdminInventoryItemFields.map(function (f) { return "inventory_item.".concat(f); }), true);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminReservationFields,
    isList: false,
};
exports.listTransformQueryConfig = __assign(__assign({}, exports.retrieveTransformQueryConfig), { isList: true });
