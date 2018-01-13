
/**
 * 具有返回对象的操作
 * -code 操作代码
 * -return 具有返回值的操作
 * -replace 需要使用新对象代替引用的操作
 */
const Encrypt_Object = {
    'createTexture': { code: 1, return: 1, replace: 0 },
    'createShader': { code: 2, return: 1, replace: 0 },
    'createProgram': { code: 3, return: 1, replace: 0 },
    'createBuffer': { code: 4, return: 1, replace: 0 },
    'createFramebuffer': { code: 5, return: 1, replace: 0 }
}
/**
 * 全局设置操作
 */
const Encrypt_OVERALL = {
    'enable': true,
    'disable': true,
    //
    'texParameterf': true,
    'texParameteri': true,
    'texImage2D': true,
    'texSubImage2D': true,
    //
    'blendFuncSeparate': true,
    'blendEquation': true,
    'blendFunc': true,
    'blendEquationSeparate': true,
    //
    'compressedTexImage2D': true,
    'compressedTexSubImage2D': true,
    'viewport': true,
    'scissor': true,
    //
    'depthFunc': true,
    'depthMask': true,
    'colorMask': true,
    'frontFace': true,
    'cullFace': true,
    //
    'pixelStorei': true,
    'generateMipmap': true,
    'activeTexture': true,
    //
    'stencilOp': true,
    'stencilFunc': true,
    'stencilMask': true,
    //
    'hint': true
}
/**
 * 无返回类型的操作
 */
const Encrypt_VOID = {
    'bindTexture': true,
    'bindBuffer': true,
    'bindFramebuffer': true,
    'bufferData': true,
    'bufferSubData': true,
    //
    'disableVertexAttribArray': true,
    'enableVertexAttribArray': true,
    //delete
    'deleteBuffer': true,
    'deleteShader': true,
    'deleteProgram': true,
    'deleteFramebuffer': true,
    'deleteRenderbuffer': true,
    'deleteTexture': true,
    //uniformMatrix[]fv
    'uniformMatrix2fv': true,
    'uniformMatrix3fv': true,
    'uniformMatrix4fv': true,
    //uniform1[f][i][v]
    'uniform1f': true,
    'uniform1fv': true,
    'uniform1i': true,
    'uniform1iv': true,
    //uniform2[f][i][v]
    'uniform2f': true,
    'uniform2fv': true,
    'uniform2i': true,
    'uniform2iv': true,
    //uniform3[f][i][v]
    'uniform3f': true,
    'uniform3fv': true,
    'uniform3i': true,
    'uniform3iv': true,
    //uniform4[f][i][v]
    'uniform4f': true,
    'uniform4fv': true,
    'uniform4i': true,
    'uniform4iv': true,
}
/**
 * 执行此类操作时，要将record丢入下一帧
 */
const Encrypt_TICK = {
    'drawElements': true,
    'drawArrays': true
}

module.exports = {
    Encrypt_OVERALL,
    Encrypt_VOID,
    Encrypt_TICK,
    Encrypt_Object
}