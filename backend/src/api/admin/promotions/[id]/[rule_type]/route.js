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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.GET = void 0;
var utils_1 = require("@medusajs/framework/utils");
var utils_2 = require("../../utils");
var GET = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, ruleType, remoteQuery, dasherizedRuleType, queryObject, promotion, ruleAttributes, promotionRules, transformedRules, disguisedRules, _loop_1, _i, disguisedRules_1, disguisedRule, _loop_2, _b, _c, promotionRule;
    var _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _a = req.params, id = _a.id, ruleType = _a.rule_type;
                remoteQuery = req.scope.resolve(utils_1.ContainerRegistrationKeys.REMOTE_QUERY);
                (0, utils_2.validateRuleType)(ruleType);
                dasherizedRuleType = ruleType.split("-").join("_");
                queryObject = (0, utils_1.remoteQueryObjectFromString)({
                    entryPoint: "promotion",
                    variables: { id: id },
                    fields: req.queryConfig.fields,
                });
                return [4 /*yield*/, remoteQuery(queryObject)];
            case 1:
                promotion = (_l.sent())[0];
                ruleAttributes = (0, utils_2.getRuleAttributesMap)({
                    promotionType: (promotion === null || promotion === void 0 ? void 0 : promotion.type) || req.query.promotion_type,
                    applicationMethodType: ((_d = promotion === null || promotion === void 0 ? void 0 : promotion.application_method) === null || _d === void 0 ? void 0 : _d.type) || req.query.application_method_type,
                })[ruleType];
                promotionRules = [];
                if (dasherizedRuleType === utils_1.RuleType.RULES) {
                    promotionRules.push.apply(promotionRules, ((promotion === null || promotion === void 0 ? void 0 : promotion.rules) || []));
                }
                else if (dasherizedRuleType === utils_1.RuleType.TARGET_RULES) {
                    promotionRules.push.apply(promotionRules, (((_e = promotion === null || promotion === void 0 ? void 0 : promotion.application_method) === null || _e === void 0 ? void 0 : _e.target_rules) || []));
                }
                else if (dasherizedRuleType === utils_1.RuleType.BUY_RULES) {
                    promotionRules.push.apply(promotionRules, (((_f = promotion === null || promotion === void 0 ? void 0 : promotion.application_method) === null || _f === void 0 ? void 0 : _f.buy_rules) || []));
                }
                transformedRules = [];
                disguisedRules = ruleAttributes.filter(function (attr) { return !!attr.disguised; });
                _loop_1 = function (disguisedRule) {
                    var getValues = function () {
                        var _a;
                        var value = (_a = promotion === null || promotion === void 0 ? void 0 : promotion.application_method) === null || _a === void 0 ? void 0 : _a[disguisedRule.id];
                        if (disguisedRule.field_type === "number") {
                            return value;
                        }
                        if (value) {
                            return [{ label: value, value: value }];
                        }
                        return [];
                    };
                    var required = (_g = disguisedRule.required) !== null && _g !== void 0 ? _g : true;
                    var applicationMethod = promotion === null || promotion === void 0 ? void 0 : promotion.application_method;
                    var recordValue = applicationMethod === null || applicationMethod === void 0 ? void 0 : applicationMethod[disguisedRule.id];
                    if (required || recordValue) {
                        transformedRules.push(__assign(__assign({}, disguisedRule), { id: undefined, attribute: disguisedRule.id, attribute_label: disguisedRule.label, operator: utils_1.RuleOperator.EQ, operator_label: utils_2.operatorsMap[utils_1.RuleOperator.EQ].label, value: undefined, values: getValues() }));
                    }
                    return "continue";
                };
                for (_i = 0, disguisedRules_1 = disguisedRules; _i < disguisedRules_1.length; _i++) {
                    disguisedRule = disguisedRules_1[_i];
                    _loop_1(disguisedRule);
                }
                _loop_2 = function (promotionRule) {
                    var currentRuleAttribute, queryConfig, rows, valueLabelMap;
                    var _m;
                    return __generator(this, function (_o) {
                        switch (_o.label) {
                            case 0:
                                currentRuleAttribute = ruleAttributes.find(function (attr) {
                                    return attr.value === promotionRule.attribute ||
                                        attr.value === promotionRule.attribute;
                                });
                                if (!currentRuleAttribute) {
                                    return [2 /*return*/, "continue"];
                                }
                                queryConfig = utils_2.ruleQueryConfigurations[currentRuleAttribute.id];
                                if (!queryConfig) {
                                    return [2 /*return*/, "continue"];
                                }
                                return [4 /*yield*/, remoteQuery((0, utils_1.remoteQueryObjectFromString)({
                                        entryPoint: queryConfig.entryPoint,
                                        variables: {
                                            filters: (_m = {},
                                                _m[queryConfig.valueAttr] = (_h = promotionRule.values) === null || _h === void 0 ? void 0 : _h.map(function (v) { return v.value; }),
                                                _m),
                                        },
                                        fields: [queryConfig.labelAttr, queryConfig.valueAttr],
                                    }))];
                            case 1:
                                rows = _o.sent();
                                valueLabelMap = new Map(rows.map(function (row) { return [
                                    row[queryConfig.valueAttr],
                                    row[queryConfig.labelAttr],
                                ]; }));
                                promotionRule.values =
                                    ((_j = promotionRule.values) === null || _j === void 0 ? void 0 : _j.map(function (value) { return ({
                                        value: value.value,
                                        label: valueLabelMap.get(value.value) || value.value,
                                    }); })) || promotionRule.values;
                                if (!currentRuleAttribute.hydrate) {
                                    transformedRules.push(__assign(__assign(__assign({}, currentRuleAttribute), promotionRule), { attribute_label: currentRuleAttribute.label, operator_label: ((_k = utils_2.operatorsMap[promotionRule.operator]) === null || _k === void 0 ? void 0 : _k.label) || promotionRule.operator }));
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _b = 0, _c = __spreadArray(__spreadArray([], promotionRules, true), transformedRules, true);
                _l.label = 2;
            case 2:
                if (!(_b < _c.length)) return [3 /*break*/, 5];
                promotionRule = _c[_b];
                return [5 /*yield**/, _loop_2(promotionRule)];
            case 3:
                _l.sent();
                _l.label = 4;
            case 4:
                _b++;
                return [3 /*break*/, 2];
            case 5:
                res.json({
                    rules: transformedRules,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.GET = GET;
