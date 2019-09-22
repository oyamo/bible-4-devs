const {getCommand} = require("./get-command.js");
const bible_data = require("./data/en_kjv.json");
const readline = require("readline").createInterface({input:process.stdin,output:process.stdout});
const usageValid = !(!getCommand().isValid || getCommand().args===null || getCommand().request===undefined);
const usage = "Bible-4-Devs (2019) \n Bible Console App for terminal lovers, hackers and Devs \n Author: Brian O. Oyamo (h4wk)\n"
    +"Usage: node bible.js [options]\n"
    +"Used Commands\n"
    +"\t--help, -h, --usage, -u : Show usage manual e.g node bible.js --help\n"
    +"\t--read, -r: Read a particular bible verse. node --read [options] \n\t\te.g node bible.js --read john --chapter 3 --verse 16\n"
    +"\t--read/-r usage example : --read john --chapter 3 --verse 16 \n\t(The order does not matter)"
    +"\n\t--cli: Interact with the Bible commandline: e.g node bible.js --cli\n"
    +"It does not require Super Cow Powers :D . Happy Hacking ;)";

if(!usageValid){
    console.log("Bad Usage of Bible Utility. Type bible.js --help for help.");
    console.log(usage);
    process.exit();
    return;
}else{
    const {request,args} = getCommand();

    if(request==="--cli"){
       const Reading=()=>{
           const read=(reading)=>{
               const chapter_obj = bible_data.find((bk)=>bk.name.toLowerCase()===reading.book.toLowerCase());
               if(chapter_obj===null || chapter_obj===undefined){
                   console.log("Book not Found");
                   process.exit();
                   return;
               }
               const chapter_arr = chapter_obj['chapters'][reading.chapter-1];
               const verse = chapter_arr[reading.verse-1];
               console.log(verse);
               process.exit();
           };
           let reading = {book:null,chapter:null,verse:null};
           readline.question("Enter Book>",(bk)=>{
               reading.book =  bk;
               readline.question("Enter Chapter>",(chapter)=>{
                   reading.chapter =  chapter;
                   readline.question("Enter Verse>",(verse)=>{
                       reading.verse =  verse;
                       read(reading);
                   });
               });
           });
       };
       Reading();


    }else if(request==="--usage"||request==="-u"||request==="-h"||request==="--help"){
        console.log(usage);
        process.exit();
    }else if(request==="--read"||request==="-r"){
        const read =(args)=>{
            if(typeof args==="object" && args.length>1){
                args = args.slice(1);
                const book= args[0].toLowerCase()||null;
                let chapter=(args.includes("--chapter"))?args[args.indexOf("--chapter")+1]:(
                    args.includes("-c"))?args[args.indexOf("-c")+1]:null;
                let verse=(args.includes("--verse"))?args[args.indexOf("--verse")+1]||null:
                    (args.includes("-v"))?args[args.indexOf("-v")+1]:null;
                if(isNaN(chapter)||chapter==null) {
                    console.log("Please provide chapter number");
                }else{
                    const chapter_obj = bible_data.find((bk)=>bk.name.toLowerCase()===book)||null;
                    if(chapter_obj===null || chapter_obj===undefined){
                        console.log("Book not Found");
                        process.exit();
                        return;
                    }
                    const chapter_arr = chapter_obj['chapters'][chapter-1];
                    let txt = "";
                    if(isNaN(verse)||verse==null){
                        chapter_arr.forEach((v,k)=>{
                            txt+=`Verse ${k+1}:\n${v}\n`;
                        });
                        console.log(txt);
                    }else{
                       console.log(chapter_arr[verse-1]);
                    }
                    process.exit();

                }
            }
        };
        read(args);
    }
}
//console.log(bible_data.find((book)=>book.name.toLowerCase()==="exodus"));