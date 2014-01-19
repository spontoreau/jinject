var Binding = require('../lib/binding');

var Dependency = {

};

exports.testBind = function(test){
    var expected = 'testName'
    var bind = new Binding();
    bind.bind(expected);

    var actual = bind.getName();
    test.equal(expected, actual);
    test.done();
};

exports.testBindFail = function(test){
    var bind = new Binding();
    test.throws(function(){
        bind.bind(new Object());
    }, Error);
    test.done();
};

exports.testSingletonScope = function(test){
    var expected = 'singleton';
    var bind = new Binding();
    bind.inSingletonScope();
    var actual = bind.getScope();
    test.equal(expected, actual);
    test.done();
};

exports.testTransientScope = function(test){
    var expected = 'transient';
    var bind = new Binding();
    bind.inTransientScope();
    var actual = bind.getScope();
    test.equal(expected, actual);
    test.done();
};

exports.testInstance = function(test){
    var bind = new Binding();
    bind.to(Dependency);

    bind.inSingletonScope();
    var singletonInstance = bind.getInstance();

    bind.inTransientScope();
    var transientInstance = bind.getInstance();

    test.ok(true, typeof singletonInstance == 'Dependency');
    test.ok(true, typeof transientInstance == 'Dependency');
    test.done();
};
