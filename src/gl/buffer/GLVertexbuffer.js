/**
 * @class
 */
const GLBuffer = require('./../GLBuffer');

class GLVertexbuffer extends GLBuffer {
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} data 
     * @param {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW} drawType 
     */
    constructor(gl, data, drawType) {
        super(gl, GLConstants.ARRAY_BUFFER, data, drawType);
    }
}

module.exports = GLVertexbuffer;