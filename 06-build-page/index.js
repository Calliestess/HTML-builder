const fs = require('fs');
const path = require('path');
//из 04-copy-directory
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

async function buildPage() {
    //создаем папку project-dist
    const createPath = path.join('06-build-page', 'project-dist');
    try {
      await fs.promises.mkdir(createPath, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    const templatePath = path.join('06-build-page', 'template.html');
    let indexHtml = await fs.promises.readFile(templatePath, 'utf-8');
    let componentFiles = await fs.promises.readdir(path.join('06-build-page', 'components'));
  
    //заменяем шаблонный тег
    for (let filename of componentFiles) {
      let componentName = path.parse(filename).name;
      let componentContent = await fs.promises.readFile(path.join('06-build-page', 'components', filename), 'utf-8');
      let placeholder = new RegExp(`{{\\s*${componentName}\\s*}}`, 'g');
      indexHtml = indexHtml.replace(placeholder, componentContent);
    }
     
    const indexPath = path.join('06-build-page', 'project-dist', 'index.html');
    // записываем в файл index.html
    await fs.promises.writeFile(indexPath, '');
    await fs.promises.writeFile(indexPath, indexHtml);
  
    // // объединяем все CSS-файлы из папки styles в один файл
    let cssFiles = await fs.promises.readdir(path.join('06-build-page', 'styles'));
    let cssContent = '';
    for (let filename of cssFiles) {
      let fileContent = await fs.promises.readFile(path.join('06-build-page', 'styles', filename), 'utf-8');
      cssContent += fileContent + '\n';
    }
    await fs.promises.writeFile(path.join('06-build-page', 'project-dist', 'style.css'), cssContent);
  
    // копируем папку assets в project-dist/assets
    srcPath = path.join('06-build-page', 'assets');
    destPath = path.join('06-build-page', 'project-dist', 'assets');
    copyDir(srcPath, destPath);
    console.log('Создана папка project-dist');
  }
  
  buildPage();
