var Kernel = require('../lib/kernel');

exports.benchmark = function(test){

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