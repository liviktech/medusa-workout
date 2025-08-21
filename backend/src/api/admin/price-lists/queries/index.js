"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPriceListResponse = buildPriceListResponse;
var utils_1 = require("@medusajs/framework/utils");
var clean_response_data_1 = require("../../../../utils/clean-response-data");
__exportStar(require("./get-price-list"), exports);
__exportStar(require("./list-price-lists"), exports);
__exportStar(require("./list-prices"), exports);
function buildPriceListResponse(priceLists, apiFields) {
    for (var _i = 0, priceLists_1 = priceLists; _i < priceLists_1.length; _i++) {
        var priceList = priceLists_1[_i];
        priceList.rules = (0, utils_1.buildPriceListRules)(priceList.price_list_rules);
        priceList.prices = (0, utils_1.buildPriceSetPricesForCore)(priceList.prices);
    }
    return priceLists.map(function (priceList) { return (0, clean_response_data_1.cleanResponseData)(priceList, apiFields); });
}
