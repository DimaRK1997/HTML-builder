const fsPromises = require('fs/promises');
const path = require('path');
const toFile = path.join(__dirname, 'project-dist', 'bundle.css');
const fromStyles = path.join(__dirname, 'styles');
let arr = [];

fsPromises.readdir(fromStyles, { withFileTypes: true }).then((files)=>{
    for (let item of files) {
        const pathToCurrentFile = path.join(fromStyles, item.name);
        if (path.extname(pathToCurrentFile)==".css") {
            fsPromises.readFile(pathToCurrentFile, 'utf8').then((cssContent)=>{
                arr.push(`${cssContent}\n`);
                fsPromises.writeFile(toFile, arr).then
            });
        }
    }
});