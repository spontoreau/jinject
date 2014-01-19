var Kernel = require('../lib/kernel');

var ObjectWithProperty = {
    value : {}
};

var ObjectWithoutProperty = {

};

var Dependency = {
    test : 'test'
};

exports.resolveTest = function(test){
    var expected = 'test';
    var kernel = Object.create(Kernel);

    kernel.bind('value').to(Dependency).inSingletonScope();

    var objWith = Object.create(ObjectWithProperty);
    kernel.resolve(objWith);
    var actual = objWith.value.test;

    var objWithout = Object.create(ObjectWithoutProperty);
    kernel.resolve(objWithout);

    test.ok(true, typeof objWith.value == 'Dependency');
    test.equal(expected, actual);
    test.ok(true, objWithout.value == undefined);
    test.done();
};

exports.resolveWithCreateTest = function(test){
    var expected = 'test';
    var kernel = Object.create(Kernel);

    kernel.bind('value').to(Dependency).createIfUnknow(true).inTransientScope();

    var objWithout = Object.create(ObjectWithoutProperty);
    kernel.resolve(objWithout);
    var actual = objWithout.value.test;

    test.ok(true, typeof objWithout.value == 'Dependency');
    test.equal(expected, actual);
    test.done();
};

exports.resolveSingleton = function(test){
    var kernel = Object.create(Kernel);

    kernel.bind('value').to(Dependency).inSingletonScope();

    var obj1 = Object.create(ObjectWithProperty);
    var obj2 = Object.create(ObjectWithProperty);

    kernel.resolve(obj1);
    kernel.resolve(obj2);

    test.ok(true, obj1.value === obj2.value);
    test.done();
};

exports.resolveTransient = function(test){
    var kernel = Object.create(Kernel);

    kernel.bind('value').to(Dependency).inTransientScope();

    var obj1 = Object.create(ObjectWithProperty);
    var obj2 = Object.create(ObjectWithProperty);

    kernel.resolve(obj1);
    kernel.resolve(obj2);

    test.ok(true, obj1.value !== obj2.value);
    test.done();
};
