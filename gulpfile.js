var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');

var paths = {
  src: {
    bower: './app/src/bower',
    js: './app/src/js',
    scss: './app/src/scss',
    img: './app/src/img'
  },
  dist: {
    js: './app/dist/js',
    css: './app/dist/css',
    img: './app/dist/img'
  },
  karmaConf: __dirname + '/karma.conf.js'
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('javascript', function() {
  return gulp.src([
      paths.src.bower + '/angular/angular.js',
      paths.src.bower + '/lodash/dist/lodash.js',
      paths.src.bower + '/angular-google-maps/dist/angular-google-maps.js',
      paths.src.bower + '/angular-ui-router/release/angular-ui-router.js',
      paths.src.js + '/lib/ui-bootstrap/ui-bootstrap-custom-0.12.0.js',
      paths.src.js + '/lib/ui-bootstrap/ui-bootstrap-custom-tpls-0.12.0.js',
      paths.src.bower + '/ngAnimations.js/dist/ngFx.js',
      paths.src.js + '/services/factories.js',
      paths.src.js + '/controllers/controllers.js',
      paths.src.js + '/directives/directives.js',
      paths.src.js + '/app.js'
    ])
    .pipe(concat('app.min.js'))
    // .pipe(uglify({
    //   beautify: true
    // }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('lint', function() {
    return gulp.src(paths.src.js + '/app.bundled.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('image', function() {
  return gulp.src(paths.src.img + '/**/*')
    .pipe(image())
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('compass', function() {
  return gulp.src(paths.src.scss + '/app.scss')
    .pipe(compass({
      css: paths.dist.css,
      sass: paths.src.scss,
      image: paths.dist.img,
      require: ['breakpoint']
    }))
    .on('error', handleError)
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('test', function(done){
  karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

gulp.task('watch', function() {
  gulp.watch(paths.src.img + '/**/*', ['image']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['compass']);
  gulp.watch(paths.src.js + '/**/*.js', ['lint', 'javascript']);
});

gulp.task('default', ['compass', 'image', 'lint', 'javascript', 'watch']);