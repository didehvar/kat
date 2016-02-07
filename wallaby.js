
module.exports = function (wallaby) {

  return {
    files: [

      {pattern: 'jspm_packages/system.js', instrument: false},
      {pattern: 'config.js', instrument: false},

      {pattern: 'app/**/*.ts', load: false}

    ],

    tests: [
      {pattern: 'test/unit/**/*.spec.ts', load: false}
    ],


    middleware: (app, express) => {
      app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
    },

    bootstrap: function (wallaby) {
      wallaby.delayStart();

      System.config({
        paths: {
          "*": null,
          "app/*": "app/*",
          "typescript": "node_modules/typescript/lib/typescript.js",
          "systemjs": "node_modules/systemjs/dist/system.js",
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
        },
         packages: {
          'test/unit': {
            defaultExtension: 'ts'
          },
          'app': {
            defaultExtension: 'ts'
          }
        },
        transpiler: 'typescript'
      });

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      });
    },

    debug: false
  };
};
