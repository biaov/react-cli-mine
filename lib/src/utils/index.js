"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 工具类
 */
var alias_1 = __importDefault(require("./alias")); // 别名
alias_1.default();
/// <reference path="./module.d.ts" />
var log_1 = __importDefault(require("./log"));
exports.default = { log: log_1.default };
