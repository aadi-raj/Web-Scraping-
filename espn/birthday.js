// to display birthdate of every batsman that had played the match 

const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/rajasthan-royals-vs-chennai-super-kings-68th-match-1304114/full-scorecard";

const request  = require("request");
const cheerio = require("cheerio");

request(url,cb);

function cb(err, response, html){
    if (err)
    {
        console.log(err);
    }
    else 
    {
        extracthtml(html);
    }
}


function extracthtml(html)
{
    let $ = cheerio.load(html);
    let elem = $(".ci-team-score.ds-mb-2");
    for(let i=0;i<elem.length;i++)
    {
        if ($(elem[i]).hasClass("ds-opacity-50"))
        {

        }
        else 
        {
            let teamname = $(elem[i]).find(".ds-flex");
            console.log("Winning Team: ",teamname.text());
            let score = $(elem[i]).find(".ds-text-compact-m");
            console.log("Winning Team Score: ",score.text());
            let inn = $("table.ds-w-full.ds-table.ci-scorecard-table");
            let htmlstr = "";
            let maxscore=0;
            for(let i=0;i<inn.length;i++)
            {
                
                htmlstr+=$(inn[i]).html();
                let playerr =$(inn[i]).find('tbody>tr'); // to access the player
                
                for(let j=0;j<playerr.length;j++)
                {
                    let playr = $(playerr[j]).find('td>[href]'); // player name 
                    
                    
                    let playrb = $(playr).attr('href');
                    if (playrb != undefined)
                    {
                        let fullLink = 'https://www.espncricinfo.com/' +playrb;
                        // console.log(fullLink);
                        getBirthdaypage(fullLink);
                    }
                }
                
            }
        }
    }
}


function getBirthdaypage(url)
{
    request(url,cb);
    function cb(err, response, html) {
        if (err){

        }else {
            extractBirthday(html);
        }
    }
}

function extractBirthday(html)
{
    let $ = cheerio.load(html);
    let eleem = $('span.ds-text-title-s.ds-font-bold.ds-text-typo>h5');
    console.log($(eleem[0]).text());
    
    console.log("Birthdate: ",$(eleem[1]).text());

}