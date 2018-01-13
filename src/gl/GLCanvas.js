/**
 * 虚拟htmlCanvas对象，用于记录webgl在htmlCanvas时的过程
 * @author yellow date 2018/1/1
 *  
 */
const Dispose = require('./../utils/Dispose'),
    mergre = require('./../utils/merge'),
    GLContext = require('./GLContext');
/**
 * store glContext cache
 */
const CACHE_GLCONTEXT = {};
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
         * real html canvas element
         * @type {HtmlCanvasElement}
         */
        this._canvas = null;
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
        if (!CACHE_GLCONTEXT[canvasId]) {
            CACHE_GLCONTEXT[canvasId] = new GLContext(id, renderType, options);
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
    linkToCanvas(canvas){
        this._canvas = canvas;
    }
    /**
     * link virtual rendering context to real htmlCanvas
     * @param {WebGLRenderingContext} gl 
     */
    linkToWebGLRenderingContext(gl){
        if(this._canvas)
            throw new Error('exist htmlcanvaselement');
        const glContext = this.getContext('webgl');
        glContext._setgl(gl);
    }

}

module.exports = GLCanvas;