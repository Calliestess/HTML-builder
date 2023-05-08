const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
    try {
        await fs.promises.mkdir(dest);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
  const files = await fs.promises.readdir(src);

  for (let file of files) {
    const filePath = `${src}/${file}`;
    const stats = await fs.promises.stat(filePath);  //делая проверки файл это или папка

    if (stats.isDirectory()) {
      await copyDir(filePath, `${dest}/${file}`);
    } 
    else {
      await fs.promises.copyFile(filePath, `${dest}/${file}`);
    }
  }
}
srcPath = path.join('04-copy-directory', 'files');
destPath = path.join('04-copy-directory', 'files-copy');

copyDir(srcPath, destPath);