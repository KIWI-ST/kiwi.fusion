/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    GLConstants= require('./GLConstants'),
    stamp = require('./../utils/stamp');

const prefixProgram = 'PROGRAM',
    prefixAttribute = 'ATTRIBUTE',
    prefixUniform = 'UNIFOMR';
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
     * @returns {Number}
     */
    get attachNum(){
        let num = 0;
        if(this._vs)
            num++;
        if(this._fs)
            num++;
        return num;
    }
    /**
     * @returns {Array}
     */
    get uniforms(){
        return this._uniformsInfo;
    }
    /**
     * @returns {Array}
     */
    get attributes(){
        return this._attributesInfo;
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
        this._vs.complie();
        this._fs.complie();
        this._uniformsInfo = [].concat(this._vs.uniforms).concat(this._fs.uniforms);
        this._attributesInfo = [].concat(this._vs.attributes).concat(this._fs.attributes);
    }
    /**
     * 
     * @param {GLenum} pname 
     */
    getAttribLocation(pname) {
        this._attributes[pname] = this._attributes[pname] || stamp({},prefixAttribute);
        return this._attributes[pname];
    }
    /**
     * 
     * @param {DOMString} pname 
     */
    getUnifromLocation(pname){
        if(this._uniforms[pname])
            return this._uniforms[pname];
        const uniformLocation = {};
        stamp(uniformLocation,prefixUniform);
        this._uniforms[pname] = this._uniforms[pname] || uniformLocation;
        return this._uniforms[pname];
    }

}

module.exports = GLProgram;