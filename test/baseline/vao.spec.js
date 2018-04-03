/** 
 * https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
*/
const assert = require('assert'),
    headless = require('gl'),
    common = require('./../common'),
    GLConstants = require('./../../src/gl/GLConstants'),
    kiwi = require('./../../src/init');

const glCavnas = new kiwi.gl.GLCanvas("mapCanvas");
/**
 * @type {WebGLRenderingContext}
 */
const gl = glCavnas.getContext('webgl');
const ext = gl.getExtension('OES_vertex_array_object');
const vao = ext.createVertexArrayOES();
ext.bindVertexArrayOES(vao);
/**
 * https://segmentfault.com/a/1190000012174165
 * https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
 * https://github.com/greggman/webgl2-fundamentals/blob/87438d6e185379e06c01e1f7f11fe78fee207f78/webgl/webgl-clipspace-rectangles.html
 */

const positions = new Float32Array([
    -0.5, -0.5, 0.0,0.0, -0.5, 0.0,0.0, 0.0, 0.0
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,0]),gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);




// describe('baseline test', () => {
//     it('#1.vertex array object', () => {
//         const glCavnas = new kiwi.gl.GLCanvas("mapCanvas");
//         const gl = glCavnas.getContext('webgl');
//         const ext = gl.getExtension('OES_vertex_array_object');


//     });
// });