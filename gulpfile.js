//使用babel插件
require('babel-polyfill');
const { src, dest, series, parallel } = require('gulp');

// 编译压缩css，
const less = require('gulp-less')
const uglifyCss = require('gulp-clean-css');

const concat = require('gulp-concat')

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
function css(cb) {
    // cb();
    return src('src-product/**/*.less')
        .pipe(less())
        .pipe(uglifyCss())
        .pipe(dest('dist'));
}


/**
 * 编译js
 * @param {*} cb 
 */
function js(cb) {
    return src('dist-ts/**/*.js')
        .pipe(babel())
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
        .pipe(dest('dist'));
    // cb();
}

/**
 * 编译ts
 * @param {*} cb 
 */
function tsCompile(cb) {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(dest('dist-ts'))
}

// function tsToJs() {

//     return browserify({
//         basedir: '.',
//         debug: true,
//         entries: ['src-product/pro-table/index.tsx', 'src-product/pro-table/Pro-table-header.tsx'],
//         cache: {},
//         packageCache: {}
//     })
//         .plugin(tsify)
//         .transform('babelify', {
//             presets: ['es2015'],
//             extensions: ['.ts']
//         })
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({
//             loadMaps: true
//         }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(dest('dist'));
// }


function defaultTask(cb) {
    // place code for your default task here
    cb();
}

// exports.build = series(tsToJs, parallel(css, js))

exports.buildCss = series(css)
exports.buildJs = series(js)
exports.buildTs = series(tsCompile)

exports.default = defaultTask