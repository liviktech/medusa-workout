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
exports.getRuleAttributesMap = exports.DisguisedRule = void 0;
var utils_1 = require("@medusajs/framework/utils");
var operators_map_1 = require("./operators-map");
var DisguisedRule;
(function (DisguisedRule) {
    DisguisedRule["APPLY_TO_QUANTITY"] = "apply_to_quantity";
    DisguisedRule["BUY_RULES_MIN_QUANTITY"] = "buy_rules_min_quantity";
    DisguisedRule["CURRENCY_CODE"] = "currency_code";
})(DisguisedRule || (exports.DisguisedRule = DisguisedRule = {}));
var ruleAttributes = [
    {
        id: "customer_group",
        value: "customer.groups.id",
        label: "Customer Group",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "region",
        value: "region.id",
        label: "Region",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "country",
        value: "shipping_address.country_code",
        label: "Country",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "sales_channel",
        value: "sales_channel_id",
        label: "Sales Channel",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
];
var commonAttributes = [
    {
        id: "product",
        value: "items.product.id",
        label: "Product",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "product_category",
        value: "items.product.categories.id",
        label: "Product Category",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "product_collection",
        value: "items.product.collection_id",
        label: "Product Collection",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "product_type",
        value: "items.product.type_id",
        label: "Product Type",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
    {
        id: "product_tag",
        value: "items.product.tags.id",
        label: "Product Tag",
        required: false,
        field_type: "multiselect",
        operators: Object.values(operators_map_1.operatorsMap),
    },
];
var currencyRule = {
    id: DisguisedRule.CURRENCY_CODE,
    value: DisguisedRule.CURRENCY_CODE,
    label: "Currency Code",
    field_type: "select",
    required: true,
    disguised: true,
    hydrate: true,
    operators: [operators_map_1.operatorsMap[utils_1.RuleOperator.EQ]],
};
var buyGetBuyRules = [
    {
        id: DisguisedRule.BUY_RULES_MIN_QUANTITY,
        value: DisguisedRule.BUY_RULES_MIN_QUANTITY,
        label: "Minimum quantity of items",
        field_type: "number",
        required: true,
        disguised: true,
        operators: [operators_map_1.operatorsMap[utils_1.RuleOperator.EQ]],
    },
];
var buyGetTargetRules = [
    {
        id: DisguisedRule.APPLY_TO_QUANTITY,
        value: DisguisedRule.APPLY_TO_QUANTITY,
        label: "Quantity of items promotion will apply to",
        field_type: "number",
        required: true,
        disguised: true,
        operators: [operators_map_1.operatorsMap[utils_1.RuleOperator.EQ]],
    },
];
var getRuleAttributesMap = function (_a) {
    var _b, _c;
    var promotionType = _a.promotionType, applicationMethodType = _a.applicationMethodType;
    var map = {
        rules: __spreadArray([], ruleAttributes, true),
        "target-rules": __spreadArray([], commonAttributes, true),
        "buy-rules": __spreadArray([], commonAttributes, true),
    };
    if (applicationMethodType === utils_1.ApplicationMethodType.FIXED) {
        map["rules"].push(__assign({}, currencyRule));
    }
    else {
        map["rules"].push(__assign(__assign({}, currencyRule), { required: false }));
    }
    if (promotionType === utils_1.PromotionType.BUYGET) {
        (_b = map["buy-rules"]).push.apply(_b, buyGetBuyRules);
        (_c = map["target-rules"]).push.apply(_c, buyGetTargetRules);
    }
    return map;
};
exports.getRuleAttributesMap = getRuleAttributesMap;
