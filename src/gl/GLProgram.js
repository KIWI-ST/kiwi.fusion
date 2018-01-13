/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    stamp = require('./../utils/stamp');

const prefixProgram = 'PROGRAM',
    prefixAttribute = 'ATTRIBUTE';
/**
 * @class
 */
class GLProgram extends Dispose {
    /**
     * 
     * @param {GLContext} glContext 
     */
    constructor(glContext) {
        super(prefixProgram);
        /**
         * 索引glContext对象
         */
        this._glContext = glContext;
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
        this._attributes[name] = this._attributes[name] || stamp({},prefixAttribute);
        return this._attributes[name];
    }

}

module.exports = GLProgram;