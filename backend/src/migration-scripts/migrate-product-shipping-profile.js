"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assignProductsToShippingProfile;
var core_flows_1 = require("@medusajs/core-flows");
var modules_sdk_1 = require("@medusajs/framework/modules-sdk");
var utils_1 = require("@medusajs/framework/utils");
var workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
var workflows_sdk_2 = require("@medusajs/framework/workflows-sdk");
var assignProductsToShippingProfileWorkflow = (0, workflows_sdk_2.createWorkflow)("assign-products-to-shipping-profile", function () {
    var shippingProfiles = (0, core_flows_1.useQueryGraphStep)({
        entity: "shipping_profile",
        fields: ["id", "name"],
    }).config({ name: "get-shipping-profiles" }).data;
    var products = (0, core_flows_1.useQueryGraphStep)({
        entity: "product",
        fields: ["id"],
    }).config({ name: "get-products" }).data;
    var shippingProfileId = (0, workflows_sdk_1.transform)({ shippingProfiles: shippingProfiles }, function (_a) {
        var _b, _c, _d;
        var shippingProfiles = _a.shippingProfiles;
        return (_c = (_b = shippingProfiles.find(function (sp) {
            return sp.name.toLocaleLowerCase().includes("default");
        })) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : (_d = shippingProfiles[0]) === null || _d === void 0 ? void 0 : _d.id;
    });
    var createdShippingProfileId = (0, workflows_sdk_1.when)("create-shipping-profile", {
        shippingProfileId: shippingProfileId,
    }, function (_a) {
        var shippingProfileId = _a.shippingProfileId;
        return !shippingProfileId;
    }).then(function () {
        var createdShippingProfiles = (0, core_flows_1.createShippingProfilesStep)([
            {
                name: "Default Shipping Profile",
                type: "default",
            },
        ]);
        return createdShippingProfiles[0].id;
    });
    var links = (0, workflows_sdk_1.transform)({ products: products, shippingProfileId: shippingProfileId, createdShippingProfileId: createdShippingProfileId }, function (_a) {
        var products = _a.products, shippingProfileId = _a.shippingProfileId, createdShippingProfileId = _a.createdShippingProfileId;
        return products.map(function (product) {
            var _a;
            return (_a = {},
                _a[utils_1.Modules.PRODUCT] = {
                    product_id: product.id,
                },
                _a[utils_1.Modules.FULFILLMENT] = {
                    shipping_profile_id: shippingProfileId !== null && shippingProfileId !== void 0 ? shippingProfileId : createdShippingProfileId,
                },
                _a);
        });
    });
    (0, core_flows_1.createRemoteLinkStep)(links);
    return new workflows_sdk_1.WorkflowResponse(void 0);
});
function assignProductsToShippingProfile(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var logger;
        var container = _b.container;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!modules_sdk_1.MedusaModule.isInstalled(utils_1.Modules.FULFILLMENT) ||
                        !modules_sdk_1.MedusaModule.isInstalled(utils_1.Modules.PRODUCT)) {
                        return [2 /*return*/];
                    }
                    logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
                    logger.info("Assigning products to shipping profile");
                    return [4 /*yield*/, assignProductsToShippingProfileWorkflow(container)
                            .run()
                            .then(function () {
                            logger.info("Products assigned to shipping profile");
                        })
                            .catch(function (e) {
                            logger.error(e);
                        })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
