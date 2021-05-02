#!/usr/bin/env node

const minimist = require('minimist');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const platform = process.platform;
let ROOT = path.dirname(__dirname);
let pathToLib = 'libwebp';

const OUTPUT_DIR_NAME = 'webpc-output';

switch (platform) {
    case 'darwin':
        pathToLib = path.join(pathToLib, 'macos');
        break;
    case 'win32':
        pathToLib = path.join(pathToLib, 'windows', 'bin');
        break;
    case 'linux':
        pathToLib = path.join(pathToLib, 'linux');
        break;
    default:
        pathToLib = path.join(pathToLib, 'macos');
        break;
}

let args = minimist(process.argv.slice(2));

if (!args['i']) {
    console.error('\nERROR: Please mention input folder\n');
    process.exit();
}

let pathToOutput = args['o'] || args['i'];
let pathToInput = args['i'];

process.chdir('/');

let listOfFileNames = fs.readdirSync(pathToInput);

if (args['o']) {
    process.chdir(pathToOutput);
    fs.mkdirSync(OUTPUT_DIR_NAME, { recursive: true });
} else {
    process.chdir(`${pathToInput}`);
    fs.mkdirSync(OUTPUT_DIR_NAME, { recursive: true });
}

for (let i = 0; i < listOfFileNames.length; i++) {
    let fileName = listOfFileNames[i];
    if (fileName) {
        let outputFileName = fileName.split(".")[0];
        exec(`./cwebp -q 80 "${path.join(pathToInput, fileName)}" -o "${path.join(pathToOutput, 'webpc-output', `${outputFileName}.webp`)}"`, {
            cwd: path.join(ROOT, pathToLib)
        }, (error, stdout, stderr) => {
            console.log(stderr);
            if (error) {
                console.log(error);
            }
        });
    }
}