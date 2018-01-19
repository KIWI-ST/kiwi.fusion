/**
 * 虚拟htmlCanvas对象，用于记录webgl在htmlCanvas时的过程
 * @author yellow date 2018/1/1
 */
const Dispose = require('./../utils/Dispose'),
    mergre = require('./../utils/merge'),
    GLContext = require('./GLContext');
/**
 * 
 */
const stamp = require('./../utils/stamp');
/**
 * store glContext cache
 */
const CACHE_GLCONTEXT = {};
/**
 * store WebGLRenderingContext
 */
const CACHE_GL = {};
/**
 * the prefix of GLCanvas
 */
const prefix = 'CANVASELEMENT';
/**
 * @class
 */
class GLCanvas extends Dispose {
    /**
     * 
     * @param {String} id the real htmlCanvasElement id 
     * @param {Object} options 
     */
    constructor(id, options = {}) {
        super(prefix);
        /**
         * @type {String}
         */
        this._canvasId = id;
        /**
         * @type {Object}
         */
        this._options = mergre({}, options);
        /**
         * 
         */
        this._glType = 'webgl';
        /**
         * store the 'getContext' options
         * @type {Object}
         */
        this._contextOptions = {};
        /**
         * real html canvas element
         * @type {HtmlCanvasElement}
         */
        this._canvas = null;
    }
    /**
     * get context attributes
     * include webgl2 attributes
     * reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     * @param {Object} [options] 
     */
    _getContextAttributes(options = {}) {
        return {
            alpha: options.alpha || false,
            depth: options.depth || true,
            stencil: options.stencil || true,
            antialias: options.antialias || false,
            premultipliedAlpha: options.premultipliedAlpha || true,
            preserveDrawingBuffer: options.preserveDrawingBuffer || false,
            failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat || false,
        }
    }
    /**
     * 
     * @param {*} renderType 
     * @param {*} options 
     * @returns {GLContext}
     */
    getContext(renderType = 'webgl', options = {}) {
        const canvasId = this._canvasId,
            id = this.id;
        this._glType = this._glType || renderType;
        this._contextOptions = this._contextOptions || this._getContextAttributes(options);
        if (!CACHE_GLCONTEXT[canvasId]) {
            CACHE_GLCONTEXT[canvasId] = new GLContext(id, this._glType, this._contextOptions);
        }
        return CACHE_GLCONTEXT[canvasId];
    }
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
     * @param {*} type 
     * @param {*} listener 
     * @param {*} options 
     */
    addEventListener(type, listener, options) {

    }
    /**
     * link virtual rendering context to real htmlCanvas
     * @param {HtmlCanvasElement} canvas 
     */
    linkToCanvas(canvas) {
        const id = stamp(canvas);
        this._canvasId = id;
        CACHE_GL[id] = CACHE_GL[id] || canvas.getContext(this._glType, this._contextOptions) || canvas.getContext(`experimental-${this._glType}`, this._contextOptions);
        const glContext = this.getContext('webgl');
        glContext._setgl(CACHE_GL[id]);
    }
    /**
     * link virtual rendering context to real htmlCanvas
     * @param {WebGLRenderingContext} gl 
     */
    linkToWebGLRenderingContext(gl) {
        if (this._canvas)
            throw new Error('exist htmlcanvaselement');
        const glContext = this.getContext('webgl');
        glContext._setgl(gl);
    }

}

module.exports = GLCanvas;