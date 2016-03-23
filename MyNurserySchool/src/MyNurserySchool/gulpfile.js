var gulp = require('gulp'),
    gp_uglify = require('gulp-uglify'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    ngAnotate = require('gulp-ng-annotate');

gulp.task('uglify', function () {
    return gulp.src(['wwwroot/app/**/*.module.js', 'wwwroot/app/**/*.js'])
        .pipe(ngAnotate())
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest("wwwroot/lib/_app"))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest("wwwroot/lib/_app"));
});

gulp.task('default', ['uglify'], function () { });