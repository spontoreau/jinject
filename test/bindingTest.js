var Binding = require('../lib/binding');

var Dependency = {
    text : 'test'
};

exports.testBind = function(test){
    var expected = 'testName'
    var bind = Object.create(Binding);
    bind.bind(expected);

    var actual = bind.getName();
    test.equal(expected, actual);
    test.done();
};

exports.testBindFail = function(test){
    var bind = Object.create(Binding);
    test.throws(function(){
        bind.bind(new Object());
    }, Error);
    test.done();
};

exports.testValidate = function(test){
    var bind = Object.create(Binding);

    //test1 binding haven't dependency it's false.
    test.equals(false, bind.isValid());

    //test2 binding haven't contract but a dependency
    bind.to(Dependency);
    test.equals(true, bind.isValid());

    //test3 binding has contract and it's invalid
    var InvalidContract = {
        text : 'number'
    };

    bind.validate(InvalidContract);
    test.equals(false, bind.isValid());

    //test4 binding has contract and it's valid
    var ValidContract = {
        text : 'string'
    };

    bind.validate(ValidContract);
    test.equals(true, bind.isValid());

    test.done();
};

exports.testSingletonScope = function(test){
    var expected = 'singleton';
    var bind = Object.create(Binding);
    bind.inSingletonScope();
    var actual = bind.getScope();
    test.equal(expected, actual);
    test.done();
};

exports.testTransientScope = function(test){
    var expected = 'transient';
    var bind = Object.create(Binding);
    bind.inTransientScope();
    var actual = bind.getScope();
    test.equal(expected, actual);
    test.done();
};

exports.testInstance = function(test){
    var bind = Object.create(Binding);
    bind.to(Dependency);

    bind.inSingletonScope();
    var singletonInstance = bind.getInstance();

    bind.inTransientScope();
    var transientInstance = bind.getInstance();

    test.ok(true, typeof singletonInstance == 'Dependency');
    test.ok(true, typeof transientInstance == 'Dependency');
    test.done();
};
