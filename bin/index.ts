#!/usr/bin/env node

const minimist = require('minimist');
const { exec } = require('child_process');
const path = require('path');

const ROOT = `${__dirname.replace("/bin", "")}`;
let pathToLib = `libwebp-0.4.1-mac-10.8/bin`;

let args = minimist(process.argv.slice(2));

if(!args['i']){
    console.error('\nERROR: Please mention input folder\n');
    process.exit();
}

let pathToOutput = args['o'] || `${ROOT}/webp/images`;
let pathToInput = args['i'];

process.chdir(`${pathToInput}`);

let listOfFileNames = [];

exec(`ls`, (error, stdout, stderr) => {

    let output = stdout;
    listOfFileNames = output.split('\n');
    process.chdir(`${ROOT}/${pathToLib}`);

    for(let i = 0; i < listOfFileNames.length; i++){
        let fileName = listOfFileNames[i];
        fileName = fileName.replace(" ", "\\ ");
        fileName = fileName.replace("(", "\\(");
        fileName = fileName.replace(")", "\\)");
        if(fileName){
            exec(`./cwebp -q 80 ${pathToInput}/${fileName} -o ${pathToOutput}/${fileName.split('.')[0]}.webp`, (error, stdout, stderr) => {
                if(error){
                    console.log(`Error: ${error}`);
                }
            });
        }
    }

});