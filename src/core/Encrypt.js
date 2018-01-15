
/**
 * reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
 * 
 * 具有返回对象的操作
 * -code 操作代码
 * -return 具有返回值的操作
 * -replace 需要使用新对象代替引用的操作
 */
const Encrypt_Object = {
    //-----------------------The WebGL context--------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/canvas
     * @property
     */
    'canvas': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/commit
     */
    'commit': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferWidth
     * @property
     */
    'drawingBufferWidth':{code: 0, return: 1, replace: 0},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferHeight
     * @property
     */
    'drawingBufferHeight':{code: 0, return: 1, replace: 0},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
     */
    'getContextAttributes':{code: 0, return: 1, replace: 0},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost
     */
    'isContextLost':{code: 0, return: 1, replace: 0},
    //-----------------------Viewing and clipping-----------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
     */
    'scissor':{code: 0, return: 0, replace: 0},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
     */
    'viewport':{code: 0, return: 0, replace: 0},
    //-----------------------State information--------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture
     */
    'activeTexture':{code: 0, return: 0, replace: 1},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor
     */
    'blendColor':{code: 0, return: 0, replace: 1},
    //-----------------------Buffers------------------------------------------------
    //-----------------------Framebuffers-------------------------------------------
    //-----------------------Renderbuffers------------------------------------------
    //-----------------------Textures-----------------------------------------------
    //-----------------------Programs and shaders-----------------------------------
    //-----------------------Uniforms and attributes--------------------------------
    //-----------------------Drawing buffers----------------------------------------
    //-----------------------Working with extensions--------------------------------
    'createTexture': { code: 0, return: 1, replace: 0 },
    'createShader': { code: 0, return: 1, replace: 0 },
    'createProgram': { code: 0, return: 1, replace: 0 },
    'createBuffer': { code: 0, return: 1, replace: 0 },
    'createFramebuffer': { code: 0, return: 1, replace: 0 },
    //void
    'enable': { code: 0, return: 0, replace: 0 },
    'disable': { code: 0, return: 0, replace: 0 },
    'texParameterf': { code: 0, return: 1, replace: 0 },
    'texParameteri': { code: 0, return: 1, replace: 0 },
    'texImage2D': { code: 0, return: 1, replace: 0 },
    'texSubImage2D': { code: 0, return: 1, replace: 0 },
    'blendFuncSeparate': { code: 0, return: 1, replace: 0 },
    'blendEquation': { code: 0, return: 0, replace: 0 },
    'blendFunc': { code: 0, return: 0, replace: 0 },
    'blendEquationSeparate': { code: 0, return: 0, replace: 0 },
    'compressedTexImage2D': { code: 0, return: 0, replace: 0 },
    'compressedTexSubImage2D': { code: 0, return: 0, replace: 0 },
    'viewport': { code: 0, return: 0, replace: 0 },
    'scissor': { code: 0, return: 0, replace: 0 },
    'depthFunc': { code: 0, return: 0, replace: 0 },
    'depthMask': { code: 0, return: 0, replace: 0 },
    'colorMask': { code: 0, return: 0, replace: 0 },
    'frontFace': { code: 0, return: 0, replace: 0 },
    'cullFace': { code: 0, return: 0, replace: 0 },
    'pixelStorei': { code: 0, return: 0, replace: 0 },
    'generateMipmap': { code: 0, return: 0, replace: 0 },
    'activeTexture': { code: 0, return: 0, replace: 0 },
    'stencilOp': { code: 0, return: 0, replace: 0 },
    'stencilFunc': { code: 0, return: 0, replace: 0 },
    'stencilMask': { code: 0, return: 0, replace: 0 },
    'hint': { code: 0, return: 0, replace: 0 },
    'bindTexture': { code: 0, return: 0, replace: 0 },
    'bindBuffer': { code: 0, return: 0, replace: 0 },
    'bindFramebuffer': { code: 0, return: 0, replace: 0 },
    'bufferData': { code: 0, return: 0, replace: 0 },
    'bufferSubData': { code: 0, return: 0, replace: 0 },
    'disableVertexAttribArray': { code: 0, return: 0, replace: 0 },
    'enableVertexAttribArray': { code: 0, return: 0, replace: 0 },
    'deleteBuffer': { code: 0, return: 0, replace: 0 },
    'deleteShader': { code: 0, return: 0, replace: 0 },
    'deleteProgram': { code: 0, return: 0, replace: 0 },
    'deleteFramebuffer': { code: 0, return: 0, replace: 0 },
    'deleteRenderbuffer': { code: 0, return: 0, replace: 0 },
    'deleteTexture': { code: 0, return: 0, replace: 0 },
    'uniformMatrix2fv': { code: 0, return: 0, replace: 0 },
    'uniformMatrix3fv': { code: 0, return: 0, replace: 0 },
    'uniformMatrix4fv': { code: 0, return: 0, replace: 0 },
    'uniform1f': { code: 0, return: 0, replace: 0 },
    'uniform1fv': { code: 0, return: 0, replace: 0 },
    'uniform1i': { code: 0, return: 0, replace: 0 },
    'uniform1iv': { code: 0, return: 0, replace: 0 },
    'uniform2f': { code: 0, return: 0, replace: 0 },
    'uniform2fv': { code: 0, return: 0, replace: 0 },
    'uniform2i': { code: 0, return: 0, replace: 0 },
    'uniform2iv': { code: 0, return: 0, replace: 0 },
    'uniform3f': { code: 0, return: 0, replace: 0 },
    'uniform3fv': { code: 0, return: 0, replace: 0 },
    'uniform3i': { code: 0, return: 0, replace: 0 },
    'uniform3iv': { code: 0, return: 0, replace: 0 },
    'uniform4f': { code: 0, return: 0, replace: 0 },
    'uniform4fv': { code: 0, return: 0, replace: 0 },
    'uniform4i': { code: 0, return: 0, replace: 0 },
    'uniform4iv': { code: 0, return: 0, replace: 0 },
    //
    'drawElements': { code: 0, return: 0, replace: 0 },
    'drawArrays': { code: 0, return: 0, replace: 0 }
}

module.exports = Encrypt_Object;