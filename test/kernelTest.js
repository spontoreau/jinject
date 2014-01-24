var Kernel = require('../lib/kernel');

var ObjectWithProperty = {
    value : {}
};

var ObjectWithoutProperty = {

};

var Dependency = {
    test : 'test'
};

var FunctionDependency = function(){
    var self = this;
    self.test = 'test';
}

exports.resolveObjectTest = function(test){
    var expected = 'test';
    var kernel = require('../lib/kernel');

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

//TODO async unit test
/**exports.resolveObjectAsyncTest = function(test){
    var expected = 'test';
    var kernel = require('../lib/kernel');

    kernel.bind('value').to(Dependency).inSingletonScope();

    var objWith = Object.create(ObjectWithProperty);
    kernel.resolveAsync(objWith, function(){
        var actual = objWith.value.test;

        test.ok(true, typeof objWith.value == 'Dependency');
        test.equal(expected, actual);
    });
};**/

exports.resolveFunctionTest = function(test){
    var expected = 'test';
    var kernel = require('../lib/kernel');

    kernel.bind('value').to(FunctionDependency).inSingletonScope();

    var objWith = Object.create(ObjectWithProperty);
    kernel.resolve(objWith);
    var actual = objWith.value.test;

    var objWithout = Object.create(ObjectWithoutProperty);
    kernel.resolve(objWithout);

    test.ok(true, typeof objWith.value == 'FunctionDependency');
    test.equal(expected, actual);
    test.ok(true, objWithout.value == undefined);
    test.done();
};

exports.resolveWithCreateTest = function(test){
    var expected = 'test';
    var kernel = require('../lib/kernel');

    kernel.bind('value').to(Dependency).create(true).inTransientScope();

    var objWithout = Object.create(ObjectWithoutProperty);
    kernel.resolve(objWithout);
    var actual = objWithout.value.test;

    test.ok(true, typeof objWithout.value == 'Dependency');
    test.equal(expected, actual);
    test.done();
};

exports.resolveSingleton = function(test){
    var kernel = require('../lib/kernel');

    kernel.bind('value').to(Dependency).inSingletonScope();

    var obj1 = Object.create(ObjectWithProperty);
    var obj2 = Object.create(ObjectWithProperty);

    kernel.resolve(obj1);
    kernel.resolve(obj2);

    test.ok(true, obj1.value === obj2.value);
    test.done();
};

exports.resolveTransient = function(test){
    var kernel = require('../lib/kernel');

    kernel.bind('value').to(Dependency).inTransientScope();

    var obj1 = Object.create(ObjectWithProperty);
    var obj2 = Object.create(ObjectWithProperty);

    kernel.resolve(obj1);
    kernel.resolve(obj2);

    test.ok(true, obj1.value !== obj2.value);
    test.done();
};

exports.kernelCache = function(test){
    var kernel = require('../');

    kernel.bind('value').to(Dependency).inTransientScope();

    var kernel2 = require('../');

    //it's logic that require use cache, but it's just to confirm
    test.ok(true, kernel.bindings[0] === kernel2.bindings[0]);
    test.done();
};
