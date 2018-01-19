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
```javascript
const shader = gl.createShader(gl.VERTEX_SHADER);
const program = gl.createProgram();
gl.attachShader(program,shader);
```