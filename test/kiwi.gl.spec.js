/** 
 * https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
*/
const assert = require('assert'),
    headless = require('gl'),
    kiwi = require('./../src/init');

describe('baseline test', () => {
    it('#1.draw a triangle', () => {
        /**
        * enable debugger
        */
        kiwi.gl.Debug.Enable();
        var vertexShaderSource = 'attribute vec4 a_position;' +
            'void main() {' +
            'gl_Position = a_position;' +
            '}';
        var fragmentShaderSource = 'precision mediump float;' +
            'void main() {' +
            'gl_FragColor = vec4(1, 0, 0.5, 1);' +
            '}';
        const htmlCavnasElementId = 'mapCanvas';
        const glCanvas = new kiwi.gl.GLCanvas(htmlCavnasElementId);
        const gl = glCanvas.getContext('webgl');
        //
        const glShader1 = gl.createShader(gl.VERTEX_SHADER);
        const glShader2 = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(glShader1, vertexShaderSource);
        gl.shaderSource(glShader2, fragmentShaderSource);
        gl.compileShader(glShader1);
        gl.compileShader(glShader2);
        //
        const glProgram = gl.createProgram();
        gl.attachShader(glProgram, glShader1);
        gl.attachShader(glProgram, glShader2);
        gl.linkProgram(glProgram);
        //
        const positionAttributeLocation = gl.getAttribLocation(glProgram, "a_position");
        const positionBuffer = gl.createBuffer();
        //
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        //
        gl.viewport(0, 0, 800, 600);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
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
        glCanvas.linkToWebGLRenderingContext(headless(400, 400));
        const [...logger] = kiwi.gl.Debug.GetLogger();
        kiwi.gl.Debug.Disable();
        assert.equal(logger.join(','),"useProgram,createShader,createShader,shaderSource,shaderSource,compileShader,compileShader,createProgram,attachShader,attachShader,linkProgram,getAttribLocation,createBuffer,bindBuffer,bufferData,viewport,clearColor,clear,useProgram,enableVertexAttribArray,bindBuffer,vertexAttribPointer,drawArrays");
    });
});