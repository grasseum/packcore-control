const {has,getTypeof} = require("structkit")

class SessionData {
    constructor( data ) {

        this.data = data;

    }
    getAll() {

        return this.data;

    }
    getByKey(name) {

        return this.data[name];

    }
    setInitialKey (name,value){
        this.data[name]=value;
    }
    setValue (key, value,value2){
        if(has(this.data,key)===false){
            this.data[key] = {}
        }
        if( getTypeof(this.data[key]) ==="array"){
            this.data[key].push(value);
        }else{
            this.data[key][value]=value2;
        } 
    }
}

module.exports = function( data){
    
    const session = new SessionData(data);
    
    return session;
}