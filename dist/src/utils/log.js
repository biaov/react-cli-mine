"use strict";
/**
 * @file 日志打印文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var log_symbols_1 = require("log-symbols"); // 显示出 √ 或 × 等的图标
var package_json_1 = require("@/../package.json");
var log = {};
// 管理命令 log 颜色
var logTypes = [
    {
        name: "success",
        color: chalk_1.green
    },
    {
        name: "error",
        color: chalk_1.red,
        prefix: package_json_1.name
    },
    {
        name: "warning",
        color: chalk_1.red
    },
    {
        name: "info"
    }
];
// 循环遍历
logTypes.forEach(function (_a) {
    var logName = _a.name, color = _a.color, _b = _a.prefix, prefix = _b === void 0 ? "" : _b;
    /**
     * 定义打印日志格式
     *
     * @param {string|LogAags} [text=""] - 要输出的内容
     * @returns {void}
     */
    log[logName] = function (text) {
        if (text === void 0) { text = ""; }
        // 是否为对象
        if (typeof text === "object") {
            var _a = text.text, content = _a === void 0 ? "" : _a, _b = text.prefix, prefixTxt = _b === void 0 ? "" : _b;
            content && console.log("" + (prefixTxt + " ") + text);
        }
        else if (color) {
            // 是否有颜色
            console.log("" + (prefix + " ") + color(logName.toUpperCase()) + " " + text);
        }
        else {
            console.log(text);
        }
    };
});
log.iconError = log_symbols_1.error;
log.iconSuccess = log_symbols_1.success;
exports.default = log;
