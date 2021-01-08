//使用babel插件
require('babel-polyfill');
const { src, dest, series, parallel } = require('gulp');

// 编译压缩css，
const less = require('gulp-less')
const uglifyCss = require('gulp-clean-css');

// const concat = require('gulp-concat')

const replace = require('gulp-replace');
const babel = require("gulp-babel");

// 编译ts
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const uglify = require('gulp-uglify');


// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const tsify = require('tsify');
// const clean = require('gulp-clean')
// const sourcemaps = require('gulp-sourcemaps');
// const buffer = require('vinyl-buffer');


//压缩合并css
function css() {
    return src('src/**/*.less')
        .pipe(less())
        .pipe(uglifyCss())
        .pipe(dest('dist'));
}

/**
 * 编译ts
 * 
 */
function compile() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(babel())
        .pipe(babel({
            presets: [
                "@babel/preset-react", ["@babel/preset-env"],
            ],
            plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                [
                    "import",
                    {
                        "libraryName": "antd",
                        "libraryDirectory": "lib",
                        "style": "css"
                    }
                ]
            ]
        }))
        .pipe(uglify())
        .pipe(replace('.less', '.css'))
        .pipe(dest('dist'))
}


exports.build = series(compile, css)
exports.default = series(compile, css)