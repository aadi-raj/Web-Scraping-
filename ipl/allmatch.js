const request = require('request');
const cheerio = require('cheerio');

// fetching the scorecard folder 
const scorecrdobj = require('./scorecard');


// main function 
function getAllMatchLink(url){
    request(url,function(err,response, html){
        if (err){
            console.log(err);
        } else {
            // calling the function if there is no error
            extractlinkk(html);
        }
    })
}

// this will fetch the link of every match 
function extractlinkk(html){
    let $ = cheerio.load(html);
    let linkk = $('.ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent');
    let link = $(linkk).children('a.ds-no-tap-higlight');
    for(let i=0;i<link.length;i++)
    {
        let linnk = $(link[i]).attr('href');

        let fullLink = 'https://www.espncricinfo.com'+linnk;

        scorecrdobj.ps(fullLink); // getting into the scorecard of each match
    }
}

// exporting the main content of this file 
module.exports = {
    gAlmatches: getAllMatchLink
}
