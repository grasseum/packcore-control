const {varExtend} = require("structkit");

exports.transformConfig =  (config,initialConfig)=>{


    return {
        isFirstPath:config.data.isFirstPath,
        isLastPath:config.data.isLastPath,
        content:config.data.contents.toString(),
        path : config.data.path.toString(),
        processCwd:process.cwd
    }; 
}

exports.readConfig =  (config,initialConfig)=>{


    return {
        base: config.base,
        contents: config.contents,
        cwd: config.cwd,
        filename: config.filename,
        isFirstPath: config.isFirstPath,
        isLastPath: config.isLastPath,
        path: config.path,
        pathStat: config.pathStat,
        isMainFile: config.isMainFile
    }; 
}
exports.writeConfig =  (config, initialConfig)=>{
    return varExtend({
        
    },config); 
}
