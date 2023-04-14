const { series, parallel } = require("gulp");

const task1 = () => {
    console.log("task1");
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, 5000)
    })
}
const task2 = () => {
    console.log("task2");
    return Promise.resolve()
}

// exports.default = series(task1,task2)
// exports.default = parallel(task1, task2)

const { src, dest } = require("gulp")
const less = require("gulp-less");
// 自动加兼容前缀
const autoprefixer = require("gulp-autoprefixer");
const copy = () => {
    return src("src/*").pipe(dest("dist/"))
}

const lessTask = () => {
    // style下的less文件解析成css并写入dist/style中
    return src("src/style/*.less").pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ["> 1%", "last 2 versions"],
            cascade: false, //  是否美化属性值
        }))
        .pipe(dest("dist/style"))
}

// exports.default = copy
// exports.default = lessTask

// 编译less文件->将css写入dist/style->触发页面更新
const browserSync = require("browser-sync")
const { watch } = require("browser-sync");
const reloadTask = () => {
    browserSync.reload();
};
const browserTask = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch("./*.html", series(reloadTask));
    //监听样式更新触发两个任务
    watch("src/style/*", series(lessTask, reloadTask));
}

exports.default = browserTask;