var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    jshint        = require('gulp-jshint'),
    sass          = require('gulp-sass'),
    imagemin      = require('gulp-imagemin'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    notify        = require('gulp-notify'),
    replace       = require('gulp-replace'),
    zip           = require('gulp-zip'),
    clean         = require('gulp-clean'),
    cleanCSS      = require('gulp-clean-css');
    details       = require('./project-details.json'),
    project       = details.project,
    version       = details.version,
    author        = details.author,
    company       = details.company,
    url           = details.url,
    email         = details.email,
    description   = details.description;
    
var paths = {
  projectdetails: {
    src: './project-details.json'
  },
  fonts: {
    src: './src/fonts/*',
    dest: './dist/fonts/'
  },
  faFonts: {
    src: './node_modules/font-awesome/fonts/*',
    dest: './dist/fonts/'
  },
  faCss: {
    src: './node_modules/font-awesome/css/font-awesome.min.css',
    dest: './dist/css/'
  },
  normalize: {
    src: './node_modules/normalize.css/normalize.css',
    dest: './dist/css/'
  },
  foundationCss: {
    src: './node_modules/foundation-sites/dist/css/foundation.min.*',
    dest: './dist/css/'
  },
  foundationJs: {
    src: './node_modules/foundation-sites/dist/js/foundation.min.*',
    dest: './dist/js/'
  },
  prismCss: {
    src: './lib/prismJS/prism.min.css',
    dest: './dist/css/'
  },
  prismJs: {
    src: './lib/prismJS/prism.min.js',
    dest: './dist/js/'
  },
  images: {
    src: './src/images/**/*.{jpg,jpeg,png,gif}',
    dest: './dist/images/'
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: './src/js/*.js',
    dest: './dist/js/'
  },
  containers: {
    src: './containers/*',
    dest: '../../Containers/'+project+'/'
  },
  manifest: {
    src: './manifest.dnn',
    dest: './'
  },
  zipdist: {
    src: 'dist/**/*',
    zipfile: 'dist.zip',
    dest: './temp/'
  },
  zipcontainers: {
    src: './containers/**/*',
    zipfile: 'cont.zip',
    dest: './temp/'
  },
  zipelse: {
    src: ['./menus/**/*', './partials/*', '*.{ascx,xml,html,htm}'],
    zipfile: 'else.zip',
    dest: './temp/'
  },
  zippackage: {
    src: ['./temp/*.zip','*.{dnn,png,jpg,txt}', 'LICENSE'],
    zipfile: project+'\_'+version+'\_install.zip',
    dest: './build/'
  },
  cleanup: {
    src: './temp/'
  }
};
    

/*------------------------------------------------------*/
/* INIT TASKS ------------------------------------------*/
/*------------------------------------------------------*/
// Copy fonts from src/fonts to dist/fonts
function fontsInit() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'fontsInit', sound: false}));
}

// Copy font-awesome fonts from node_modules to dist/fonts
function faFontsInit() {
  return gulp.src(paths.faFonts.src)
    .pipe(gulp.dest(paths.faFonts.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'faFontsInit', sound: false}));
}

// Copy font-awesome CSS from node_modules to dist/css
function faCssInit() {
  return gulp.src(paths.faCss.src)
    .pipe(gulp.dest(paths.faCss.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'faCssInit', sound: false}));
}

// Compile normalize.css from node_modules and copy to dist/js
function normalizeInit() {
  return gulp.src(paths.normalize.src, { sourcemaps: true })
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', '> 1%']}))
  .pipe(gulp.dest(paths.normalize.dest, { sourcemaps: '.' }))
  .pipe(notify({message: '<%= file.relative %> compiled and distributed!', title : 'normalizeInit', sound: false}));
}

// Copy Foundation-Sites CSS from node_modules to dist/css
function foundationCssInit() {
  return gulp.src(paths.foundationCss.src)
    .pipe(gulp.dest(paths.foundationCss.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'foundationCssInit', sound: false}));
}

// Copy Foundation-Sites JS from node_modules to dist/js
function foundationJsInit() {
  return gulp.src(paths.foundationJs.src)
    .pipe(gulp.dest(paths.foundationJs.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'foundationJsInit', sound: false}));
}

// Copy PrismJS JS from node_modules to dist/js
function prismJsInit() {
  return gulp.src(paths.prismJs.src)
    .pipe(gulp.dest(paths.prismJs.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title: 'prismJsInit', sound: false}));
}

