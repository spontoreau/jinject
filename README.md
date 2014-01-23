[![Build Status](https://travis-ci.org/Vtek/jinject.png?branch=master)](https://travis-ci.org/Vtek/jinject)  [![NPM version](https://badge.fury.io/js/jinject.png)](http://badge.fury.io/js/jinject)  [![Dependency Status](https://gemnasium.com/Vtek/jinject.png)](https://gemnasium.com/Vtek/jinject)
jinject
=======

jinject is an IoC container for [node](http://nodejs.org) which focus on resolve object dependencies.
The project is largely inspired by [Ninject](https://github.com/ninject/ninject).

**The project is actually consider as UNSTABLE !**



## Installation

  [![NPM](https://nodei.co/npm/jinject.png?mini=true)](https://nodei.co/npm/jinject/)


## Features

  * Focus on resolving object dependencies.
  * Fluent API for define dependency binding.
  * Scope capability (Transient, Singleton).
  * Capability to create not found properties in an object when resolve dependencies.
  * No package dependencies



## Getting start

Actually, the container can only resolve object dependencies (can't resolve function/constructor).
You must declare dependencies to inject as inline object :

```js
var Dependency = {
    myAttribute : 'Hello world'
};
```


To define binding use the fluent capability of the API :

```js
var ObjectToInspect = {
    aPropObjectToInspect : {};
};

var kernel = require('jinject');
kernel.bind('aPropObjectToInspect').to(Dependency).inSingletonScope();
kernel.resolve(ObjectToInspect);//or use Object.create(ObjectToInspect) if you want to deal with many instances of the type of object

console.log(obj.aPropObjectToInspect.myAttribute);//write Hello World in the console
```


By default jinject inject a dependency when the property to inspect is found. But you can dynamically create a not found property :

```js
var ObjectToInspect = {

};

var kernel = require('jinject');
kernel.bind('aPropObjectToInspect').to(Dependency).create(true).inSingletonScope();
kernel.resolve(ObjectToInspect);//or use Object.create(ObjectToInspect) if you want to deal with many instances of the type of object

console.log(obj.aPropObjectToInspect.myAttribute);//write Hello World in the console
```



## RoadMap

  * Improve performance
  * Async mode
  * Capability to resolve function dependencies
  * Bind validation of object depend on other object structure (interface/contract like)



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


