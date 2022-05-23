const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const fullName = path.join(__dirname, 'secret-folder');


async function getDirInfo() {
  try {
    const files = await readdir(fullName, { 
        withFileTypes: true 
    });

    for (const file of files){
        const fullName = path.join(__dirname, 'secret-folder', file.name);
        fs.stat(fullName, (err, stats) => {
            if (err) console.log(`Err: ${err}`);
            else if (stats.isFile()) {
            let info = `Name file: ${file.name}; type file: ${path.extname(fullName).slice(1)};  size file: ${stats.size / 1024}kb;`;
            console.log(info);
            }
        });
    }

    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

getDirInfo();