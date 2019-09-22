const validateCommand = ()=>{
    my_args = process.argv.slice(2);
    const isValid = my_args.includes("-h")||
        my_args.includes("--help")||
        my_args.includes("--usage")||
        my_args.includes("-u")||
        my_args.includes("--read")||
        my_args.includes("-r")||
        my_args.includes("--cli")||
        my_args.includes("-c");
    return {request:my_args[0],args:my_args,isValid:isValid};
};
module.exports = {getCommand:validateCommand};