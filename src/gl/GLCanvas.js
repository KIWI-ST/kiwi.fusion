/**
 * 虚拟htmlCanvas对象，用于记录webgl在htmlCanvas时的过程
 * @author yellow date 2018/1/1
 *  
 */

const Dispose = require('./../utils/Dispose'),
    mergre = require('./../utils/merge'),
    GLContext = require('./GLContext');

const CACHE_GLCONTEXT = {};

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
        super(id);
        /**
         * @type {String}
         */
        this._canvasId = id;
        /**
         * @type {Object}
         */
        this._options = mergre({}, options);
    }
    /**
     * 
     * @param {*} renderType 
     * @param {*} options 
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
    addEventListener(type,listener,options){

    }

}

module.exports = GLCanvas;