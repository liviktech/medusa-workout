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
exports.listPricePreferenceQueryConfig = exports.retrivePricePreferenceQueryConfig = exports.adminPricePreferenceRemoteQueryFields = void 0;
exports.adminPricePreferenceRemoteQueryFields = [
    "id",
    "attribute",
    "value",
    "is_tax_inclusive",
    "created_at",
    "deleted_at",
    "updated_at",
];
exports.retrivePricePreferenceQueryConfig = {
    defaults: exports.adminPricePreferenceRemoteQueryFields,
    isList: false,
};
exports.listPricePreferenceQueryConfig = __assign(__assign({}, exports.retrivePricePreferenceQueryConfig), { isList: true });
