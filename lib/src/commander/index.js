"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var package_json_1 = require("@/../package.json");
var actions_1 = require("./actions");
// 定义命令带参数
// options重写
commander_1.program.usage("[commands] [options]").version(package_json_1.version, "-v, --version", "输入版本号").helpOption("-h, --help", "输出所有命令");
// 定义命令
commander_1.program.command("create [name]").description("创建初始化项目").action(actions_1.Create); // 注册命令的回调
commander_1.program.arguments("<cmd> [env]").action(actions_1.Arguments); // 定义顶级命令的参数语法。
process.argv.length < 3 && commander_1.program.help(); // 如果后序没有输入命令，执行帮助指令
// 处理参数
commander_1.program.parse(process.argv);
