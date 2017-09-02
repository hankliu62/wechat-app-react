const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  function generateLoaders(test, loaders) {
    const sourceLoaders = loaders.map((loader) => {
      let extraParamChar;

      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader += '-loader';
        extraParamChar = '?';
      }

      return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '');
    });

    sourceLoaders.push('postcss-loader');

    if (options.extract) {
      const extractOptions = {
        fallback: 'style-loader',
        use: sourceLoaders
      };

      return { test, use: ExtractTextPlugin.extract(extractOptions), exclude: /node_modules/ };
    }
    return { test, use: sourceLoaders, exclude: /node_modules/ };
  }

  return [
    generateLoaders(/\.css$/, ['css']),
    generateLoaders(/\.less$/, ['css', 'less']),
    // generateLoaders(/\.sass$/, ['css', 'sass?indentedSyntax']),
    // generateLoaders(/\.scss$/, ['css', 'sass']),
    generateLoaders(/\.stylus$/, ['css', 'stylus']),
    generateLoaders(/\.styl$/, ['css', 'stylus'])
  ];
};
