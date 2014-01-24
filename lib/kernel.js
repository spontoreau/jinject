var Binding = require('./binding');

/**
 * ioc kernel
 */
module.exports = {

    /**
     * Register bindings
     * @type {Array}
     * @private
     */
    bindings : [],

    /**
     * Bind a dependency
     * @param name of an object property to inspect
     * @returns {Binding}
     */
    bind : function(name){
        var binding = Object.create(Binding);
        binding.bind(name);
        this.bindings.push(binding);
        return binding;
    },

    /**
     * Resolve dependencies of an object
     * @param object
     * @type {object}
     */
    resolve : function(object){
        for(var i = 0; i < this.bindings.length; i++){
            if(this.bindings[i].getName() in object){
                object[this.bindings[i].getName()] = this.bindings[i].getInstance();
            }else{
                if(this.bindings[i].canCreate()){
                    object[this.bindings[i].getName()] = this.bindings[i].getInstance();
                }
            }
        }
    },

    /**
     * Resolve dependencies in asynchronous mode
     * @param object
     * @param callback
     */
    resolveAsync : function(object, callback){
        console.log("Call async");
        process.nextTick(function(){
            this.resolve(object);
            console.log("callback");
            callback();
        });
    }
};