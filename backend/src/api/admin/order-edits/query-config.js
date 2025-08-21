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
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminDetailsOrderEditFields = exports.defaultAdminOrderEditFields = void 0;
exports.defaultAdminOrderEditFields = [
    "id",
    "order_id",
    "display_id",
    "order_version",
    "created_at",
    "updated_at",
    "canceled_at",
];
exports.defaultAdminDetailsOrderEditFields = __spreadArray([], exports.defaultAdminOrderEditFields, true);
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminDetailsOrderEditFields,
    isList: false,
};
exports.listTransformQueryConfig = {
    defaults: exports.defaultAdminOrderEditFields,
    defaultLimit: 20,
    isList: true,
};
