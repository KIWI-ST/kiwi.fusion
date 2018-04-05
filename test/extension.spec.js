/** 
 * https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
*/
const assert = require('assert'),
    headless = require('gl'),
    common = require('./common/common'),
    GLConstants = require('./../src/gl/GLConstants'),
    kiwi = require('./../src/init');

describe('vao test', () => {
    it('#vao draw triangle', () => {
        /**
         * @type {GLCanvas}
         */
        const glCavnas = new kiwi.gl.GLCanvas("mapCanvas");
        /**
         * @type {WebGLRenderingContext}
         */
        const gl = glCavnas.getContext('webgl');

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
        /**
         * use vertex_array_object extension
         */
        const ext = gl.getExtension('OES_vertex_array_object');
        const vao = ext.createVertexArrayOES();
        ext.bindVertexArrayOES(vao);
        /**
         * https://segmentfault.com/a/1190000012174165
         * https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
         * https://github.com/greggman/webgl2-fundamentals/blob/87438d6e185379e06c01e1f7f11fe78fee207f78/webgl/webgl-clipspace-rectangles.html
         */
        const positions = new Float32Array([
            -0.5, -0.5, 0.0, 0.0, -0.5, 0.0, 0.0, 0.0, 0.0
        ]);
        //
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        //
        const colors = new Float32Array([
            1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0
        ]);
        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(1);
        ext.bindVertexArrayOES(null);
        gl.clear(gl.COLOR_BUFFER_BIT);
        ext.bindVertexArrayOES(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        //
        glCavnas.linkToWebGLRenderingContext(headless(400, 600));
    });
});
