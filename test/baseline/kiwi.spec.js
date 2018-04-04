/** 
 * https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
*/
/**
 * @type {WebGLRenderingContext}
 */
const common = require('./../common'),
    kiwi = require('./../../src/init');
const glCanvas = new kiwi.gl.GLCanvas('mapCanvas'),
    gl = glCanvas.getContext('webgl');

const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, common.base_vs);
gl.compileShader(vs);

const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, common.base_fs);
gl.compileShader(fs);

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

gl.useProgram(program);

const positions = new Float32Array([
    -0.5, -0.5, 0.0, 0.0, -0.5, 0.0, 0.0, 0.0, 0.0
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0]), gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);




const colors = new Float32Array([
    1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0
]);
var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(1);

const sss = gl.getVertexAttrib(0, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);

const sss1 = gl.getVertexAttrib(1, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING);

const sss3 = 0;