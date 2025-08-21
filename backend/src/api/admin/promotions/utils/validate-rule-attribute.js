"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRuleAttribute = validateRuleAttribute;
var utils_1 = require("@medusajs/framework/utils");
var rule_attributes_map_1 = require("./rule-attributes-map");
function validateRuleAttribute(attributes) {
    var promotionType = attributes.promotionType, ruleType = attributes.ruleType, ruleAttributeId = attributes.ruleAttributeId, applicationMethodType = attributes.applicationMethodType;
    var ruleAttributes = (0, rule_attributes_map_1.getRuleAttributesMap)({
        promotionType: promotionType,
        applicationMethodType: applicationMethodType,
    })[ruleType] || [];
    var ruleAttribute = ruleAttributes.find(function (obj) { return obj.id === ruleAttributeId; });
    if (!ruleAttribute) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Invalid rule attribute - ".concat(ruleAttributeId));
    }
}
