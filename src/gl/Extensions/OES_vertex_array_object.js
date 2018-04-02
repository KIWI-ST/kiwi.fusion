/**
 * reference:
 * https://github.com/greggman/oes-vertex-array-object-polyfill/blob/master/OESVertexArrayObject-polyfill.js
 * https://github.com/KhronosGroup/WebGL/blob/master/sdk/demos/google/resources/OESVertexArrayObject.js
 * 
 */
const Extension = require('./Extension'),
    GLConstants = require('./../GLConstants'),
    GLLimits = require('./../GLLimits');
/**
 * @class
 */
class VertexAttrib {
    constructor() {
        this.enabled = false;
        this.buffer = null;
        this.size = 4;
        this.type = GLConstants.FLOAT;
        this.normalized = false;
        this.stride = 16;
        this.offset = 0;
        this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
    }
}
/**
 * vao object
 * @class
 */
class WebGLVertexArrayObjectOES {

    constructor(ext) {
        this.isAlive = true;
        this.hasBeenBound = false;
        this._ext = ext;
        this._maxVertexAttribs = GLLimits.getInstance()[GLConstants.MAX_VERTEX_ATTRIBS];
        this.elementArrayBuffer = null;
        this.attribs = new Array(this._maxVertexAttribs);
        this._initVertexAttrib();
        this.maxAttrib = 0;
    }

    _initVertexAttrib() {
        const attribs = this.attribs;
        for (let n = 0, len = attribs.length; n < len; n++) {
            attribs[n] = new VertexAttrib();
        }
    }

}
/**
 * @class
 */
class OES_vertex_array_object extends Extension {
    /**
     * 
     * @param {String} extName 
     * @param {GLContext} glContext 
     */
    constructor(extName,glContext) {
        super(extName,glContext);
        /**
         * @type {Int}
         */
        this.VERTEX_ARRAY_BINDING_OES = GLConstants.VERTEX_ARRAY_BINDING_OES;
        /**
         * @type {WebGLVertexArrayObjectOES}
         */
        this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
        /**
         * @type {Array}
         */
        this.vertexArrayObjects = [this.defaultVertexArrayObject];
        /**
         * @type {WebGLVertexArrayObjectOES}
         */
        this.currentVertexArrayObject;

    }
    /**
     * create WebGLVertexArrayObjectOES
     */
    createVertexArrayOES() {
        const arrayObject = new WebGLVertexArrayObjectOES(this);
        this.vertexArrayObjects.push(arrayObject);
        return arrayObject;
    }
    /**
     * delete WebGLVertexArrayObjectOES
     * @param {WebGLVertexArrayObjectOES} arrayObject 
     */
    deleteVertexArrayOES(arrayObject) {
        arrayObject.isAlive = false;
        const idx = this.vertexArrayObjects.indexOf(arrayObject);
        this.vertexArrayObjects.splice(idx, 1);
        this.currentVertexArrayObject == arrayObject ? this.bindVertexArrayOES(null) : null;
    }
    /**
     * 
     * @param {WebGLVertexArrayObjectOES} arrayObject 
     */
    bindVertexArrayOES(arrayObject) {
        //绑定已销毁的对象，提示错误
        if (arrayObject && !arrayObject.isAlive) {
            throw new Error("bindVertexArrayOES: attempt to bind deleted arrayObject");
            return;
        }
        //
        const oldVao = this.currentVertexArrayObject;
        this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
        this.currentVertexArrayObject.hasBeenBound = true;
        const newVao = this.currentVertexArrayObject;
        //
        if(oldVao === newVao){
            return;
        }
        //
        if(!oldVao||newVao.elementArrayBuffer!=oldVao.elementArrayBuffer){
            
        }


    }

}

module.exports = OES_vertex_array_object;