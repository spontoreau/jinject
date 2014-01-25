/**
 * Dependency binding configuration
 */
module.exports = {

    /**
     * Define bind name
     * @param name
     * @type {string}
     * @returns {object}
     */
    bind : function(name){
        if(typeof name != 'string'){
            throw new Error('Bind name must be an instance of String, current : ' + typeof name);
        }

        this.name = name;
        return this;
    },

    /**
     * Define dependency object type
     * @param dependency
     * @type {object}
     * @returns {object}
     */
    to : function(dependency){
        if(typeof dependency != 'object' && typeof dependency != 'function'){
            throw new Error('Dependency must be an Object or Function type, current : ' + typeof dependency);
        }

        this.dependency = dependency;
        return this;
    },

    /**
     * True if Kernel create the property if it's an unknown property
     * @param value
     * @type {boolean}
     * @return {object}
     */
    create : function(value){
        if(typeof value != 'boolean'){
            throw new Error('Value must be a boolean, current : ' + typeof value);
        }

        this.mustCreate = value;
        return this;
    },

    /**
     * Define a contract.
     * @param contract
     * @returns {exports}
     */
    validate : function(contract){
        if(typeof contract != 'object'){
            throw new Error('Contract must be an object, current : ' + typeof contract)
        }

        this.contract = contract;
        return this;
    },

    /**
     * Set Dependency bind to transient scope.
     */
    inTransientScope : function(){
        this.scope = 'transient';
    },

    /**
     * Set Dependency bind to singleton scope
     */
    inSingletonScope : function(){
        this.scope = 'singleton';
    },

    /**
     * Return name
     * @returns {string}
     */
    getName : function(){
        return this.name;
    },

    /**
     * Return scope
     * @returns {string}
     */
    getScope : function(){
        return this.scope;
    },

    /**
     * True if kernel can create the property
     * @returns {boolean}
     */
    canCreate : function(){
        return this.mustCreate;
    },

    /**
     * True if dependency is valid.
     * @returns {boolean}
     */
    isValid : function(){
        //first check if dependency is defined
        if(this.dependency == null || this.dependency == undefined){
            return false;
        }
        //if undefined, there are no contract, so validation is ok
        if(this.contract == undefined){
            return true;
        }

        //check all properties in the contract
        for(var prop in this.contract){
            if(typeof this.contract[prop] != "string"){
                continue;// if value of the contract property isn't a string, don't consider it
            }else{
                if(this.dependency[prop] == undefined || typeof this.dependency[prop] != this.contract[prop]){
                    return false;
                }
            }
        }

        return true;
    },

    /**
     * Get dependency object instance
     * @return {object}
     */
    getInstance : function(){

        if(!this.isValid()){
            throw new Error('Dependency binding not valid');
        }

        if(this.getScope() == null || this.getScope() == ''){
            throw new Error('Scope binding not defined');
        }

        if(this.getScope() === 'singleton'){
            if(this.instance == null || this.instance == undefined)
                this.instance = this.createInstance();
        }

        return (this.getScope() === 'singleton') ? this.instance : this.createInstance();
    },

    createInstance : function(){
        return typeof this.dependency == 'object' ? Object.create(this.dependency) : new this.dependency;
    }
};
