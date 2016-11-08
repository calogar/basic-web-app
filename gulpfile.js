var gulp = require("gulp");
var sass = require("gulp-sass"); // Compile to CSS
var browserSync = require('browser-sync').create(); // Reload browser
var header = require('gulp-header'); // Set file headers
var cleanCSS = require('gulp-clean-css'); // Minimize CSS
var babel = require("gulp-babel"); // New JS syntax
var uglify = require('gulp-uglify'); // Compress code
var jasmine = require("gulp-jasmine"); // Tests
var reporters = require('jasmine-reporters');
var rename = require("gulp-rename"); // Rename files to .min
var slim = require('gulp-slim'); // HTML markup
var pkg = require('./package.json'); // Set info in banner

var banner = ['/*!\n',
    ' <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    (new Date()).getFullYear() + ' <%= pkg.author %>\n',
    ' */\n'
].join('');

// Translate SCSS to CSS, set banner and reload
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify CSS and reload
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Translate babel js to js, set banner and reload
gulp.task('babel', function() {
    return gulp.src('js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-js', ['babel'], function() {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('slim', function() {
    return gulp.src('pages/*.slim')
        .pipe(slim({
            pretty: true
        }))
        .pipe(gulp.dest('pages'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('test', function() {
    return gulp.src('test/*.js')
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        }));
})

// Move plugins to /vendor
gulp.task('copy-plugins', function() {
    gulp.src(['bower_components/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['bower_components/datatables/media/**/*'])
        .pipe(gulp.dest('vendor/datatables'))

    gulp.src(['bower_components/datatables-plugins/integration/bootstrap/3/*'])
        .pipe(gulp.dest('vendor/datatables-plugins'))

    gulp.src(['bower_components/datatables-responsive/css/*', 'bower_components/datatables-responsive/js/*'])
        .pipe(gulp.dest('vendor/datatables-responsive'))

});

// Configure browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Run all on default
gulp.task('default', ['minify-css', 'minify-js', 'slim', 'copy-plugins']);

// Dev task: watch and browserSync
gulp.task('dev', ['browserSync', 'minify-css', 'minify-js', 'slim', 'copy-plugins'], function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['babel']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    gulp.watch('dist/js/*.js', ['minify-js']);
    gulp.watch('pages/*.slim', ['slim']);

    gulp.watch('pages/*.html', browserSync.reload);
    gulp.watch('dist/js/*.js', browserSync.reload);
});