// last ball commentary of completed match 

const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/sri-lanka-in-india-2022-23-1348629/india-vs-sri-lanka-1st-odi-1348643/ball-by-ball-commentary";
console.log("Before");
request(url,cb);
function cb(err,response,html){
    if (err){
        console.log(err);
    }
    else {
        extracthtml(html); 
    }
}


function extracthtml(html){
    let $ = cheerio.load(html);
    let elems = $(".ci-html-content");
    let textt = $(elems[10]).text();
    let htmldata = $(elems[10]).html();
    console.log("text data", textt);
    console.log("html data", htmldata);
}
