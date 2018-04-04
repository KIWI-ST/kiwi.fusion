/**
 * @author yellow
 */
const Dispose = require('./../utils/Dispose'),
    Record = require('./../core/Record'),
    Recorder = require('./../core/Recorder'),
    Encrypt = require('./../core/Encrypt'),
    GLVertexAttrib = require('./GLVertexAttrib'),
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
    GLVertexArray = require('./GLVertexArray'),
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
         * @type {GLProgram}
         */
        this._glProgram = null;
        /**
         * @type {WebGLRenderingContext}
         */
        this._gl = null;
        /**
         * map funciont
         */
        this._mapConst();
        /**
         * initial of Extension and Limits
         */
        this._initExtLmt();
    }
    /**
     * initial Extension and Limits
     */
    _initExtLmt() {
        /**
         * @type {GLLimits}
         */
        this._glLimits = new GLLimits(this);
        /**
         * @type {GLExtension}
         */
        this._glExtension = new GLExtension(this);
    }
    /**
     * map function and constants to Class
     */
    _mapConst() {
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
        actuator.apply(gl);
    }
    /**
     * get the version of webgl
     * @returns {String} 'webgl' or 'webgl2'
     */
    get renderType() {
        return this._renderType;
    }
    /**
     * get webglrendercontext
     * @returns {WebGLRenderingContext}
     */
    get gl() {
        return this._gl;
    }
    /**
     * get glcontext's recorder
     * @returns {Recorder}
     */
    get recorder() {
        return this._recorder;
    }
    /**
     * 
     * @param {GLenum} target 
     * @param {GLBuffer} buffer 
     */
    bindBuffer(target, buffer) {
        //store currently bound buffer
        if (target === GLConstants.ARRAY_BUFFER) {
            this._glProgram._currently_buffer = buffer;
        }
        const bufferId = buffer.id,
            record = new Record('bindBuffer', target, buffer);
        record.exactIndexByObject(1, bufferId);
        this._recorder.increase(record);
    }
    /**
     * 
     * @param {*} index 
     * @param {*} size 
     * @param {*} type 
     * @param {*} normalized 
     * @param {*} stride 
     * @param {*} offset 
     */
    vertexAttribPointer(index, size, type, normalized, stride, offset) {
        const glProgram = this._glProgram,
            glAttrib = new GLVertexAttrib({ size: size, index: index, type: type, stride: stride, offset: offset, normalized: normalized });
        glProgram.vertexAttribPointer(index, glAttrib);
        const record = new Record('vertexAttribPointer', index, size, type, normalized, stride, offset);
        this._recorder.increase(record);
    }
    /**
     * @param {GLuint} index 
     */
    enableVertexAttribArray(index){
        const glProgram = this._glProgram;
        glProgram.enableVertexAttribArray(index);
        const record = new Record('enableVertexAttribArray', index);
        this._recorder.increase(record);
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createShader
     * @param {String} type Either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER 
     */
    createShader(type) {
        const glShader = new GLShader(type, this),
            record = new Record('createShader', type);
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
     * @returns {GLProgram}
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
     * @returns {GLBuffer}
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
     * @returns {GLFramebuffer}
     */
    createFramebuffer() {
        const glFramebuffer = new GLFramebuffer(this),
            record = new Record('createFramebuffer');
        record.setReturnId(glFramebuffer.id);
        this._recorder.increase(record);
        return glFramebuffer;
    }
    /** 
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createRenderbuffer
     * @returns {GLRenderbuffer}
     */
    createRenderbuffer() {
        const glRenderbuffer = new GLRenderbuffer(this),
            record = new Record('createRenderbuffer');
        record.setReturnId(glRenderbuffer.id);
        this._recorder.increase(record);
        return glRenderbuffer;
    }
    /** 
     * needs ext 'OES_vertex_array_object' support
     * only avaiable in webgl2
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLVertexArrayObject
     * @returns {GL}
    */
    createVertexArray() {
        const glVao = new GLVertexArray(this),
            record = new Record('createVertexArray');
        record.setReturnId(glVao.id);
        this._recorder.increase(record);
        return glVao;
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/createTexture
     * @returns {GLTexture}
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
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getVertexAttrib
     * @param {GLuint} index 
     * @param {GLenum} pname 
     */
    getVertexAttrib(index, pname) {
        const glProgram = this._glProgram;
        if (pname === GLConstants.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING) {
            const gVertexAttrib = glProgram._buffer_array[index]
            return gVertexAttrib.buffer;
        }
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
     * @param {GLProgram} program 
     */
    useProgram(program) {
        const record = new Record('useProgram', program);
        record.exactIndexByValue(0, program.id);
        this._recorder.increase(record);
        //store current programId and program
        this._glProgram = program;
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
    /**
     * turning function
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
     */
    drawArrays(mode, first, count) {
        const record = new Record('drawArrays', mode, first, count),
            programId = this._glProgram.id;
        this._recorder.increase(record);
        actuator.play(this._recorder.toInstruction(programId));
    }
    /**
     * turning function
     * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
     */
    drawElements(mode, count, type, offset) {
        const record = new Record('drawElements', mode, count, type, offset),
            programId = this._glProgram.id;
        this._recorder.increase(record);
        actuator.play(this._recorder.toInstruction(programId));
    }
}

module.exports = GLContext;