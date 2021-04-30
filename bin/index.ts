#!/usr/bin/env node

const minimist = require('minimist');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const platform = process.platform;
let ROOT = __dirname;
let pathToLib = 'libwebp';

switch (platform) {
    case 'darwin':
        pathToLib += '/macos';
        ROOT = __dirname.replace("/bin", "");
        break;
    case 'win32':
        pathToLib += '\\windows';
        ROOT = __dirname.replace("\\bin", "");
        break;
    case 'linux':
        pathToLib += '/linux'
        break;
    default:
        pathToLib += '/macos'
        break;
}

let args = minimist(process.argv.slice(2));

if (!args['i']) {
    console.error('\nERROR: Please mention input folder\n');
    process.exit();
}

let pathToOutput = args['o'] || args['i'];
let pathToInput = args['i'];

process.chdir(`${pathToInput}`);

let listOfFileNames = [];

exec(`ls`, async (error, stdout, stderr) => {

    let output = stdout;
    listOfFileNames = output.split('\n');
    process.chdir(`${ROOT}\\${pathToLib}`);

    fs.mkdir(`${pathToOutput}/webpc-output`, null, (err) => {

        if (err) {
            return console.log('Error in creating new directory for output');
        }

        pathToOutput = `${pathToOutput}/webpc-output`;

        for (let i = 0; i < listOfFileNames.length; i++) {
            let fileName = listOfFileNames[i];
            if (fileName) {

                fileName = fileName.replace(/\s/g, "\\ ");
                fileName = fileName.replace(/[()]/g, "\\(");
                fileName = fileName.replace(/[()]/g, "\\)");

                let outputFileName = fileName;
                let tempArr = outputFileName.split('.');
                tempArr = tempArr.slice(0, tempArr.length - 1);
                outputFileName = tempArr.join(".");

                exec(`./cwebp -q 80 ${pathToInput}/${fileName} -o ${pathToOutput}/${outputFileName}.webp`, (error, stdout, stderr) => {
                    console.log(stderr);
                    if (error) {
                        console.log(`Error: ${error}`);
                    }
                });
            }
        }
    });

});