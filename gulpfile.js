var gulp = require('gulp'); 						//基础库
var sass = require('gulp-sass');					//sass
var autoprefixer = require('autoprefixer');		//浏览器前缀
var rename = require('gulp-rename');			//重命名
var sourcemaps = require('gulp-sourcemaps');	//map
var uglify = require('gulp-uglify');              //压缩js
var jshint = require('gulp-jshint');             //js 检查
var postcss = require('gulp-postcss');          //postcss
var cssnano = require('gulp-cssnano');          //css压缩 默认使用激进的优化策略,如果出现动画名称被改写,请设置 options.safe = true;


gulp.task('lint', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//sass
gulp.task('sass', function () {
	var processors = [autoprefixer({browsers: '> 0%'})];
    gulp.src(['./src/scss/*.scss','!./src/scss/bootstrap/**/*.scss','!./src/scss/helps/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano({safe: true}))
        .pipe(postcss(processors))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('uglify', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});
// 默认任务
gulp.task('default', ['lint','sass','uglify'],function(){
    // 监听文件变化
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['lint','uglify']);
});