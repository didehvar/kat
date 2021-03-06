module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['systemjs', 'jasmine'],
    systemjs: {
      configFile: 'config.js',
      config: {
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
      },
      serveFiles: [
        'app/**/*.ts',
        'jspm_packages/**/*.js'
      ]
    },
    files: [
      'test/unit/*.spec.ts'
    ],
    exclude: [],
    preprocessors: { },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
