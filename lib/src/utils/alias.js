"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var module_alias_1 = __importDefault(require("module-alias"));
exports.default = (function () {
    module_alias_1.default.addAliases({
        "@": path_1.default.resolve(__dirname, "../")
    });
});
