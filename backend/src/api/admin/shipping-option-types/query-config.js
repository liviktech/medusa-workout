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
exports.listShippingOptionTypesTransformQueryConfig = exports.retrieveShippingOptionTypeTransformQueryConfig = exports.defaultAdminShippingOptionTypeFields = void 0;
exports.defaultAdminShippingOptionTypeFields = [
    "id",
    "label",
    "code",
    "description",
    "created_at",
    "updated_at",
];
exports.retrieveShippingOptionTypeTransformQueryConfig = {
    defaults: exports.defaultAdminShippingOptionTypeFields,
    isList: false,
};
exports.listShippingOptionTypesTransformQueryConfig = __assign(__assign({}, exports.retrieveShippingOptionTypeTransformQueryConfig), { defaultLimit: 20, isList: true });
