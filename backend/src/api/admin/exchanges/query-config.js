"use strict";
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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminDetailsExchangeFields = exports.defaultAdminExchangeFields = void 0;
exports.defaultAdminExchangeFields = [
    "id",
    "order_id",
    "return_id",
    "display_id",
    "order_version",
    "created_by",
    "created_at",
    "updated_at",
    "canceled_at",
];
exports.defaultAdminDetailsExchangeFields = __spreadArray(__spreadArray([], exports.defaultAdminExchangeFields, true), [
    "additional_items.*",
], false);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminDetailsExchangeFields,
    isList: false,
};
exports.listTransformQueryConfig = {
    defaults: exports.defaultAdminExchangeFields,
    defaultLimit: 20,
    isList: true,
};
