const fs = require('fs');
const path = require('path');

stylesPath = path.join('05-merge-styles', 'styles');
destDir = path.join('05-merge-styles', 'project-dist');

const bundleName = 'bundle.css';

async function writeToFile(filepath, data) {
    try {
      await fs.promises.writeFile(filepath, data);
    } catch (err) {
      console.error(err);
    }
  }

fs.readdir(stylesPath, (err, files) => {
    if (err) throw err;

    const cssFiles = files.filter(file => path.extname(file) === '.css')
                         .map(file => path.join(stylesPath, file));
  
    let cssContent = '';
    Promise.all(cssFiles.map(file => {
        return fs.promises.readFile(file, 'utf8')
                          .then(content => cssContent += content);
    })).then(() => {
        const destPath = path.join(destDir, bundleName);
        writeToFile(destPath, cssContent);
      
        console.log('Стили добавлены в один css файл');
    });
});