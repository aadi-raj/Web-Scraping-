// const url ="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/delhi-capitals-vs-mumbai-indians-2nd-match-1304048/full-scorecard";

// getting important libraries 
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');


function processScorecard(url) {
    request(url,cb);
}

function cb(err, response,html){
    if (err){
        console.log(err);
    } else {
        // console.log(html);
        extractMatchDetails(html);
    }
}


// fetching the match details 
function extractMatchDetails(html){
    let $ = cheerio.load(html);
    let desc = $('.ds-text-tight-m.ds-font-regular.ds-text-typo-mid3');
    let matchDescription = $(desc[0]).text(); // description of the match like where it is played 
    let resultt = $('.ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo');
    let result = $(resultt).text(); // result of the match 

    let tabble = $('.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table>tbody');

    let teamNamed = $('.ds-text-title-xs.ds-font-bold.ds-capitalize');
    for (let i=0;i<tabble.length;i++)
    {
        let teamName = $(teamNamed[i]).text();
        teamName = teamName.trim();
        console.log(teamName); // team name 
        let childd = $(tabble[i]).children();
        for(let j=0;j<childd.length;j++)
        {
            grandchild = $(childd[j]).children();
            if(grandchild.length===8)
            {
                let playrname = $(grandchild[0]).text();
                console.log(playrname); // playername 
                playrname = playrname.replace(/[^a-zA-Z0-9 ]/g, ''); // to remove special character 
                let run = $(grandchild[2]).text();
                console.log(run); // runs scored 
                let ball = $(grandchild[3]).text();
                console.log(ball); // no. of balls played 
                let four = $(grandchild[5]).text();
                console.log(four); // fours
                let six = $(grandchild[6]).text();
                console.log(six); // sixes 
                let sr = $(grandchild[7]).text();
                console.log(sr); // strike rate 
                processPlayer(teamName,matchDescription,playrname,run,ball,four,six,sr);
            }
            
        }
    }
}

// each player performance in each match is recorded
function processPlayer(teamName,matchDescription,playrname,run,ball,four,six,sr){
    let teamPath = path.join(__dirname,'ipl',teamName);
    dirCreator(teamPath); 

    let filePath = path.join(teamPath, playrname+".xlsx"); // player excel sheet
    let content = excelReader(filePath,playrname);
    // json object 
    let playerObj = {
        matchDescription,
        teamName,
        playrname,
        run,
        ball,
        four,
        six,
        sr
    }
    content.push(playerObj); // pushing the object 
    excelWriter(filePath,content,playrname);
}

// to create folder
function dirCreator(filePath){
    if (fs.existsSync(filePath)==false)
    {
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath,data,sheetName){
    // to create new work book
    let newWB = xlsx.utils.book_new();
    
    let newWS = xlsx.utils.json_to_sheet(data);
    // appending the data to sheet
    xlsx.utils.book_append_sheet(newWB,newWS,sheetName);
    
    xlsx.writeFile(newWB,filePath);

}

// to read the excel sheet 
function excelReader(filePath,sheetName){
    // to get if such file exist or not
    if (fs.existsSync(filePath)==false){
        return [];
    }
// get work book
    let wb =xlsx.readFile(filePath);
// to get worksheet
    let excelData = wb.Sheets[sheetName];
// sheet data fetching 
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}


module.exports = {
    ps : processScorecard
}