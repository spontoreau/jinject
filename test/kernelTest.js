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

exports.kernelCache = function(test){
    var kernel = require('../');

    kernel.bind('value').to(Dependency).inTransientScope();

    var kernel2 = require('../');

    //it's logic that require use cache, but it's just to confirm
    test.ok(true, kernel.bindings[0] === kernel2.bindings[0]);
    test.done();
};

exports.kernelBenchmark = function(test){

    var Dependency = {
        test : 'test'
    };

    var Dependency1 = {
        test : 'test1'
    };

    var Dependency2 = {
        test : 'test2'
    };

    var Dependency3 = {
        test : 'test3'
    };

    var Dependency4 = {
        test : 'test4'
    };

    var Dependency5 = {
        test : 'test5'
    };


    var Dependency6 = {
        test : 'test6'
    };

    var Dependency7 = {
        test : 'test7'
    };

    var Dependency8 = {
        test : 'test8'
    };

    var Dependency9 = {
        test : 'test9'
    };
    var SmallObject = {
        dependencyToInspect : {}
    };

    var LargeObject = {
        dependencyToInspect1 : {},
        dependencyToInspect2 : {},
        dependencyToInspect3 : {},
        dependencyToInspect4 : {},
        dependencyToInspect5 : {},
        dependencyToInspect6 : {},
        dependencyToInspect7 : {},
        dependencyToInspect8 : {},
        dependencyToInspect9 : {}
    };

    var kernel = Object.create(Kernel);
    kernel.bind('dependencyToInspect').to(Dependency).inTransientScope();
    kernel.bind('dependencyToInspect1').to(Dependency1).inTransientScope();
    kernel.bind('dependencyToInspect2').to(Dependency2).inTransientScope();
    kernel.bind('dependencyToInspect3').to(Dependency3).inTransientScope();
    kernel.bind('dependencyToInspect4').to(Dependency4).inTransientScope();
    kernel.bind('dependencyToInspect5').to(Dependency5).inTransientScope();
    kernel.bind('dependencyToInspect6').to(Dependency6).inTransientScope();
    kernel.bind('dependencyToInspect7').to(Dependency7).inTransientScope();
    kernel.bind('dependencyToInspect9').to(Dependency8).inTransientScope();
    kernel.bind('dependencyToInspect9').to(Dependency9).inTransientScope();

    var time1 = process.hrtime();

    var lastSmallObj;
    for(var i = 0; i < 5000; i++){
        var obj = Object.create(SmallObject);
        kernel.resolve(obj);
    }

    var diff1 = process.hrtime(time1);


    var time2 = process.hrtime();

    for(var i = 0; i < 5000; i++){
        var obj = Object.create(LargeObject);
        kernel.resolve(obj);
    }

    var diff2 = process.hrtime(time2);

    console.log('Resolve small object in : %d nanoseconds', diff1[0] * 1e9 + diff1[1]);
    console.log('Resolve large object in : %d nanoseconds', diff2[0] * 1e9 + diff2[1]);

    test.done();
};
