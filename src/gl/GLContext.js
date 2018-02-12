/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    Record = require('./../core/Record'),
    Recorder = require('./../core/Recorder'),
    Encrypt = require('./../core/Encrypt'),
    GLConstants = require('./GLConstants');
/**
 * bridge object
 */
const GLLimits = require('./GLLimits'),
    GLExtension = require('./GLExtension'),
    GLShader = require('./GLShader'),
    GLBuffer = require('./GLBuffer'),
    GLFramebuffer = require('./GLFramebuffer'),
    GLRenderbuffer = require('./GLRenderbuffer'),
    GLTexture = require('./GLTexture'),
    GLProgram = require('./GLProgram');
/**
 * singleton
 */
const actuator = require('./../core/Actuator');
/**
 * the prefix of GLContext
 */
const prefix = "WEBGLRENDERGINGCONTEXT";
/**
 * @class
 */
class GLContext extends Dispose {
    /**
     * 
     * @param {String} id parentId,just as the glCanvas'id
     * @param {String} renderType support 'webgl' or 'webgl2'
     * @param {Object} [options] 
     */
    constructor(id, renderType, options = {}) {
        super(prefix);
        /**
         * @type {String}
         */
        this._renderType = renderType;
        /**
         * @type {Object}
         */
        this._options = options;
        /**
         * @type {Recorder}
         */
        this._recorder = new Recorder(this);
        /**
         * @type {GLLimits}
         */
        this._glLimits = new GLLimits(this);
        /**
         * @type {GLExtension}
         */
        this._glExtension = new GLExtension(this);
        /**
         * @type {String}
         */
        this._programId = null;
        /**
         * real WebGLRenderingContext
         * @type {WebGLRenderingContext}
         */
        this._gl = null;
        /**
         * @type {Array}
         */
        this._clear = [];
        /**
         * map funciont
         */
        this._map();
    }
    /**
     * map function and constants to Class
     */
    _map() {
        const recorder = this._recorder;
        //1.map constants
        for (const key in GLConstants) {
            if (!this.hasOwnProperty(key)) {
                const target = GLConstants[key];
                if (!this[key])
                    this[key] = target;
            }
        }
        //2.map void function(include replace and no replace)
        for (const key in Encrypt) {
            if (!this.hasOwnProperty(key)) {
                const target = Encrypt[key];
                //2.1 void and no replace
                if (!target.return && target.replace === 0) {
                    if (!this[key] && !!target) {
                        this[key] = (...rest) => {
                            const record = new Record(key, ...rest);
                            recorder.increase(record);
                        }
                    }
                }
                //2.2 void and replace 
                else if (!target.return && target.replace > 0) {
                    if (!this[key] && !!target) {
                        this[key] = (...rest) => {
                            const record = new Record(key, ...rest),
                                index = target.ptIndex;
                            record.exactIndexByObject(index);
                            recorder.increase(record);
                        }
                    }
                }
                //2.3 return(make birdge to origin,should not to be implemented)
            }
        }
    }
    /*
     * private ,only used in GLCanvas.link[Cnavas/GL] funcitons
     * @param {WebGLRenderingContext} gl 
     */
    _setgl(gl) {
        this._gl = gl;
        this._glLimits._include();
        this._glExtension._include();
        //替换绘制实体
        actuator.setGl(gl);
    }
    /**
     * @returns {String} 'webgl' or 'webgl2'
     */
    get renderType() {
        return this._renderType;
    }
    /**
     * 
     * @returns {WebGLRenderingContext}
     */
    get gl() {
        return this._gl;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
     * @param {String} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER 
     */
    createShader(type) {
        const glShader = new GLShader(type, this),
            record = new Record('createShader', type);
        //createShader 操作必需返回值
        record.setReturnId(glShader.id);
        this._recorder.increase(record);
        return glShader;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/shaderSource
     * @param {GLShader} shader 
     * @param {String} source 
     */
    shaderSource(shader, source) {
        shader.source = source;
        const returnId = shader.id,
            record = new Record('shaderSource', shader, source);
        record.exactIndexByValue(0, returnId);
        this._recorder.increase(record);
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compileShader
     * @param {GLShader} shader 
     */
    compileShader(shader) {
        const returnId = shader.id,
            record = new Record('compileShader', shader);
        record.exactIndexByValue(0, returnId);
        shader._isComplied = true;
        this._recorder.increase(record);
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
     * 创建program对象
     */
    createProgram() {
        const glProgram = new GLProgram(this),
            record = new Record('createProgram');
        record.setReturnId(glProgram.id);
        this._recorder.increase(record);
        return glProgram;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createProgram
     */
    createBuffer() {
        const glBuffer = new GLBuffer(this),
            record = new Record('createBuffer');
        record.setReturnId(glBuffer.id);
        this._recorder.increase(record);
        return glBuffer;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createFramebuffer
     */
    createFramebuffer() {
        const glFramebuffer = new GLFramebuffer(this),
            record = new Record('createFramebuffer');
        record.setReturnId(glFramebuffer.id);
        this._recorder.increase(record);
        return glFramebuffer;
    }
    createRenderbuffer() {
        const glRenderbuffer = new GLRenderbuffer(this),
            record = new Record('createRenderbuffer');
        record.setReturnId(glRenderbuffer.id);
        this._recorder.increase(record);
        return glRenderbuffer;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
     */
    createTexture() {
        const glTexture = new GLTexture(this),
            record = new Record('createTexture');
        record.setReturnId(glTexture.id);
        this._recorder.increase(record);
        return glTexture;
    }
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/attachShader
     * @param {GLProgram} program 
     * @param {GLShader} shader 
     */
    attachShader(program, shader) {
        const record = new Record('attachShader', program, shader);
        record.exactIndexByValue(0, program.id);
        record.exactIndexByValue(1, shader.id);
        this._recorder.increase(record);
        //
        program.attachShader(shader);
    }
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/linkProgram
     * @param {GLProgram} program 
     */
    linkProgram(program) {
        const record = new Record('linkProgram', program);
        record.exactIndexByValue(0, program.id);
        this._recorder.increase(record);
        program.link();
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
     * @modify yellow date 2018/2/3 direction return 
     * 
     * @param {GLProgram} program 
     * @param {String} name 
     */
    getAttribLocation(program, name) {
        const returnId = program.getAttribLocation(name),
            record = new Record('getAttribLocation', program, name);
        record.exactIndexByValue(0, program.id);
        record.setReturnId(returnId, false);
        this._recorder.increase(record);
        return returnId;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getUniformLocation
     * @param {GLProgram} program 
     * @param {DOMString} name 
     */
    getUniformLocation(program, name) {
        const returnId = program.getUnifromLocation(name),
            record = new Record('getUniformLocation', program, name);
        record.exactIndexByValue(0, program.id);
        record.setReturnId(returnId);
        this._recorder.increase(record);
        return returnId;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderParameter
     * @param {GLShader} shader 
     * @param {GLenum} pname 
     */
    getShaderParameter(shader, pname) {
        return shader.getParameters(pname);
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog
     * @param {GLShader} shader 
     */
    getShaderInfoLog(shader) {
        return '';
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramInfoLog
     * @param {GLProgram} program 
     */
    getProgramInfoLog(program) {
        return '';
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveAttrib
     * @param {GLProgram} program 
     * @param {GLuint} index 
     */
    getActiveAttrib(program, index) {
        return program.attributes[index];
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getActiveUniform
     * @param {GLProgram} program 
     * @param {GLuint} index 
     */
    getActiveUniform(program, index) {
        return program.uniforms[index];
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getProgramParameter
     * @type {GLProgram} program
     * @type {GLenum} pname
     */
    getProgramParameter(program, pname) {
        if (pname === GLConstants.ACTIVE_UNIFORMS) {
            return program.uniforms.length;
        } else if (pname === GLConstants.ACTIVE_ATTRIBUTES) {
            return program.attributes.length;
        } else if (pname === GLConstants.ATTACHED_SHADERS) {
            return program.attachNum;
        } else if (pname === GLConstants.LINK_STATUS) {
            return true;
        } else if (pname === GLConstants.DELETE_STATUS) {
            return true;
        }
    }
    /**
     * 
     * @param {GLProgram} program 
     */
    useProgram(program) {
        const programId = program.id;
        const record = new Record('useProgram', program);
        record.exactIndexByValue(0, programId);
        this._recorder.increase(record);
        this._programId = programId;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getExtension
     * @param {String} name 
     */
    getExtension(name) {
        const glExtension = this._glExtension;
        return glExtension[name];
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
     * @param {String} pname 
     */
    getParameter(pname) {
        //parameter search from limits
        const glLimits = this._glLimits;
        return glLimits[pname];
    }
    /**
     * 特别的方法
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
     * @param {*} mode 
     * @param {*} first 
     * @param {*} count 
     */
    drawArrays(mode, first, count) {
        const record = new Record('drawArrays', mode, first, count),
            programId = this._programId;
        this._recorder.increase(record);
        actuator.play(this._recorder.toInstruction(programId));
    }
    /**
     * 特别的方法
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
     * @param {*} mode 
     * @param {*} count 
     * @param {*} type 
     * @param {*} offset 
     */
    drawElements(mode, count, type, offset) {
        const record = new Record('drawElements', mode, count, type, offset),
            programId = this._programId;
        this._recorder.increase(record);
        actuator.play(this._recorder.toInstruction(programId));
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear
     */
    clear(mask) {
        //}{hack igonre 'screen clearing operations'
        //1.GLConstants.COLOR_BUFFER_BIT|GLConstants.DEPTH_BUFFER_BIT|GLConstants.STENCIL_BUFFER_BIT  = 17664
        //2.mask alpah !== 0
        if (mask !== 17664) {
            const record = new Record('clear', mask);
            this._recorder.increase(record);
        }
    }

}

module.exports = GLContext;