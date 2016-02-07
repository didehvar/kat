var appRoot = 'app/';
var apiRoot = 'api/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/';
var tsOutput = outputRoot + 'api-ts-output/';

module.exports = {
  typings: 'typings/**/*.ts',
  app: {
    root: appRoot,
    source: appRoot + '**/*.ts',
    html: appRoot + '**/*.html',
    css: appRoot + '**/*.css',
    style: 'styles/**/*.css',
    output: outputRoot + appRoot,
    exportSrv: exporSrvtRoot,
    doc: './doc',
    e2eSpecsSrc: 'test/e2e/src/**/*.ts',
    e2eSpecsDist: 'test/e2e/dist/',
    dtsSrc: [
      'typings/browser/**/*.ts',
      './jspm_packages/**/*.d.ts'
    ]
  },
  api: {
    root: apiRoot,
    source: apiRoot + '**/*.ts',
    output: outputRoot + apiRoot,
    tsOutputRoot: tsOutput,
    tsOutputSource: tsOutput + '**/*.js',
    dtsSrc: [
      'typings/main/**/*.ts',
      './jspm_packages/**/*.d.ts'
    ]
  }
}
