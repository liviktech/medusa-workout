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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminDetailsClaimFields = exports.defaultAdminClaimFields = void 0;
exports.defaultAdminClaimFields = [
    "id",
    "type",
    "order_id",
    "return_id",
    "display_id",
    "order_version",
    "refund_amount",
    "created_by",
    "created_at",
    "updated_at",
    "canceled_at",
];
exports.defaultAdminDetailsClaimFields = __spreadArray(__spreadArray([], exports.defaultAdminClaimFields, true), [
    "additional_items.*",
    "claim_items.*",
    "claim_items.reason.*",
], false);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminDetailsClaimFields,
    isList: false,
};
exports.listTransformQueryConfig = {
    defaults: exports.defaultAdminClaimFields,
    defaultLimit: 20,
    isList: true,
};
