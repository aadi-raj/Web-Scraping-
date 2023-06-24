const url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/gujarat-titans-vs-rajasthan-royals-qualifier-1-1312197/full-scorecard";

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
            // losing team
        }
        else 
        {
            // winning team 
            let teamname = $(elem[i]).find(".ds-flex");
            console.log("Winning Team: ",teamname.text());
            let score = $(elem[i]).find(".ds-text-compact-m");
            console.log("Winning Team Score: ",score.text());

            let inn = $("table.ds-w-full.ds-table.ci-scorecard-table"); // getting the score card

            // for maximum score
            let maxscore=0;
            for(let i=0;i<inn.length;i++)
            {
                let anss = $(inn[i]).find('td.ds-w-0.ds-whitespace-nowrap.ds-min-w-max.ds-text-right>strong');// getting the score of every batsman
                let playerr =$(inn[i]).find('tbody>tr'); // for getting the player name 

                // for getting the maximum score 
                for(let j=0;j<anss.length;j++)
                {
                    let texttt = $(anss[j]).text();

                    if (maxscore<texttt)
                    {
                        maxscore=texttt
                    }
                }

                // for getting the maximum score 
                for(let j=0;j<playerr.length;j++)
                {
                    let playr = $(playerr[j]).find('td>[href]');
                    let playrscor = $(playerr[j]).find('td>strong');
                    let playrscortext = $(playrscor).text();
                    if(playrscortext===maxscore)
                    {
                        console.log("Highest scorer:",$(playr).text());
                        console.log("His score: ",maxscore);
                    }
                }
                
            }
        }
    }
}