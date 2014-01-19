var Kernel = require('../lib/kernel');

var ObjectWithProperty = {
    value : 'test'
};

var ObjectWithoutProperty = {

};

var Dependency = {
    test : 'test'
};

exports.resolveTest = function(test){
    var expected = 'test';
    var kernel = new Kernel();

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
    var kernel = new Kernel();

    kernel.bind('value').to(Dependency).createIfUnknow(true).inSingletonScope();

    var objWithout = Object.create(ObjectWithoutProperty);
    kernel.resolve(objWithout);
    var actual = objWithout.value.test;

    test.ok(true, typeof objWithout.value == 'Dependency');
    test.equal(expected, actual);
    test.done();
};
