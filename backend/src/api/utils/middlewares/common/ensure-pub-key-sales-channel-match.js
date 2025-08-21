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
exports.ensurePublishableKeyAndSalesChannelMatch = ensurePublishableKeyAndSalesChannelMatch;
/**
 * If a publishable key (PK) is passed in the header of the request AND
 * the request carries a sales channel id param in the url or body,
 * we check if the sales channel is valid for the key.
 *
 * If the request does not carry a sales channel id, we attempt to assign
 * a sales channel associated with the PK.
 *
 * @throws If sales channel id is passed as a url or body param
 *         but that id is not in the scope defined by the PK from the header.
 *         If the PK is associated with multiple sales channels but no
 *         sales channel id is passed in the request.
 */
function ensurePublishableKeyAndSalesChannelMatch(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var pubKey, pubKeySalesChannels, channelId;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            pubKey = req.get("x-publishable-api-key");
            if (pubKey) {
                pubKeySalesChannels = (_b = (_a = req.publishableApiKeyScopes) === null || _a === void 0 ? void 0 : _a.sales_channel_ids) !== null && _b !== void 0 ? _b : [];
                channelId = (_c = req.validatedBody) === null || _c === void 0 ? void 0 : _c.sales_channel_id;
                req.errors = (_d = req.errors) !== null && _d !== void 0 ? _d : [];
                if (pubKeySalesChannels.length) {
                    if (channelId && !pubKeySalesChannels.includes(channelId)) {
                        req.errors.push("Sales channel ID in payload ".concat(channelId, " is not associated with the Publishable API Key in the header."));
                    }
                    if (!channelId) {
                        if (pubKeySalesChannels.length > 1) {
                            req.errors.push("Cannot assign sales channel to cart. The Publishable API Key in the header has multiple associated sales channels. Please provide a sales channel ID in the request body.");
                        }
                        else {
                            req.validatedBody.sales_channel_id = pubKeySalesChannels[0];
                        }
                    }
                }
            }
            next();
            return [2 /*return*/];
        });
    });
}
