# WEBP IMAGE CONVERTER (webpc)
### It is a command line utility written in node js which helps to convert images in other formats like jpeg, png into webp format.

## How to use it locally on your system?
### System Environment
- Node JS (v14.15.5)
- npm (v7.8.0)
- MacOS Big Sur (v11.3)

Start by downloading this repository to your system.
Open the project directory in your favorite IDE.

Run the following command in the terminal (from the project directory)

<code>npm install -g</code>
<br>or<br>
<code>npm i -g</code>

This command will install **webpc** named command line which can be run from your terminal.

The command should be in the following format:
<br>
<code>webpc -i {path to input directory} -o {path to output directory}</code>
<br>

Arguments:
- i - this indicates the path of the input directory in which jpeg or png files are present
- o - this indicates the path of the output directory where we want to store the output. (This flag is optional, if it is not present, output will be stored in the **webpc-output** directory inside the given input directory)