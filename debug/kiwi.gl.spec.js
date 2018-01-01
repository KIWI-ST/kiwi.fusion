/**
 * 命名空间导入
 */
const kiwi = require('./../src/init');

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

const glCanvas = new kiwi.gl.GLCanvas(htmlCavnasElementId);

const glContext = glCanvas.getContext('webgl');

