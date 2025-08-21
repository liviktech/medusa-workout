"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var define_middlewares_1 = require("../define-middlewares");
describe("defineMiddlewares", function () {
    test("define custom middleware for a route", function () {
        var config = (0, define_middlewares_1.defineMiddlewares)([
            {
                matcher: "/admin/products",
                middlewares: [function () { }],
            },
        ]);
        expect(config).toMatchObject({
            routes: [
                {
                    matcher: "/admin/products",
                    middlewares: [expect.any(Function)],
                },
            ],
        });
    });
});
