/**
 * 命名空间导入
 */
const kiwi = require('./../src/init');


var vertexShaderSource = 'attribute vec4 a_position;' +
'uniform float color;'+
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
const gl = glCanvas.getContext('webgl');
//2
const glShader1 = gl.createShader(gl.VERTEX_SHADER);
const glShader2 = gl.createShader(gl.FRAGMENT_SHADER);
//3
gl.shaderSource(glShader1,vertexShaderSource);
gl.shaderSource(glShader2,fragmentShaderSource);
//4
gl.compileShader(glShader1);
gl.compileShader(glShader2);
//5
const glProgram = gl.createProgram();
gl.attachShader(glProgram,glShader1);
gl.attachShader(glProgram,glShader2);
gl.linkProgram(glProgram);
//6
const positionAttributeLocation = gl.getAttribLocation(glProgram,"a_position");
const positionBuffer = gl.createBuffer();
//7
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//
const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
//
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//
gl.viewport(0, 0, 800,600);
// gl.clearColor(0, 0, 0, 0);
// gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(glProgram);
//
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//
var size = 2;         
var type = gl.FLOAT;
var normalize = false; 
var stride = 0;       
var offset = 0;      
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
// draw
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);
//link
glCanvas.linkToWebGLRenderingContext(require('gl')(400,100));
