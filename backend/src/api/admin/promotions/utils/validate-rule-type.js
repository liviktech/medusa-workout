"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRuleType = validateRuleType;
var utils_1 = require("@medusajs/framework/utils");
var validRuleTypes = Object.values(utils_1.RuleType);
function validateRuleType(ruleType) {
    var underscorizedRuleType = ruleType.split("-").join("_");
    if (!validRuleTypes.includes(underscorizedRuleType)) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Invalid param rule_type (".concat(ruleType, ")"));
    }
}
