let gulp = require('gulp');
let {watch, task} = require('gulp');
let babel = require('gulp-babel');
let gulpSrc = require('./gulp/path.js');

task('compile-src', () => {
    return gulp.src(gulpSrc.src.provider)
        .pipe(babel())
        .pipe(gulp.dest(gulpSrc.out.dist));
});

task('watch-dev', gulp.parallel(() => {
    watch(gulpSrc.src.provider, gulp.series('compile-src'));
}));

task('dev', gulp.series('compile-src', gulp.parallel('watch-dev')));