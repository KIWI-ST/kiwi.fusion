# kiwi.gl
[![Build Status](https://travis-ci.org/axmand/kiwi.gl.svg?branch=master)](https://travis-ci.org/axmand/kiwi.gl)
[![codecov](https://codecov.io/gh/axmand/kiwi.gl/branch/master/graph/badge.svg)](https://codecov.io/gh/axmand/kiwi.gl)
[![npm version](https://badge.fury.io/js/kiwi.gl.svg)](https://badge.fury.io/js/kiwi.gl)

>a virtual webgl running context which can mix thirdly webgl library gl commands togother,include three.js,qtek and so on

### Install ###
```javascript
npm install kiwi.gl 
```
or
```javascript
npm install kiwi.gl 
```
### Usage ###
```javascript
const glCanvas = new kiwi.gl.GLCanvas('canvasId');
```
```javascript
const gl = glCanvas.getContext('webgl');
```
>with native webgl.It doesn't change anything.
>use virtual glContext to create shader
```javascript
const shader = gl.createShader(gl.VERTEX_SHADER);
```
>use virtual glContext to create program
```javascript
const program = gl.createProgram();
```
>attach virtal program and shader
```javascript
gl.attachShader(program,shader);
```