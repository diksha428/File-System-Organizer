//1. First Activity with Node.js

// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

// we will be using built in node modules like fs and path to  create this project

// array ke from mein input jaata hai command line pein

//let input = process.argv[2]
//console.log(input)
// node js treats command line inputs as array and that array is your process array

const fs = require("fs");
const path = require("path");
const helpObj = require('./command/help') // imported help script
const treeObj = require('./command/tree')
const organizeObj = require('./command/organize')

let inputArr = process.argv.slice(2); //.slice(2); // slice is used to extart the commands and path we have passed
//console.log(inputArr)
let command = inputArr[0]; // organzie , help . tree , default

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]) //Obj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]);//Obj.organizeKey(inputArr[1]); // you are passing a directory Path
    break;
  case "help":
   helpObj.helpFnKey()
    break;
  default:
    console.log("PLEASE ENTER A VALID COMMAND");
    break;
}
function treeFn(dirpath) {
  if(dirpath == undefined){
    console.log("Please enter a valid Path")
}

else {
  let doesExist = fs.existsSync(dirpath)
  if (doesExist){
    treeHelper(dirpath , " ")
  }
 }
}

function treeHelper(dirpath, indent) {
  let isFile = fs.lstatSync(targetPath).isFile()

  if (isFile == true) {
    let fileName = path.basename(targetPath)
    console.log(indent + "├──" + fileName)
  }

  else {

    let dirName = path.basename(dirpath)
    console.log(indent + "└──" + dirName);

    let children = fs.readdirSync(dirpath)

    for (let i = 0; i < children.length; i++) {
      let childPath = path.join(targetPath, children[i])
      treeHelper(childPath, indent + '\t')
    }
  }
}

function organizeFn(dirpath) {
  // 1. input a directory path
  let destpath;

  if (dirpath == undefined) {
    console.log("please enter a Directory Path");
    return;
  } else {
    let doesExist = fs.existsSync(dirpath);
    //consle.log(doesExist)  //It returns true or false for the directory

    if (doesExist == true) {
      //2. create a organized files Directory 
      destpath = path.join(dirpath, "organized_files");
      //dirpath -> //D:\fjp2 Dev\Test Folder\organized_file I want to create folder in the path
      if (fs.existsSync(destpath) == false) {
        fs.mkdirSync(destpath); // we will only create a directory if it does not exist
      } else {
        console.log("The Folder Already Exists");
      }
    } else {
      console.log("please enter a valid Path");
    }
  }
  organizeHelper(dirpath, destpath);
}
  //we wrote this organizeHelper to categorize the files
function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  //console.log(childNames)

  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i])
    let isFile = fs.lstaSync(childAddress).isFile();

    if (isFile == true) {
      let fileCategory = getCategory(childNames[i]);
      console.log(childNames[i] + " belongs to " + fileCategory);

      sendFiles(childAddress, dest, fileCategory)
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name); // we will take out the extension of the file here
  // console.log(ext)
  ext = ext.slice(1);
  //console.log(ext)

  for (let type in types) {
    let cTypeArr = types[type];
    // console.log(cTypeArr)

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {  // we matched the extension
        return type;  // we returned types of the file
      }
    }
  }

  return "others";
}



function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory)
  //D:\fjp2 Dev\Test Folder\organized_files\media
  //D:\fjp2 Dev\Test Folder\organized_files\document
  //D:\fjp2 Dev\Test Folder\organized_files\app
  //D:\fjp2 Dev\Test Folder\organized_files\archives

  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath)
  }

  let fileName = path.basename(srcFilePath)
  let destFilePath = path.join(catPath, fileName)

  fs.copyFileSync(srcFilePath, destFilePath)
  fs.unlikeSymc(srcFilePath)

  console.log(fileName + "copied to " + fileCategory)
}

// console.log('organize Function Implemented')
function helpFn() {
  console.log(`List of all the commands-
                     1)Tree Command - node FO.js tree <dirName>
                     2)Organize - node FO.js organize-<dirName
                     3)Help - node FO.js help`);
}







//D:\fjp2 Dev\Test Folder

//D:\fjp2 Dev\Test Folder\organized_file ---> new folder path

