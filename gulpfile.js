const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Serve task - starts a local development server
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: 8000,
    notify: false,
    open: true, // Automatically open browser
    ui: false
  });

  // Watch for changes and reload
  gulp.watch([
    '*.html',
    '**/*.html',
    'styles.css',
    'script.js',
    'partials/*.html'
  ]).on('change', browserSync.reload);

  done();
}

// Default task
exports.default = serve;
exports.serve = serve;
