/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    GLConstants= require('./GLConstants'),
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
        /**
         * @type {GLShader}
         */
        this._vs=null;
        /**
         * @type {GLShader}
         */
        this._fs=null;
    }
    /**
     * attach shader
     * @param {GLShader} shader 
     */
    attachShader(shader){
        if(shader.type === GLConstants.FRAGMENT_SHADER)
            this._fs = shader;
        else if(shader.type === GLConstants.VERTEX_SHADER)
            this._vs = shader;
    }
    /**
     * initial shader and analysis uniform/attribute
     */
    link(){
        
    }
    /**
     * 
     * @param {GLenum} pname 
     */
    getAttribLocation(pname) {
        this._attributes[pname] = this._attributes[pname] || stamp({},prefixAttribute);
        return this._attributes[pname];
    }

}

module.exports = GLProgram;