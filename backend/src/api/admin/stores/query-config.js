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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransformQueryConfig = exports.retrieveTransformQueryConfig = exports.defaultAdminStoreFields = void 0;
exports.defaultAdminStoreFields = [
    "id",
    "name",
    "*supported_currencies",
    "*supported_currencies.currency",
    "default_sales_channel_id",
    "default_region_id",
    "default_location_id",
    "metadata",
    "created_at",
    "updated_at",
];
exports.retrieveTransformQueryConfig = {
    defaults: exports.defaultAdminStoreFields,
    isList: false,
};
exports.listTransformQueryConfig = __assign(__assign({}, exports.retrieveTransformQueryConfig), { isList: true });
