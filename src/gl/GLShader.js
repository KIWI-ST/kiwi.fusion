/**
 * birgde to attach shader
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    GLConstants = require('./GLConstants');
/**
 * the prefix of Shader type
 */
const prefix = 'SHADER';
/**
 * @class
 */
class GLShader extends Dispose{
    /**
     * 
     * @param {GLenum} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param {GLContext} glContext 
     */
    constructor(type, glContext) {
        super(prefix);
        /**
         * @type {GLenum}
         */
        this._type = type;
        /**
         * @type {GLContext}
         */
        this._glContext = glContext;
        /**
         * @type {String} shaderSource 
         */
        this._source=null;
        /**
         * @type {boolean}
         */
        this._isDelete = false;
        /**
         * @type {boolean}
         */
        this._isComplied = false;
    }
    /**
     * @returns {GLenum}
     */
    get type(){
        return this._type;
    }
    /**
     * @type {String}
     */
    set source(v){
        this._source = v;
    }
    /**
     * @returns {String}
     */
    get source(){
        return this._source;
    }
    /**
     * bridge to shader
     * @param {GLenum} pname 
     */
    getParameters(pname){
        if(pname === GLConstants.DELETE_STATUS)
            return this._isDelete;
        else if(pname === GLConstants.COMPILE_STATUS)
            return this._isComplied;
        else if(pname === GLConstants.SHADER_TYPE)
            return this._type;
    }
    /**
     * reference:
     * https://github.com/WebKit/webkit/blob/4c0ce4f62b30a6d39140ac9841c416dee3bd07e0/Source/ThirdParty/ANGLE/util/shader_utils.cpp
     * }{yellow 寻找power vr sdk下 opengl es的实现
     * use regex pattern to analy active attri/uniforms
     */
    complie(){
        const source = this._source;
        //}{debug analysis source to get acitved Uniforms/attributes
    }

    get activeUniforms(){

    }

    get activeAttributes(){

    }

}

module.exports = GLShader;