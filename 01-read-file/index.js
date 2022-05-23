const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const streamRead = fs.createReadStream(file, 'utf-8');

streamRead.on("data", function(chunk){ 
    console.log(chunk);
});