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
exports.listProductTagsTransformQueryConfig = exports.retrieveProductTagTransformQueryConfig = exports.defaultAdminProductTagFields = void 0;
exports.defaultAdminProductTagFields = [
    "id",
    "value",
    "created_at",
    "updated_at",
];
exports.retrieveProductTagTransformQueryConfig = {
    defaults: exports.defaultAdminProductTagFields,
    isList: false,
};
exports.listProductTagsTransformQueryConfig = __assign(__assign({}, exports.retrieveProductTagTransformQueryConfig), { defaultLimit: 20, isList: true });
