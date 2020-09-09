/**
 * @file 全局方法文件
 */

import fs from "fs";
import { resolve } from "path";
import { DynamicType } from "./interface";
import { yellow } from "chalk";
const presetPath = resolve(__dirname, "./presetData.json"); // 预设数据路径
/**
 * 保存本地预设信息
 * @param {string} name - 对象名称
 * @param {any} data - 对象值
 * @returns {void}
 */
export const SavePresetInfo: Function = (name: string, data: any): void => {
  const saveData: DynamicType = GetPresetInfo(); // 保存对象键值对
  saveData[name] = data;
  fs.writeFile(presetPath, JSON.stringify(saveData), err => {
    err && console.log("保存预设失败");
  });
};

/**
 * 读取本地预设信息
 * @param {void}
 * @returns {void}
 */
export const GetPresetInfo: Function = (): object => {
  let info: any;
  try {
    info = fs.readFileSync(presetPath); // 读取文件
  } catch (error) {
    return {}; // 返回空对象
  }
  return JSON.parse(info);
};

/**
 * 格式化预设值
 * @param {DynamicType}  - 需要格式化的预设值
 * @returns {Array} -
 */
export const FormatePreset: Function = (obj: DynamicType): Array<string> => {
  const arr: Array<string> = []; // 需要返回否数组
  Object.keys(obj).forEach(elem => {
    const strArr: string = obj[elem].reduce((prev: string, elem: string, i: number) => prev + (i !== 0 ? "，" : "") + yellow(elem), ""); // 拼接字符串
    arr.push(`${elem}（${strArr}）`); // 添加到数组里去
  });
  return arr;
};
