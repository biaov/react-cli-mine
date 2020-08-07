"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 全局方法
 */
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var chalk_1 = require("chalk");
var presetPath = path_1.resolve(__dirname, "./presetData.json"); // 预设数据路径
/**
 * 保存本地预设信息
 * @param {string} name - 对象名称
 * @param {any} data - 对象值
 * @returns {void}
 */
exports.SavePresetInfo = function (name, data) {
    var saveData = exports.GetPresetInfo(); // 保存对象键值对
    saveData[name] = data;
    fs_1.default.writeFile(presetPath, JSON.stringify(saveData), function (err) {
        err && console.log("保存预设失败");
    });
};
/**
 * 读取本地预设信息
 * @param {void}
 * @returns {void}
 */
exports.GetPresetInfo = function () {
    var info;
    try {
        info = fs_1.default.readFileSync(presetPath); // 读取文件
    }
    catch (error) {
        return {}; // 返回空对象
    }
    return JSON.parse(info);
};
/**
 * 格式化预设值
 * @param {DynamicType}  - 需要格式化的预设值
 * @returns {Array} -
 */
exports.FormatePreset = function (obj) {
    var arr = []; // 需要返回否数组
    Object.keys(obj).forEach(function (elem) {
        var strArr = obj[elem].reduce(function (prev, elem, i) { return prev + (i !== 0 ? "，" : "") + chalk_1.yellow(elem); }, ""); // 拼接字符串
        arr.push(elem + "\uFF08" + strArr + "\uFF09"); // 添加到数组里去
    });
    return arr;
};
