/**
 * @file 接口类型文件
 */

// 所有动态对象
export interface DynamicType {
  [arg: string]: any;
}

// 日志 API
export interface LogAags {
  text: string;
  prefix?: string;
}
