/**
 * 命名空间导入
 */
const kiwi = require('./../src/init');
const gl = require('gl')(400,100);
//webgl2 Fundamentals 测试
var vertexShaderSource = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;
 
var fragmentShaderSource = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;

const htmlCavnasElementId = 'mapCanvas';
//1
const glCanvas = new kiwi.gl.GLCanvas(htmlCavnasElementId);
const glContext = glCanvas.getContext('webgl');
//2
const glShader1 = glContext.createShader(glContext.VERTEX_SHADER);
const glShader2 = glContext.createShader(glContext.FRAGMENT_SHADER);
//3
glContext.shaderSource(glShader1,vertexShaderSource);
glContext.shaderSource(glShader2,fragmentShaderSource);
//4
glContext.compileShader(glShader1);
glContext.compileShader(glShader2);
//5
const glProgram = glContext.createProgram();
glContext.attachShader(glProgram,glShader1);
glContext.attachShader(glProgram,glShader2);
glContext.linkProgram(glProgram);
//6
const positionAttributeLocation = glContext.getAttribLocation(glProgram,"a_position");
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
glContext.viewport(0, 0, 800,600);
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
glCanvas.linkToWebGLRenderingContext(gl);
