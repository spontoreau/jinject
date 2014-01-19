var Binding = require('./binding');

/**
 * ioc kernel
 */
module.exports = function(){

    /**
     * Self variable
     * @type {module}
     */
    var self = this;

    /**
     * Register bindings
     * @type {Array}
     * @private
     */
    var _bindings = [];

    /**
     * Bind a dependency
     * @param name of an object property to inspect
     * @returns {Binding}
     */
    self.bind = function(name){
        var binding = new Binding();
        binding.bind(name);
        _bindings.push(binding);
        return binding;
    };

    /**
     * Resolve dependencies of an object
     * @param name
     * @type {object}
     */
    self.resolve = function(object){
        for(var i = 0; i < _bindings.length; i++){
            if(_bindings[i].getName() in object){
                object[_bindings[i].getName()] = _bindings[i].getInstance();
            }else{
                if(_bindings[i].canCreate()){
                    object[_bindings[i].getName()] = _bindings[i].getInstance();
                }
            }
        }
    };
};