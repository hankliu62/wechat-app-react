const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');

const cmds = process.argv; // 获取控制台输入命令
const env = cmds.filter(cmd => /NODE_ENV/.test(cmd))[0].split('=')[1]; // 获取环境变量

class DeleteFolderPlugin {
  constructor(folderPath) {
    this.folderPath = folderPath;
  }

  apply(compiler) {
    compiler.plugin('build-module', (compilation, callback) => {
      callback();

      if (env !== 'development') {
        console.log(colors.yellow('---------- delete the static resource folder... ----------'));

        DeleteFolderPlugin.deleteFolder(this.folderPath);

        console.log(colors.yellow('---------- delete the static resource folder success ----------\n'));
      }
    });
  }

  static deleteFolder(folderPath) {
    let files = null;
    let subpath = null;

    folderPath = path.resolve(__dirname, folderPath); // 获取待删除文件夹

    if (fs.existsSync(folderPath)) {
      files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        subpath = `${folderPath}/${file}`;

        if (fs.statSync(subpath).isDirectory()) {
          DeleteFolderPlugin.deleteFolder(subpath, false);
        } else {
          fs.unlinkSync(subpath);
        }
      });

      fs.rmdirSync(folderPath);
    }
  }
}

module.exports = DeleteFolderPlugin;
