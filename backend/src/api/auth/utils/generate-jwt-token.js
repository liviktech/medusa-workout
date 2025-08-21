"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtTokenForAuthIdentity = generateJwtTokenForAuthIdentity;
var utils_1 = require("@medusajs/framework/utils");
function generateJwtTokenForAuthIdentity(_a, _b) {
    var _c;
    var _d, _e;
    var authIdentity = _a.authIdentity, actorType = _a.actorType;
    var secret = _b.secret, expiresIn = _b.expiresIn, options = _b.options;
    var expiresIn_ = expiresIn !== null && expiresIn !== void 0 ? expiresIn : options === null || options === void 0 ? void 0 : options.expiresIn;
    var entityIdKey = "".concat(actorType, "_id");
    var entityId = (_d = authIdentity === null || authIdentity === void 0 ? void 0 : authIdentity.app_metadata) === null || _d === void 0 ? void 0 : _d[entityIdKey];
    return (0, utils_1.generateJwtToken)({
        actor_id: entityId !== null && entityId !== void 0 ? entityId : "",
        actor_type: actorType,
        auth_identity_id: (_e = authIdentity === null || authIdentity === void 0 ? void 0 : authIdentity.id) !== null && _e !== void 0 ? _e : "",
        app_metadata: (_c = {},
            _c[entityIdKey] = entityId,
            _c),
    }, {
        secret: secret,
        expiresIn: expiresIn_,
        jwtOptions: options,
    });
}
