var gulp = require('gulp'),
    gp_uglify = require('gulp-uglify'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    ngAnotate = require('gulp-ng-annotate'),
    source = ['wwwroot/app/Common/common.module.js', 'wwwroot/app/nursery.module.js', 'wwwroot/app/**/*.js'];

gulp.task('uglify', function () {
    return gulp.src(source)
        .pipe(ngAnotate())
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest("wwwroot/lib/_app"))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest("wwwroot/lib/_app"));
});

gulp.task('watch', function () {
    return gulp
        .watch(source, ['uglify'])
        .on('change', function(event) {
            console.log('*** File' + event.path + ' was ' + event.type + ', running tasks...')
        });
});

gulp.task('default', ['watch'], function () { });