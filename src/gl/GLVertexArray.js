/**
 * @author yellow date 2018/2/27
 */
const Dispose = require('./../utils/Dispose');

const prefix = 'VERTEXARRAYOBJRCT ';
/** 
 * @class
*/
class GLVertexArray extends Dispose {
    /**
     * 
     * @param {GLContext} glContext 
     */
    constructor(glContext) {
        super(prefix);
        this._glContext = glContext;
    }
}

module.exports = GLVertexArray;