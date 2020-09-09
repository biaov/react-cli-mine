/**
 * @file gulp 配置文件
 */

const { src, dest, series, parallel } = require("gulp");
const Uglify = require("gulp-uglify");
const del = require("del");
const entry = "./dist"; // 入口目录
const output = "./lib"; // 输入目录
/**
 * 压缩 JS
 * @param {void}
 * @returns {any} - gulp
 */
const MinJs = () =>
  src([`${entry}/*/*.js`, `${entry}/*/*/*.js`])
    .pipe(Uglify())
    .pipe(dest(output));

/**
 * 复制 JSON 文件
 * @param {void}
 * @returns {any} - gulp
 */
const CopyJson = () => src(`${entry}/*.json`).pipe(dest(output));

/**
 * 删除文件及文件夹
 * @param {void}
 * @returns {any} - gulp
 */
const Clean = () => del([output], { force: true });

exports.build = series(Clean, parallel(MinJs, CopyJson)); // 打包
