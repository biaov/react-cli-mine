/**
 * @file 命令入口文件
 * @author biaov<biaov@qq.com>
 */

import { program } from "commander";
import { version } from "@/../package.json";
import { Create, Arguments } from "./actions";

// 定义命令带参数
// options 重写
program.usage("[commands] [options]").version(version, "-v, --version", "输出版本号").helpOption("-h, --help", "输出所有命令");

// 定义命令
program.command("create [name]").description("创建初始化项目").action(Create); // 注册命令的回调
program.arguments("<cmd> [env]").action(Arguments); // 定义顶级命令的参数语法。
process.argv.length < 3 && program.help(); // 如果后序没有输入命令，执行帮助指令
program.parse(process.argv); // 处理参数
