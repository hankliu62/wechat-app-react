const colors = require('colors/safe');

class LoggerPlugin {
  apply(compiler) {
    compiler.plugin('build-module', (compilation, callback) => {
      callback();

      console.log(colors.gray('\n-------------------------------------------------------'));
      console.log(colors.gray('---------------------') + colors.red(' webpack start ') + colors.gray('---------------------'));
      console.log(colors.gray('-------------------------------------------------------\n'));

      console.log(colors.yellow('---------- package info start ----------'));

      console.log(colors.yellow('---------- build... ----------'));
    });

    compiler.plugin('after-emit', (compilation, callback) => {
      callback();

      console.log(colors.yellow('---------- build success... ----------\n'));
      console.log(colors.gray('-------------------------------------------------------'));
      console.log(colors.gray('---------------------') + colors.red(' webpack end ') + colors.gray('---------------------'));
      console.log(colors.gray('-------------------------------------------------------\n'));
    });
  }
}

module.exports = LoggerPlugin;

