/**
 * @file 命令的 actions
 */

import { program } from "commander"; // 自动解析命令和参数
import { prompt, Separator } from "inquirer"; // 用于和用户进行交互
import { yellow, red, blueBright, cyanBright } from "chalk"; // 添加字体颜色
import ora from "ora"; // 显示动画效果
import download from "download-git-repo"; // 用于下载项目模板
import execa from "execa"; // 子进程管理工具
import { existsSync, readFileSync, writeFileSync } from "fs"; // 读写文件
import { DynamicType } from "@/utils/interface"; // 接口
import log from "@/utils/log"; // 日志
import { templateDown, cssPres } from "@/utils/variables"; // 全局变量
import { SavePresetInfo, GetPresetInfo, FormatePreset } from "@/utils/function"; // 全局方法
import { version } from "@/../package.json"; // 包信息
const { iconError, iconSuccess, success, info, error, warning } = log;

/**
 * 创建项目命令的 action
 * @param {string} name - 命令名称
 * @returns {void}
 */
export const Create = (name: string = ""): void => {
  const presetInfo = GetPresetInfo(); // 获取预设信息
  const arr = FormatePreset(presetInfo); // 格式化预设信息
  prompt([
    {
      type: "input",
      name: "projectName",
      message: `你的项目叫什么名称？`,
      default: name,
      validate(input: string): boolean {
        // 是否存在名称
        if (input || name) {
          const fileName = `${process.cwd()}\\${input || name}`; // 文件名称路径
          if (existsSync(fileName)) {
            warning("项目名称已存在");
            return false;
          } else {
            return true;
          }
        } else {
          warning("项目名称不能为空");
          return false;
        }
      }
    },
    {
      type: "list",
      name: "preset",
      message: "请选择预设：",
      choices: [...arr, `默认预设（${yellow("React-Router-Dom")}，${yellow("Redux/React-Redux/React-Thunk")}，${yellow("Axios")}，${yellow("Antd")}，${yellow("Less")}）推荐`, "自义定预设"]
    }
  ]).then(({ projectName, preset }: DynamicType) => {
    // 是否自定义预设
    if (preset === "自义定预设") {
      // 自定义预设
      prompt([
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
            new Separator(yellow("（目前只支持选择 CSS 预编译器，其它的暂不支持选择，如果要支持的话，有31种组合方式，暂无解决方案）"))
          ]
        }
      ]).then(
        async ({ customPreset }: DynamicType): Promise<void> => {
          // 是否使用了 CSS 预编译器
          const index = customPreset.indexOf("CSS Pre-processors"); // CSS 预编译器的下标
          if (index !== -1) {
            // 使用
            const { cssPrePro } = await prompt([
              {
                type: "list",
                name: "cssPrePro",
                message: "选择 CSS 预编译器（PostCSS, Autoprefixer 和 CSS Modules 是默认的）",
                choices: cssPres
              }
            ]);
            customPreset.splice(index, 1, cssPrePro);
          }
          // 保存预设？
          prompt([
            {
              type: "confirm",
              name: "isSave",
              message: "是否要保存你的预设？"
            }
          ]).then(
            async ({ isSave }: DynamicType): Promise<void> => {
              // 是否保存预设
              if (isSave) {
                // 保存
                // 设置预设名称
                const { presetName } = await prompt([
                  {
                    type: "input",
                    name: "presetName",
                    message: "自定义预设叫什么名称？",
                    validate(input: string): boolean {
                      // 是否存在名称
                      if (input) {
                        return true;
                      } else {
                        warning("请输入自定义预设名称");
                        return false;
                      }
                    }
                  }
                ]);
                SavePresetInfo(presetName, customPreset); // 保存信息
              }
              DownLibrary(customPreset, projectName); // 默认预设
            }
          );
        }
      );
    } else if (preset.includes("默认预设")) {
      DownLibrary([], projectName); // 默认预设
    } else {
      // 自定义模板预设
      DownLibrary(Object.values(presetInfo)[0], projectName); // 下载模板
    }
  });
};

/**
 * 定义顶级命令的 action
 * @param {any} name - 第一个命令
 * @param {any} [name=undefined] - 第二个命令
 * @returns {void}
 */
export const Arguments = (cmd: any, env: any) => {
  error(`\`rcm ${cmd}${env ? ` ${env}` : ""}\` 命令不存在`); // 输出错误
  program.help(); // 显示全部命令
};

/**
 * 下载远层模板仓库
 * @param {Array<string>} args - 预设数组
 * @param {string} name - 项目名称
 * @returns {void}
 */
export const DownLibrary: Function = (args: Array<string>, name: string): void => {
  const processCwd = `${process.cwd()}\\${name}`;
  info();
  info(blueBright(`React Cli Mine v${version}`));
  info();
  info(`${yellow(">>")} 在此目录下创建项目：${yellow(processCwd)}`);
  const spinner = ora({ text: "正在下载模板中...", color: "yellow" });
  spinner.start();
  let branch: string = "";
  // 是否不是 [], [] 表示 master 分支
  if (args.length > 0) {
    cssPres.forEach((elem: string): void => {
      args.includes(elem) && (branch = elem.toLowerCase()); // 选择了哪个 CSS 预编译器
    });
    branch = !branch ? "css" : branch === "less" ? "master" : branch; // 是否存在 CSS 预编译器
  } else {
    branch = "master"; // 默认全选
  }
  download(
    `direct:${templateDown}#${branch}`,
    processCwd,
    { clone: true },
    async (err: Error): Promise<void> => {
      // 是否存在错误
      if (err) {
        spinner.fail();
        info(iconError + red(err));
      } else {
        const fileName = `${processCwd}\\package.json`;
        // 是否存在 package.json 文件
        if (existsSync(fileName)) {
          const content: DynamicType = JSON.parse(readFileSync(fileName).toString()); // 读取需要修改的文件
          content.name = name;
          writeFileSync(fileName, JSON.stringify(content)); // 重新写入文件
        }
        spinner.succeed("模板下载成功"); // 下载成功
        info(`${yellow(">>")} 正在安装依赖插件，可能要等一会...`);
        const { stdout } = await execa("npm", ["install", "--loglevel", "error"], {
          cwd: processCwd,
          stdio: "inherit"
        });
        spinner.succeed("依赖插件安装成功"); // 下载成功
        info(stdout);
        success(iconSuccess + " 项目初始化完成");
        info();
        info(`${yellow("$")}  ${cyanBright(`cd ${name}`)}    进入项目目录`);
        info(`${yellow("$")}  ${cyanBright(`npm start`)}    运行项目`);
        info();
      }
    }
  );
};
