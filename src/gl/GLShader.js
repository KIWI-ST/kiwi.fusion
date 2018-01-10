/**
 * birgde to attach shader
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    GLConstants = require('./GLConstants');

const prefix = 'SHADER';

/**
 * @class
 */
class GLShader extends Dispose{

    /**
     * 
     * @param {String} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
     * @param {GLContext} glContext 
     */
    constructor(type, glContext) {
        super(glContext.id);
        /**
         * @type {String}
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
    }

    set source(v){
        this._source = v;
    }

    get source(){
        return this._source;
    }

}

module.exports = GLShader;