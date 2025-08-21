"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOperatorMap = exports.createFindParams = exports.createSelectParams = exports.createLinkBody = exports.createBatchBody = exports.WithAdditionalData = void 0;
var zod_1 = require("zod");
/**
 * Wraps the original schema to a function to accept and merge
 * additional_data schema
 */
var WithAdditionalData = function (originalSchema, modifyCallback) {
    return function (additionalDataValidator) {
        var schema;
        if (!additionalDataValidator) {
            schema = originalSchema.extend({
                additional_data: zod_1.z.record(zod_1.z.unknown()).nullish(),
            });
        }
        else {
            schema = originalSchema.extend({
                additional_data: additionalDataValidator,
            });
        }
        return modifyCallback ? modifyCallback(schema) : schema;
    };
};
exports.WithAdditionalData = WithAdditionalData;
var createBatchBody = function (createValidator, updateValidator, deleteValidator) {
    if (deleteValidator === void 0) { deleteValidator = zod_1.z.string(); }
    return zod_1.z.object({
        create: zod_1.z.array(createValidator).optional(),
        update: zod_1.z.array(updateValidator).optional(),
        delete: zod_1.z.array(deleteValidator).optional(),
    });
};
exports.createBatchBody = createBatchBody;
var createLinkBody = function () {
    return zod_1.z.object({
        add: zod_1.z.array(zod_1.z.string()).optional(),
        remove: zod_1.z.array(zod_1.z.string()).optional(),
    });
};
exports.createLinkBody = createLinkBody;
var createSelectParams = function () {
    return zod_1.z.object({
        fields: zod_1.z.string().optional(),
    });
};
exports.createSelectParams = createSelectParams;
var createFindParams = function (_a) {
    var _b = _a === void 0 ? {} : _a, offset = _b.offset, limit = _b.limit, order = _b.order;
    var selectParams = (0, exports.createSelectParams)();
    return selectParams.merge(zod_1.z.object({
        offset: zod_1.z.preprocess(function (val) {
            if (val && typeof val === "string") {
                return parseInt(val);
            }
            return val;
        }, zod_1.z
            .number()
            .optional()
            .default(offset !== null && offset !== void 0 ? offset : 0)),
        limit: zod_1.z.preprocess(function (val) {
            if (val && typeof val === "string") {
                return parseInt(val);
            }
            return val;
        }, zod_1.z
            .number()
            .optional()
            .default(limit !== null && limit !== void 0 ? limit : 20)),
        order: order
            ? zod_1.z.string().optional().default(order)
            : zod_1.z.string().optional(),
        with_deleted: zod_1.z.preprocess(function (val) {
            if (val && typeof val === "string") {
                return val === "true" ? true : val === "false" ? false : val;
            }
            return val;
        }, zod_1.z.boolean().optional()),
    }));
};
exports.createFindParams = createFindParams;
var createOperatorMap = function (type, valueParser) {
    if (!type) {
        type = zod_1.z.string();
    }
    var simpleType = type.optional();
    if (valueParser) {
        simpleType = zod_1.z.preprocess(valueParser, type).optional();
    }
    var arrayType = zod_1.z.array(type).optional();
    var unionType = zod_1.z.union([simpleType, arrayType]).optional();
    return zod_1.z.union([
        unionType,
        zod_1.z.object({
            $eq: unionType,
            $ne: unionType,
            $in: arrayType,
            $nin: arrayType,
            $like: simpleType,
            $ilike: simpleType,
            $re: simpleType,
            $contains: simpleType,
            $gt: simpleType,
            $gte: simpleType,
            $lt: simpleType,
            $lte: simpleType,
        }),
    ]);
};
exports.createOperatorMap = createOperatorMap;
