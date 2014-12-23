var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('watch', function(){
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./*.js', ['reload']);
});

gulp.task('connect', function(){
    connect.server({
        root: './',
        livereload: true,
        port: 8200
    });
});

gulp.task('reload', function(){
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task('default', ['server']);
gulp.task('server', ['watch', 'connect']);
