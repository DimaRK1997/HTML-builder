const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'files');
const copyfolder = path.join(__dirname, 'files-copy');

async function copyDir(fromCopy, toCopy) {
    await fsPromises.rm(toCopy, { force: true, recursive: true });
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
copyDir(folder, copyfolder);

