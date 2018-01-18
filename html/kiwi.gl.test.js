﻿/// <reference path="../dist/kiwi.gl.js" />
/**
 * 命名空间导入
 */
const glCanvas = new kiwi.gl.GLCanvas('mapCanvas');
const gl = glCanvas.getContext('webgl');


var vertCode = 'attribute vec2 coordinates;' +
'void main(void) {' +
'gl_PointSize = 20.0;' +
'gl_Position = vec4(coordinates, 0.0, 1.0);' +
'}';
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode = 'void main(void) {' +
'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
'}';
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
var vertexArray = [0.0, -0.5, 0.0, 0.5, 0.5, 0.0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, 300,300);
gl.drawArrays(gl.POINTS, 0, 3);

glCanvas.linkToCanvas(document.getElementById('mapCanvas'));