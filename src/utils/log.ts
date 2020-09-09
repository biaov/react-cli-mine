/**
 * @file 日志打印文件
 */

import { red, green } from "chalk";
import { error, success } from "log-symbols"; // 显示出 √ 或 × 等的图标
import { DynamicType, LogAags } from "./interface";
import { name } from "@/../package.json";
const log: DynamicType = {};

// 管理命令 log 颜色
const logTypes: Array<DynamicType> = [
  {
    name: "success",
    color: green
  },
  {
    name: "error",
    color: red,
    prefix: name
  },
  {
    name: "warning",
    color: red
  },
  {
    name: "info"
  }
];
// 循环遍历
logTypes.forEach(({ name: logName, color, prefix = "" }: DynamicType): void => {
  /**
   * 定义打印日志格式
   *
   * @param {string|LogAags} [text=""] - 要输出的内容
   * @returns {void}
   */
  log[logName] = (text: string | LogAags = ""): void => {
    // 是否为对象
    if (typeof text === "object") {
      const { text: content = "", prefix: prefixTxt = "" } = text;
      content && console.log(`${prefixTxt + " "}${text}`);
    } else if (color) {
      // 是否有颜色
      console.log(`${prefix + " "}${color(logName.toUpperCase())} ${text}`);
    } else {
      console.log(text);
    }
  };
});
log.iconError = error;
log.iconSuccess = success;
export default log;
