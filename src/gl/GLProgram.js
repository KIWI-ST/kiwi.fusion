/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose');
/**
 * get new index for glProgram attribute index
 * @function
 */
const seed = function () {
    let sd = 1;
    return function () {
        return (sd++) * 256;
    }
}();
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
         * 种子id
         */
        this._seed = seed();
        /**
         * 映射attribute 和返回值
         */
        this._attributes = {};
        this._uniforms = {};
    }

    getAttribLocation(name) {
        this._attributes[name] = this._attributes[name] || this._seed++;
        return this._attributes[name];
    }

}

module.exports = GLProgram;