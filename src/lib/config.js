const {varExtend} = require("structkit");

exports.refPluginConfig =  (config)=>{
    return varExtend({
        "plugin":[],
        "isMemKeepUntilLastFile": false,
        "input":{
            "modules":{
                "replaces":{}
            },
            "path":[],
        },
        "output":{
            "type":"esm",//cjs,iife,
            "config":{},
            "globalName":"default"
        },
        
    },config); 
}