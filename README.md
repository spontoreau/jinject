jinject
=======

jinject is an IoC container which focus on resolve object dependencies.
The project is largely inspired by [Ninject](https://github.com/ninject/ninject).

**The project is actually consider as UNSTABLE !**



## Installation

    $ npm install jinject



## Features

    - Focus on resolving object dependencies.
    - Fluent API for define dependency binding.
    - Scope capability (Transient, Singleton).
    - Capability to create not found properties in an object.



## Getting start

Actual, the container can only resolve object dependency.
You must declare dependencies to inject as an inline object :

```js
var Dependency = {
    myAttribute : 'Hello world'
};
```

To define binding use the fluent capability of IoC container :

```js
var ObjectToInspect = function(){
    var self = this;
    self.aPropObjectToInspect;
};

var Kernel = require('jinject');

var kernel = new Kernel();
kernel.bind('aPropObjectToInspect').to(Dependency).inSingletonScope();

var obj = new MyObjectWithThePropToInspect();
kernel.resolve(obj);

console.log(obj.aPropObjectToInspect.myAttribute);//write Hello World in the console
```

By default jinject inject a dependency when the property to inspect is found. But you can dynamically create a not found property :

```js
var ObjectToInspect = function(){
    var self = this;
};

var Kernel = require('jinject');

var kernel = new Kernel();
kernel.bind('aPropObjectToInspect').to(Dependency).createIfUnknow(true).inSingletonScope();

var obj = new MyObjectWithThePropToInspect();
kernel.resolve(obj);

console.log(obj.aPropObjectToInspect.myAttribute);//write Hello World in the console
```



## RoadMap

    - Improve performance
    - Async mode
    - Capability to resolve object ctor with param
    - Capability to resolve function dependencies



## Licence

The MIT License (MIT)

Copyright (c) 2014 Sylvain PONTOREAU (pontoreau.sylvain@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


