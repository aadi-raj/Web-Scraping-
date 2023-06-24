const url = "https://www.espncricinfo.com/series/sri-lanka-in-india-2022-23-1348629/india-vs-sri-lanka-3rd-odi-1348645/full-scorecard"

const request = require("request");
const cheerio = require("cheerio");
//const url = "https://www.espncricinfo.com/series/sri-lanka-in-india-2022-23-1348629/india-vs-sri-lanka-1st-odi-1348643/ball-by-ball-commentary";
console.log("Before");
request(url,cb);
function cb(err,response,html){
    if (err){
        console.log("out");
    }
    else {
        extracthtml(html); 
    }
}
console.log("After");

function extracthtml(html){
    let $ = cheerio.load(html);
    let ans = $(".ds-text-tight-m");
    let textt = $(ans[4]).text();
    console.log("Player of the match: ",textt);
}