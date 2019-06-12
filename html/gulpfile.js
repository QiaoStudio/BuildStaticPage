var gulp = require('gulp'),
    compass = require('gulp-compass'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

var cssSrc = './assets/scss/*.scss',
    cssDst = './assets/';

gulp.task('css', function() {
  gulp.src(cssSrc)
    .pipe(compass({
        config_file:'./config.rb',
        css:'assets',
        sass:'assets/scss/'
    }))
    .pipe(replace('#0093b2','{{PrimaryColor}}'))
    .pipe(replace('#e4002b','{{SecondaryColor}}'))
    .pipe(replace('.btn.btn-red.active{background-color:#c2072e}','.btn.btn-red.active{background-color:{{PrimaryColor}}}'))
    .pipe(rename({ 
        basename: "site",
        suffix: ".min"
    }))
    .pipe(gulp.dest(cssDst));
});

gulp.task('clean', function() {
    gulp.src(['cssDst'], {read: false})
        .pipe(clean());
});
gulp.task('watch',function () {
    gulp.watch('./assets/scss/**/*.scss',['css']);
});
gulp.task('default',function(){
    gulp.run('clean','css','watch');
});