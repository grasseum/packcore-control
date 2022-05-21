const PackcoreSupport = require("packcore-support");
const {has} = require("structkit")

const pluginTranform = async (type,plugins,localConfig,content) => {
    
    await plugins.forEach( async(element) => {
        
        if( type ==="firstFile" && has(element.transformFirstFile) ){
            const data  = await element.transformFirstFile(localConfig)
            if(data !== null){
                content = data
            }
        }
        if( type ==="lastFile" && has(element.transformLastFile)){

            const data  = await element.transformLastFile(localConfig)
            if(data !== null){
                content = data
            }
        }
        if( type ==="file" && has(element.transform)){
            const data  = await element.transform(localConfig)
            if(data !== null){
                content = data
            }
        }
    });

    return content;
}

class TransformInitScript{

    constructor(transformConfig , pluginConfig, sessionData){

       this.contentArray
       this.localTransformConfig=transformConfig;
       this.localPluginConfig=pluginConfig
       this.sessionData = sessionData
    }
    setGlobalContentArray(data){
        this.contentArray = data;
    }
    async getData() {

        let localDataConfig = {
            content:this.localTransformConfig.content,
            currentPath:this.localTransformConfig.path,
            processCwd:this.localTransformConfig.processCwd(),
            sessionData:this.sessionData
        }

        const packCoreSupport = PackcoreSupport( this.localPluginConfig.output )

        const contentTransform = await packCoreSupport.transform(localDataConfig,this.localPluginConfig);
        let strContent;
        if (has(contentTransform)){
            strContent = contentTransform;
        }else{
            strContent = this.localTransformConfig.content;
        }
        if (this.localPluginConfig.isMemKeepUntilLastFile){

            this.contentArray.push(strContent);
            if(this.localTransformConfig.isLastPath){
                strContent = this.contentArray.join("\n");
            }else{
                strContent = ""
            }
        }
        localDataConfig.content =strContent;
        strContent = await pluginTranform ("file",this.localPluginConfig.plugin,localDataConfig,strContent) 
        if(this.localTransformConfig.isFirstPath){
            strContent = await pluginTranform ("firstFile",this.localPluginConfig.plugin,localDataConfig,strContent) 

            const contentTransform = await packCoreSupport.transformFirstFile(localDataConfig,this.localPluginConfig);
            //console.log(contentTransform,":::contentTransform")
            if (has(contentTransform)){
                strContent = contentTransform;
                localDataConfig.content =contentTransform;
            }           
        }
        
        if(this.localTransformConfig.isLastPath){
            
            strContent = await pluginTranform ("lastFile",this.localPluginConfig.plugin,localDataConfig,strContent) 

            const contentTransform = await packCoreSupport.transformLastFile(localDataConfig,this.localPluginConfig);
            if (has(contentTransform)){
                strContent = contentTransform;
                localDataConfig.content =contentTransform;
            }

        }
        return strContent;
    }
}

module.exports = function( transformConfig , pluginConfig,sessionData){
    
    const transform = new TransformInitScript(transformConfig , pluginConfig,sessionData);
    
    return transform;
}