const fs = require('fs');
const path = require('path');

const folderPath = path.join('03-files-in-folder', 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
  
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
  
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
  
        if (stats.isFile()) {
          const name = path.parse(file).name;
          const extension = path.parse(file).ext.substr(1);
          const size = stats.size / 1024;             // переводим размер в кб
          console.log(`${name}-${extension}-${size.toFixed(3)}kb`);
        }
      });
    });
  });