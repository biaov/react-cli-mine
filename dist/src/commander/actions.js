"use strict";
/**
 * @file 命令的 actions
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander"); // 自动解析命令和参数
var inquirer_1 = require("inquirer"); // 用于和用户进行交互
var chalk_1 = require("chalk"); // 添加字体颜色
var ora_1 = __importDefault(require("ora")); // 显示动画效果
var download_git_repo_1 = __importDefault(require("download-git-repo")); // 用于下载项目模板
var execa_1 = __importDefault(require("execa")); // 子进程管理工具
var fs_1 = require("fs"); // 读写文件
var log_1 = __importDefault(require("@/utils/log")); // 日志
var variables_1 = require("@/utils/variables"); // 全局变量
var function_1 = require("@/utils/function"); // 全局方法
var package_json_1 = require("@/../package.json"); // 包信息
var iconError = log_1.default.iconError, iconSuccess = log_1.default.iconSuccess, success = log_1.default.success, info = log_1.default.info, error = log_1.default.error, warning = log_1.default.warning;
/**
 * 创建项目命令的 action
 * @param {string} name - 命令名称
 * @returns {void}
 */
exports.Create = function (name) {
    if (name === void 0) { name = ""; }
    var presetInfo = function_1.GetPresetInfo(); // 获取预设信息
    var arr = function_1.FormatePreset(presetInfo); // 格式化预设信息
    inquirer_1.prompt([
        {
            type: "input",
            name: "projectName",
            message: "\u4F60\u7684\u9879\u76EE\u53EB\u4EC0\u4E48\u540D\u79F0\uFF1F",
            default: name,
            validate: function (input) {
                // 是否存在名称
                if (input || name) {
                    var fileName = process.cwd() + "\\" + (input || name); // 文件名称路径
                    if (fs_1.existsSync(fileName)) {
                        warning("项目名称已存在");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    warning("项目名称不能为空");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "preset",
            message: "请选择预设：",
            choices: __spreadArrays(arr, ["\u9ED8\u8BA4\u9884\u8BBE\uFF08" + chalk_1.yellow("React-Router-Dom") + "\uFF0C" + chalk_1.yellow("Redux/React-Redux/React-Thunk") + "\uFF0C" + chalk_1.yellow("Axios") + "\uFF0C" + chalk_1.yellow("Antd") + "\uFF0C" + chalk_1.yellow("Less") + "\uFF09\u63A8\u8350", "自义定预设"])
        }
    ]).then(function (_a) {
        var projectName = _a.projectName, preset = _a.preset;
        // 是否自定义预设
        if (preset === "自义定预设") {
            // 自定义预设
            inquirer_1.prompt([
                {
                    type: "checkbox",
                    name: "customPreset",
                    message: "在你的项目中需要什么？",
                    default: ["CSS Pre-processors"],
                    choices: [
                        "React-Router-Dom",
                        "Redux/React-Redux/React-thunk",
                        "Axios",
                        "Antd",
                        "CSS Pre-processors",
                        new inquirer_1.Separator(chalk_1.yellow("（目前只支持选择 CSS 预编译器，其它的暂不支持选择，如果要支持的话，有31种组合方式，暂无解决方案）"))
                    ]
                }
            ]).then(function (_a) {
                var customPreset = _a.customPreset;
                return __awaiter(void 0, void 0, void 0, function () {
                    var index, cssPrePro;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                index = customPreset.indexOf("CSS Pre-processors");
                                if (!(index !== -1)) return [3 /*break*/, 2];
                                return [4 /*yield*/, inquirer_1.prompt([
                                        {
                                            type: "list",
                                            name: "cssPrePro",
                                            message: "选择 CSS 预编译器（PostCSS, Autoprefixer 和 CSS Modules 是默认的）",
                                            choices: variables_1.cssPres
                                        }
                                    ])];
                            case 1:
                                cssPrePro = (_b.sent()).cssPrePro;
                                customPreset.splice(index, 1, cssPrePro);
                                _b.label = 2;
                            case 2:
                                // 保存预设？
                                inquirer_1.prompt([
                                    {
                                        type: "confirm",
                                        name: "isSave",
                                        message: "是否要保存你的预设？"
                                    }
                                ]).then(function (_a) {
                                    var isSave = _a.isSave;
                                    return __awaiter(void 0, void 0, void 0, function () {
                                        var presetName;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!isSave) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, inquirer_1.prompt([
                                                            {
                                                                type: "input",
                                                                name: "presetName",
                                                                message: "自定义预设叫什么名称？",
                                                                validate: function (input) {
                                                                    // 是否存在名称
                                                                    if (input) {
                                                                        return true;
                                                                    }
                                                                    else {
                                                                        warning("请输入自定义预设名称");
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        ])];
                                                case 1:
                                                    presetName = (_b.sent()).presetName;
                                                    function_1.SavePresetInfo(presetName, customPreset); // 保存信息
                                                    _b.label = 2;
                                                case 2:
                                                    exports.DownLibrary(customPreset, projectName); // 默认预设
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        else if (preset.includes("默认预设")) {
            exports.DownLibrary([], projectName); // 默认预设
        }
        else {
            // 自定义模板预设
            exports.DownLibrary(Object.values(presetInfo)[0], projectName); // 下载模板
        }
    });
};
/**
 * 定义顶级命令的 action
 * @param {any} name - 第一个命令
 * @param {any} [name=undefined] - 第二个命令
 * @returns {void}
 */
exports.Arguments = function (cmd, env) {
    error("`rcm " + cmd + (env ? " " + env : "") + "` \u547D\u4EE4\u4E0D\u5B58\u5728"); // 输出错误
    commander_1.program.help(); // 显示全部命令
};
/**
 * 下载远层模板仓库
 * @param {Array<string>} args - 预设数组
 * @param {string} name - 项目名称
 * @returns {void}
 */
exports.DownLibrary = function (args, name) {
    var processCwd = process.cwd() + "\\" + name;
    info();
    info(chalk_1.blueBright("React Cli Mine v" + package_json_1.version));
    info();
    info(chalk_1.yellow(">>") + " \u5728\u6B64\u76EE\u5F55\u4E0B\u521B\u5EFA\u9879\u76EE\uFF1A" + chalk_1.yellow(processCwd));
    var spinner = ora_1.default({ text: "正在下载模板中...", color: "yellow" });
    spinner.start();
    var branch = "";
    // 是否不是 [], [] 表示 master 分支
    if (args.length > 0) {
        variables_1.cssPres.forEach(function (elem) {
            args.includes(elem) && (branch = elem.toLowerCase()); // 选择了哪个 CSS 预编译器
        });
        branch = !branch ? "css" : branch === "less" ? "master" : branch; // 是否存在 CSS 预编译器
    }
    else {
        branch = "master"; // 默认全选
    }
    download_git_repo_1.default("direct:" + variables_1.templateDown + "#" + branch, processCwd, { clone: true }, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var fileName, content, stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!err) return [3 /*break*/, 1];
                    spinner.fail();
                    info(iconError + chalk_1.red(err));
                    return [3 /*break*/, 3];
                case 1:
                    fileName = processCwd + "\\package.json";
                    // 是否存在 package.json 文件
                    if (fs_1.existsSync(fileName)) {
                        content = JSON.parse(fs_1.readFileSync(fileName).toString());
                        content.name = name;
                        fs_1.writeFileSync(fileName, JSON.stringify(content)); // 重新写入文件
                    }
                    spinner.succeed("模板下载成功"); // 下载成功
                    info(chalk_1.yellow(">>") + " \u6B63\u5728\u5B89\u88C5\u4F9D\u8D56\u63D2\u4EF6\uFF0C\u53EF\u80FD\u8981\u7B49\u4E00\u4F1A...");
                    return [4 /*yield*/, execa_1.default("npm", ["install", "--loglevel", "error"], {
                            cwd: processCwd,
                            stdio: "inherit"
                        })];
                case 2:
                    stdout = (_a.sent()).stdout;
                    spinner.succeed("依赖插件安装成功"); // 下载成功
                    info(stdout);
                    success(iconSuccess + " 项目初始化完成");
                    info();
                    info(chalk_1.yellow("$") + "  " + chalk_1.cyanBright("cd " + name) + "    \u8FDB\u5165\u9879\u76EE\u76EE\u5F55");
                    info(chalk_1.yellow("$") + "  " + chalk_1.cyanBright("npm start") + "    \u8FD0\u884C\u9879\u76EE");
                    info();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
