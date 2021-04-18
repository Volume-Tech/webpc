#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

const ROOT = '/Users/hvg/IdeaProjects/node-practice';
let pathToLib = `libwebp-0.4.1-mac-10.8/bin`;
let pathToOutput = `webp/images`;
let pathToInput = `images`;

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
            exec(`./cwebp -q 80 ${ROOT}/${pathToInput}/${fileName} -o ${ROOT}/${pathToOutput}/${fileName.split('.')[0]}.webp`, (error, stdout, stderr) => {
                if(error){
                    console.log(`Error: ${error}`);
                }
            });
        }
    }

});