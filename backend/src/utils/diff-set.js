"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSetDifference = getSetDifference;
function getSetDifference(orignalSet, compareSet) {
    var difference = new Set();
    orignalSet.forEach(function (element) {
        if (!compareSet.has(element)) {
            difference.add(element);
        }
    });
    return difference;
}
