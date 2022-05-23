const { stdin: input, stdout: output } = require('process');

output.write('What to add to the file:');

const readline = require('readline');
const rl = readline.createInterface({ input, output });

const path = require('path');
const file = path.join(__dirname, 'text.txt');
const fs = require('fs');
const streamWrite = fs.createWriteStream(file, 'utf-8');

rl.on('line', (input) => {
    if (input === 'exit') {
      process.exit();
    } else {
      streamWrite.write(input + '\r\n');
    }
});

const process = require('process');
process.on('exit', () => {
    output.write('Text added to file');
    process.exit();
})
