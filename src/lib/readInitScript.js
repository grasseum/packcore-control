const PackcoreSupport = require("packcore-support");
const {has} = require("structkit")

class ReadInitScript{

    constructor(readConfig , pluginConfig, sessionData){

       this.readConfig=readConfig; 
       this.pluginConfig =pluginConfig
       this.sessionData=sessionData
    }
  
    async getData() {
        
        const that = this;
        const packCoreSupport = PackcoreSupport( this.pluginConfig.output )
       const contentTransform = await packCoreSupport.read(this.readConfig,this.pluginConfig,this.sessionData);
       return contentTransform;
    }
}

module.exports = function( transformConfig , pluginConfig,sessionData){
    
    const transform = new ReadInitScript(transformConfig , pluginConfig,sessionData);
    
    return transform;
}