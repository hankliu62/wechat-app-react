const HappyPackPlugin = require('happypack');
// const happyThreadPool = HappyPackPlugin.ThreadPool({ size: os.cpus().length });

// generate happypack plugins Object
const HappyPackPluginsMap = {
  js: new HappyPackPlugin({
    id: 'js',
    loaders: ['babel-loader?cacheDirectory=true&sourceMap'],
    cache: true,
  }),
  babel: new HappyPackPlugin({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory=true&sourceMap'],
    cache: true,
  }),
  css: new HappyPackPlugin({
    id: 'css',
    loaders: ['css-loader?importLoaders=1&sourceMap'],
    cache: true,
  }),
  sass: new HappyPackPlugin({
    id: 'sass',
    loaders: ['sass-loader?sourceMap'],
    cache: true,
  }),
  style: new HappyPackPlugin({
    id: 'style',
    loaders: ['style-loader?sourceMap'],
    cache: true,
  }),
  eslint: new HappyPackPlugin({
    id: 'eslint',
    loaders: ['eslint-loader'],
    cache: false,
  })
};

const HappyPackPlugins = [];
for (const key in HappyPackPluginsMap) {
  if (Object.prototype.hasOwnProperty.call(HappyPackPluginsMap, key)) {
    HappyPackPlugins.push(HappyPackPluginsMap[key]);
  }
}

function replaceToHappyLoaders(rules) {
  return rules.map((rule) => {
    const key = rule.test.source.replace(/[\\.?()$|]/g, '');
    if (HappyPackPluginsMap[key]) {
      const happypackLoader = {
        test: rule.test,
        loaders: [`happypack/loader?id=${key}`]
      };
      if (rule.exclude) {
        happypackLoader.exclude = rule.exclude;
      }

      return happypackLoader;
    }

    return rule;
  });
}

function generateHappypackLoaderName(name) {
  const key = name.replace('-loader', '');
  if (HappyPackPluginsMap[key]) {
    return `happypack/loader?id=${key}`;
  }
  return `${key}-loader`;
}

function splitToHappyLoaders(loader) {
  if (loader.indexOf('!') !== -1) {
    return loader.split('!').map(generateHappypackLoaderName);
  }

  return generateHappypackLoaderName(loader);
}

function getHappyPackPlugins() {
  return HappyPackPlugins;
}

function getHappyPackPluginsMap() {
  return HappyPackPluginsMap;
}

function getHappyPackPlugin(key) {
  return HappyPackPluginsMap[key];
}

module.exports = {
  GetHappyPackPlugins: getHappyPackPlugins,
  GetHappyPackPluginsMap: getHappyPackPluginsMap,
  GetHappyPackPlugin: getHappyPackPlugin,
  ReplaceToHappyLoaders: replaceToHappyLoaders,
  SplitToHappyLoaders: splitToHappyLoaders
};
