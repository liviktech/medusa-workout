"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@medusajs/framework/utils");
var model1 = utils_1.model.define("module_model_1", {
    id: utils_1.model.id().primaryKey(),
    name: utils_1.model.text(),
});
exports.default = model1;
