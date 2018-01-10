/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose');

const prefix = 'PROGRAM';

/**
 * @class
 */
class GLProgram extends Dispose {
    /**
     * 
     * @param {GLContext} glContext 
     */
    constructor(glContext) {
        super(glContext.id);
        /**
         * 映射attribute 和返回值
         */
        this._attributes = {};
        /**
         * 映射uniforms
         */
        this._uniforms = {};
    }

    getAttribLocation(name) {
        this._attributes[name] = this._attributes[name] || this._seed++;
        return this._attributes[name];
    }

}

module.exports = GLProgram;