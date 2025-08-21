"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetCurrenciesParams = exports.AdminGetCurrenciesParamsFields = exports.AdminGetCurrencyParams = void 0;
var zod_1 = require("zod");
var validators_1 = require("../../utils/validators");
var common_validators_1 = require("../../utils/common-validators");
exports.AdminGetCurrencyParams = (0, validators_1.createSelectParams)();
exports.AdminGetCurrenciesParamsFields = zod_1.z.object({
    q: zod_1.z.string().optional(),
    code: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
});
exports.AdminGetCurrenciesParams = (0, validators_1.createFindParams)({
    offset: 0,
    limit: 200,
})
    .merge(exports.AdminGetCurrenciesParamsFields)
    .merge((0, common_validators_1.applyAndAndOrOperators)(exports.AdminGetCurrenciesParamsFields));
