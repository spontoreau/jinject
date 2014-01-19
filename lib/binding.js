/**
 * Dependency binding configuration
 */
module.exports = function(){

    /**
     * Self variable
     * @type {module}
     */
    var self = this;

    /**
     * private property use for singleton
     */
    var _instance;

    /**
     * Binding name
     * @type {string}
     * @private
     */
    var _name;

    /**
     * Dependency object
     * @type {object}
     * @private
     */
    var _dependency;

    /**
     * True if Kernel create the property if it's an unknown property
     * @type {boolean}
     * @private
     */
    var _createIfUnknow = false;

    /**
     * Scope
     * @type {string}
     * @private
     */
    var _scope;

    /**
     * Define bind name
     * @param name
     * @type {string}
     * @returns {module}
     */
    self.bind = function(name){
        if(typeof name != 'string'){
            throw new Error('Bind name must be an instance of String, current : ' + typeof name);
        }

        _name = name;
        return self;
    };

    /**
     * Define dependency object type
     * @param dependency
     * @type {object}
     * @returns {module}
     */
    self.to = function(dependency){
        if(typeof dependency != 'object'){
            throw new Error('Dependency must be an Object type, current : ' + typeof dependency);
        }

        _dependency = dependency;
        return self;
    };

    /**
     * True if Kernel create the property if it's an unknown property
     * @param {boolean}
     * @private
     */
    self.createIfUnknow = function(value){
        if(typeof value != 'boolean'){
            throw new Error('Value must be a boolean, current : ' + typeof value);
        }

        _createIfUnknow = value;
        return self;
    }

    /**
     * Set Dependency bind to transient scope.
     */
    self.inTransientScope = function(){
        _scope = 'transient';
    };

    /**
     * Set Dependency bind to singleton scope
     */
    self.inSingletonScope = function(){
        _scope = 'singleton';
    };

    /**
     * Return name
     * @returns {string}
     */
    self.getName = function(){
        return _name;
    };

    /**
     * Return scope
     * @returns {string}
     */
    self.getScope = function(){
        return _scope;
    };

    /**
     * True if kernel can create the property
     * @returns {boolean}
     */
    self.canCreate = function(){
        return _createIfUnknow;
    };

    /**
     * Get dependency object instance
     * @return {object}
     */
    self.getInstance = function(){

        if(_dependency == null || _dependency == undefined){
            throw new Error('Dependency binding not defined');
        }

        if(_scope == null){
            throw new Error('Scope binding not defined');
        }

        if(_scope === 'singleton'){
            if(_instance == null || _instance == undefined)
                _instance = Object.create(_dependency);
        }

        return (_scope === 'singleton') ? _instance : Object.create(_dependency);
    };
};
