const url ="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423"; // ipl 2022

const request = require('request');
const cheerio = require('cheerio'); // to scrap the websites 
const fs = require('fs'); // to working with file and folder 
const AllMatchObj = require("./allmatch"); // accessing file allmatch.js
const path =require('path'); // path api to work with different file path 

// path to ipl folder 
const iplPath = path.join(__dirname, 'ipl');

// creating the folder 
dirCreator(iplPath);

// requesting the espncricinfo server 
request(url,cb);

// calling the callback function
function cb(err, request,html){
    if (err){
        console.log(err);
    } else {
        // calling this function if there is no error 
        extractLink(html);
    }
}


function extractLink(html)
{
    // the link is loaded inside cheerio
    let $ = cheerio.load(html);
    let childd = $('.ds-text-tight-m.ds-font-bold.ds-text-typo-primary.ds-block.ds-block.ds-text-center');

    // trying to get the link of all match fixture 
    let linnk = $(childd).parent();
    let link = linnk.attr("href");
    let fullLink = 'https://www.espncricinfo.com/'+link;


    AllMatchObj.gAlmatches(fullLink);
}

// to create the file directory 
function dirCreator(filePath){
    if (fs.existsSync(filePath)==false)
    {
        fs.mkdirSync(filePath);
    }
}