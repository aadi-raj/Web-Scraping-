const url = "https://www.espncricinfo.com/series/big-bash-league-2022-23-1324623/melbourne-stars-vs-brisbane-heat-44th-match-1324667/live-cricket-score";

const request = require("request");
const cheerio = require("cheerio");

console.log("Before");
request(url,cb);

function cb(err,response,html){
    if (err){
        console.log(err);
    }
    else 
    {
        extracthtml(html);
    }
}
function extracthtml(html){
    let $ = cheerio.load(html);
    let elems = $(".ds-opacity-50");
    //console.log(elems.length-1);
    let textt = $(elems[elems.length-2]).text();
    console.log("Losing Team: ",textt);
    let elem = $(".ci-team-score");
    let text1 = $(elem[elem.length-2]).text();
    let text2 = $(elem[elem.length-1]).text();
    // console.log(text1);
    // console.log(text2);
    if (text1===textt)
    {
        console.log("Winning Team: ",text2);
    }
    else 
    {
        console.log("Winning Team: ",text1);
    }
    
}