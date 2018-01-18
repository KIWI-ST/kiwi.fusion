/// <reference path="../dist/kiwi.gl.js" />
/**
 * 命名空间导入
 */
var vertexShaderSource = 'attribute vec4 a_position;' +
'void main() {' +
'gl_Position = a_position;' +
'}';
var fragmentShaderSource = 'precision mediump float;' +
'void main() {' +
  'gl_FragColor = vec4(1, 0, 0.5, 1);' +
'}';
const htmlCavnasElementId = 'mapCanvas';
//1
const glCanvas = new kiwi.gl.GLCanvas(htmlCavnasElementId);
const glContext = glCanvas.getContext('webgl');
//2
const glShader1 = glContext.createShader(glContext.VERTEX_SHADER);
glContext.shaderSource(glShader1, vertexShaderSource);
glContext.compileShader(glShader1);
//3
const glShader2 = glContext.createShader(glContext.FRAGMENT_SHADER);
glContext.shaderSource(glShader2, fragmentShaderSource);
glContext.compileShader(glShader2);
//5
const glProgram = glContext.createProgram();
glContext.attachShader(glProgram, glShader1);
glContext.attachShader(glProgram, glShader2);
glContext.linkProgram(glProgram);
//6
const positionAttributeLocation = glContext.getAttribLocation(glProgram, "a_position");
const positionBuffer = glContext.createBuffer();
//7
glContext.bindBuffer(glContext.ARRAY_BUFFER, positionBuffer);
//
const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
//
glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(positions), glContext.STATIC_DRAW);
//
glContext.viewport(0, 0, 800, 600);
// gl.clearColor(0, 0, 0, 0);
// gl.clear(gl.COLOR_BUFFER_BIT);
glContext.useProgram(glProgram);
//
glContext.enableVertexAttribArray(positionAttributeLocation);
glContext.bindBuffer(glContext.ARRAY_BUFFER, positionBuffer);
//
var size = 2;
var type = glContext.FLOAT;
var normalize = false;
var stride = 0;
var offset = 0;
glContext.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
// draw
var primitiveType = glContext.TRIANGLES;
var offset = 0;
var count = 3;
glContext.drawArrays(primitiveType, offset, count);
//link
const canvas = document.getElementById('mapCanvas');
canvas.style.width = '800px';
canvas.style.height = '600px';
glCanvas.linkToCanvas(canvas);

window.requestAnimationFrame(function () {
    glContext.drawArrays(primitiveType, offset, count);
})