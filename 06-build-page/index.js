const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const folderAssets = path.join(__dirname, 'assets');
const copyfolderAssets = path.join(__dirname, 'project-dist', 'assets');
//const folder = path.join(__dirname, 'project-dist');




async function copyDir(fromCopy, toCopy) {
    await fsPromises.rm(toCopy, { recursive: true, force: true });
    await fsPromises.mkdir(toCopy, { recursive: true });
    const items = await fsPromises.readdir(fromCopy, { withFileTypes: true });
    for(let item of items) {
        const currentItemPath = path.join(fromCopy, item.name);
        const copyItemPath = path.join(toCopy, item.name);
        if (item.isDirectory()){
            await fsPromises.mkdir(copyItemPath, {recursive: true });
            await copyDir(currentItemPath, copyItemPath);
        }else if (item.isFile()){
            await fsPromises.copyFile(currentItemPath, copyItemPath);
        }
    }
}


const toFile = path.join(__dirname, 'project-dist', 'style.css');
const fromStyles = path.join(__dirname, 'styles');


// const toFileHtml = path.join(__dirname, 'project-dist', 'index.html');
// const fromStylesHtml = path.join(__dirname);


function creatDoc(from, to, type){
    let arr = [];
    fsPromises.readdir(from, { withFileTypes: true }).then((files)=>{
        for (let item of files) {
            const pathToCurrentFile = path.join(from, item.name);
            if (path.extname(pathToCurrentFile) == type) {
                fsPromises.readFile(pathToCurrentFile, 'utf8').then((cssContent)=>{
                    arr.push(`${cssContent}\n`);
                    fsPromises.writeFile(to, arr).then
                });
            }
        }
    });
}




async function creatHtml() {
    let templatePage = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf8');
    const pathToComponents = path.join(__dirname, 'components');
    const files = await fsPromises.readdir(pathToComponents, { withFileTypes: true });
    files.forEach(async file => {
    const filePath = path.join(pathToComponents, file.name);
    const fileExt = path.extname(file.name);
    const template = '{{' + file.name.split('.')[0] + '}}';
    const componentData = await fsPromises.readFile(filePath, 'utf8');

    if (templatePage.includes(template) && fileExt === '.html') {
      templatePage = templatePage.replace(template, componentData);
      await fsPromises.writeFile((path.join(__dirname, 'project-dist', 'index.html')), templatePage);
    }
    });
  
}
copyDir(folderAssets, copyfolderAssets);

creatDoc(fromStyles, toFile, '.css');
//creatDoc(fromStylesHtml, toFileHtml, '.html');
creatHtml();
