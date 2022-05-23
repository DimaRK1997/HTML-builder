const fsPromises = require('fs/promises');
const path = require('path');
const toFile = path.join(__dirname, 'project-dist', 'bundle.css');
const fromStyles = path.join(__dirname, 'styles');
let arr = [];

(async () => {
    const files = await fsPromises.readdir(fromStyles, { withFileTypes: true });
    for (let item of files) {
        const pathToCurrentFile = path.join(fromStyles, item.name);
        if (path.extname(pathToCurrentFile)==".css") {
            const cssContent =await fsPromises.readFile(pathToCurrentFile, 'utf8');
            arr.push(`${cssContent}\n`);
        }
    }
    await fsPromises.writeFile(toFile, arr);
})();