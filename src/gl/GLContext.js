
const Dispose = require('./../utils/Dispose'),
    GLConstants = require('./GLConstants');
/**
 * @class
 */
class GLContext extends Dispose{
    /**
     * 
     * @param {String} id parentId,just as the glCanvas'id
     * @param {String} renderType support 'webgl' or 'webgl2'
     * @param {Object} options 
     */
    constructor(id,renderType,options={}){
        super(id);
        /**
         * @type {String}
         */
        this._renderType = renderType;
        /**
         * @type {Object}
         */
        this._options = this._getContextAttributes(options);
        //this._limits =
        /**
         * map funciont
         */ 
        this._map();
    }

    _map(){
        //1.map constants
        for (const key in GLConstants) {
            if (!this.hasOwnProperty(key)) {
                const target = GLConstants[key];
                if (!this[key] && !!target)
                    this[key] = target;
            }
        }
    }

    /**
     * get context attributes
     * include webgl2 attributes
     * reference https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     * @param {Object} [options] 
     */
    _getContextAttributes(options={}){
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

    createShader(type){

    }


}


module.exports = GLContext;