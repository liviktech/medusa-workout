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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminRetrieveRefundReasonFields = exports.defaultAdminRefundReasonFields = void 0;
exports.defaultAdminRefundReasonFields = [
    "id",
    "label",
    "description",
    "created_at",
    "updated_at",
    "deleted_at",
];
exports.defaultAdminRetrieveRefundReasonFields = __spreadArray([], exports.defaultAdminRefundReasonFields, true);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminRetrieveRefundReasonFields,
    isList: false,
};
exports.listTransformQueryConfig = {
    defaults: exports.defaultAdminRefundReasonFields,
    defaultLimit: 20,
    isList: true,
};
