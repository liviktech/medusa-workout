"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineMiddlewares = void 0;
var http_1 = require("@medusajs/framework/http");
/**
 * A helper function to configure the routes by defining custom middleware,
 * bodyparser config and validators to be merged with the pre-existing
 * route validators.
 */
exports.defineMiddlewares = http_1.defineMiddlewares;
