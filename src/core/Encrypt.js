
/**
 * reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
 * 
 * 具有返回对象的操作
 * -code 操作代码
 * -return 具有返回值的操作
 * -replace 需要使用新对象代替引用的操作
 * -ptIndex 替换参数的位置索引
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
    'drawingBufferWidth': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferHeight
     * @property
     */
    'drawingBufferHeight': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
     */
    'getContextAttributes': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isContextLost
     */
    'isContextLost': { code: 0, return: 1, replace: 0 },
    //-----------------------Viewing and clipping-----------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/scissor
     */
    'scissor': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
     */
    'viewport': { code: 0, return: 0, replace: 0 },
    //-----------------------State information--------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture
     */
    'activeTexture': { code: 0, return: 0, replace: 1, ptIndex: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor
     */
    'blendColor': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation
     */
    'blendEquation': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquationSeparate
     */
    'blendEquationSeparate': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc
     */
    'blendFunc': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate
     */
    'blendFuncSeparate': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
     */
    'clearColor': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearDepth
     */
    'clearDepth': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearStencil
     */
    'clearStencil': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/colorMask
     */
    'colorMask': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/cullFace
     */
    'cullFace': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthFunc
     */
    'depthFunc': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthMask
     */
    'depthMask': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthRange
     */
    'depthRange': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/disable
     */
    'disable': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/enable
     */
    'enable': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/frontFace
     */
    'frontFace': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
     * @description 
     * warning return appropriate value by the parameter 'pname'
     */
    'getParameter': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
     */
    'getError': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/hint
     */
    'hint': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isEnabled
     */
    'isEnabled': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/lineWidth
     */
    'lineWidth': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
     */
    'pixelStorei': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/polygonOffset
     */
    'polygonOffset': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/sampleCoverage
     */
    'sampleCoverage': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc
     */
    'stencilFunc': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFuncSeparate
     */
    'stencilFuncSeparate': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMask
     */
    'stencilMask': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMaskSeparate
     */
    'stencilMaskSeparate': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOp
     */
    'stencilOp': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOpSeparate
     */
    'stencilOpSeparate': { code: 0, return: 0, replace: 0 },
    //-----------------------Buffers------------------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer
     */
    'bindBuffer': { code: 0, return: 0, replace: 1, ptIndex: 1 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
     */
    'bufferData': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
     */
    'bufferSubData': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createBuffer
     */
    'createBuffer': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteBuffer
     */
    'deleteBuffer': { code: 0, return: 0, replace: 1, ptIndex: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getBufferParameter
     */
    'getBufferParameter': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isBuffer
     */
    'isBuffer': { code: 0, return: 1, replace: 0 },
    //-----------------------Framebuffers-------------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindFramebuffer
     */
    'bindFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: 1 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/checkFramebufferStatus
     */
    'checkFramebufferStatus': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createFramebuffer
     */
    'createFramebuffer': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteFramebuffer
     */
    'deleteFramebuffer': { code: 0, return: 0, replace: 1, ptIndex: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferRenderbuffer
     */
    'framebufferRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: 3 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/framebufferTexture2D
     */
    'framebufferTexture2D': { code: 0, return: 0, replace: 1, ptIndex: 3 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getFramebufferAttachmentParameter
     */
    'getFramebufferAttachmentParameter': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isFramebuffer
     */
    'isFramebuffer': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
     */
    'readPixels': { code: 0, return: 0, replace: 0 },
    //-----------------------Renderbuffers------------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindRenderbuffer
     */
    'bindRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: 1 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createRenderbuffer
     */
    'createRenderbuffer': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteRenderbuffer
     */
    'deleteRenderbuffer': { code: 0, return: 0, replace: 1, ptIndex: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getRenderbufferParameter
     */
    'getRenderbufferParameter': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isRenderbuffer
     */
    'isRenderbuffer': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/renderbufferStorage
     */
    'renderbufferStorage': { code: 0, return: 0, replace: 0 },
    //-----------------------Textures-----------------------------------------------
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bindTexture
     */
    'bindTexture': { code: 0, return: 0, replace: 1, ptIndex: 1 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D
     */
    'compressedTexImage2D': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexImage2D
     */
    'copyTexImage2D': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/copyTexSubImage2D
     */
    'copyTexSubImage2D': { code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
     */
    'createTexture': { code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/deleteTexture
     */
    'deleteTexture': { code: 0, return: 0, replace: 1, ptIndex: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/generateMipmap
     */
    'generateMipmap':{ code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getTexParameter
     */
    'getTexParameter':{ code: 0, return: 1, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/isTexture
     */
    'isTexture':{code: 0, return: 1, replace: 1,ptIndex:0},
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
     */
    'texImage2D':{ code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D
     */
    'texSubImage2D':{ code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
     */
    'texParameterf':{ code: 0, return: 0, replace: 0 },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
     */
    'texParameteri':{ code: 0, return: 0, replace: 0 },
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