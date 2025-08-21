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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminDetailsReturnFields = exports.defaultAdminReturnFields = void 0;
exports.defaultAdminReturnFields = [
    "id",
    "order_id",
    "exchange_id",
    "claim_id",
    "display_id",
    "location_id",
    "order_version",
    "status",
    "metadata",
    "no_notification",
    "refund_amount",
    "created_by",
    "created_at",
    "updated_at",
    "canceled_at",
    "requested_at",
    "received_at",
];
exports.defaultAdminDetailsReturnFields = __spreadArray(__spreadArray([], exports.defaultAdminReturnFields, true), [
    "items.*",
    "items.reason.*",
], false);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminDetailsReturnFields,
    isList: false,
};
exports.listTransformQueryConfig = {
    defaults: exports.defaultAdminReturnFields,
    defaultLimit: 20,
    isList: true,
};