// Copy PrismJS CSS from node_modules to dist/js
function prismCssInit() {
  return gulp.src(paths.prismCss.src)
    .pipe(gulp.dest(paths.prismCss.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title: 'prismCssInit', sound: false}));
}
/*------------------------------------------------------*/
/* END INIT TASKS --------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* IMAGE TASKS -----------------------------------------*/
/*------------------------------------------------------*/
// Optimize images and copy to dist/images
function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun(images)})
		.pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
		.pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: '<%= file.relative %> optimized!', title : 'images', sound: false}));
}
/*------------------------------------------------------*/
/* END IMAGE TASKS -------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom SCSS to CSS and copy to dist/css
function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', '> 1%']}))
  .pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }))
  .pipe(notify({message: '<%= file.relative %> compiled and distributed!', title : 'styles', sound: false}));
}
/*------------------------------------------------------*/
/* END STYLES TASKS ------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* SCRIPTS TASKS ---------------------------------------*/
/*------------------------------------------------------*/
// Compile custom JS and copy to dist/js
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: '.' }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(notify({ message : '<%= file.relative %> minified!', title : "scripts", sound: false}));
}
/*------------------------------------------------------*/
/* END SCRIPTS TASKS -----------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DNN TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// Copy containers to proper DNN theme containers folder
function containers() {
  return gulp.src(paths.containers.src)
    .pipe(gulp.dest(paths.containers.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'containers', sound: false}));
}

// Update manifest.dnn
function manifest() {
  return gulp.src(paths.manifest.src)
    .pipe(replace(/\<package name\=\"(.*?)(?=\")/, '<package name="'+company+ '.' +project))
    .pipe(replace(/type\=\"Skin\" version\=\"(.*?)(?=\")/, 'type="Skin" version="'+version))
    .pipe(replace(/\<friendlyName\>(.*?)(?=\<)/, '<friendlyName>'+project))
    .pipe(replace(/\<description\>(.*?)(?=\<)/, '<description>'+description))
    .pipe(replace(/\<name\>(.*?)(?=\<)/, '<name>'+author))
    .pipe(replace(/\<organization\>(.*?)(?=\<)/, '<organization>'+company))
    .pipe(replace(/\<url\>(.*?)(?=\<)/, '<url>'+url))
    .pipe(replace(/\<email\>(.*?)(?=\<)/, '<email>'+email))
    .pipe(replace(/\<skinName\>(.*?)(?=\<)/, '<skinName>'+project))
    .pipe(replace(/(\\Skins\\)(.*?)(?=\\)/g, '\\Skins\\'+project))
    .pipe(replace(/(\\Containers\\)(.*?)(?=\\)/g, '\\Containers\\'+project))
    .pipe(gulp.dest(paths.manifest.dest))
    .pipe(notify({message: '<%= file.relative %> updated!', title : 'manifest', sound: false}));
}
/*------------------------------------------------------*/
/* END DNN TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* PACKAGING TASKS -------------------------------------*/
/*------------------------------------------------------*/
// ZIP contents of dist folder
function zipdist() {
  return gulp.src(paths.zipdist.src)
    .pipe(zip(paths.zipdist.zipfile))
    .pipe(gulp.dest(paths.zipdist.dest))
    .pipe(notify({message: '<%= file.relative %> temporarily created!', title : 'zipdist', sound: false}));
}

// ZIP contents of containers folder
function zipcontainers() {
  return gulp.src(paths.zipcontainers.src)
    .pipe(zip(paths.zipcontainers.zipfile))
    .pipe(gulp.dest(paths.zipcontainers.dest))
    .pipe(notify({message: '<%= file.relative %> temporarily created!', title : 'zipcontainers', sound: false}));
}

// ZIP everything else
function zipelse() {
  return gulp.src(paths.zipelse.src, {base: '.'})
    .pipe(gulp.dest(paths.zipelse.dest))
    .pipe(notify({message: '<%= file.relative %> temporarily created!', title : 'zipcontainers', sound: false}))
    .pipe(replace('dist/', ''))
    .pipe(zip(paths.zipelse.zipfile))
    .pipe(gulp.dest(paths.zipelse.dest))
    .pipe(notify({message: '<%= file.relative %> temporarily created!', title : 'zipcontainers', sound: false}));
}

// git ziptemp
var ziptemp = gulp.series(zipdist, zipcontainers, zipelse);

// Assemble files into DNN theme install package
function zippackage() { 
  return gulp.src(paths.zippackage.src)
    .pipe(zip(paths.zippackage.zipfile))
    .pipe(gulp.dest(paths.zippackage.dest))
    .pipe(notify({message: '<%= file.relative %> created!', title : 'zippackage', sound: false}));
}

// Cleanup temp folder
function cleanup() {
  return gulp.src(paths.cleanup.src)
    .pipe(clean())
    .pipe(notify({message: 'temp folder cleaned up!', title : 'cleanup', sound: false}));
}
/*------------------------------------------------------*/
/* END PACKAGING TASKS ---------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// gulp watch
function watch() {
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.containers.src, containers);
}

// gulp init
var init = gulp.series(fontsInit, faFontsInit, faCssInit, normalizeInit, foundationCssInit, foundationJsInit, prismJsInit, prismCssInit);

// gulp build
var build = gulp.series(init, styles, scripts, images, containers, manifest);

// gulp package
var package = gulp.series(build, ziptemp, zippackage, cleanup);
/*------------------------------------------------------*/
/* END DEV TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* EXPORT TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// You can use CommonJS `exports` module notation to declare tasks
exports.fontsInit = fontsInit;
exports.faFontsInit = faFontsInit;
exports.faCssInit = faCssInit;
exports.normalizeInit = normalizeInit;
exports.foundationCssInit = foundationCssInit;
exports.foundationJsInit = foundationJsInit;
exports.prismJsInit = prismJsInit;
exports.prismCssInit = prismCssInit;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.containers = containers;
exports.manifest = manifest;
exports.zipdist = zipdist;
exports.zipcontainers = zipcontainers;
exports.zipelse = zipelse;
exports.ziptemp = ziptemp;
exports.zippackage = zippackage;
exports.cleanup = cleanup;
exports.watch = watch;
exports.init = init;
exports.build = build;
exports.package = package;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/