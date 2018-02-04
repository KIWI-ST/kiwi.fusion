/**
 * 执行器，用于执行Record操作，全局自带一个Actuator
 * @author yellow date 2018/1/3
 */
const isString = require('./../utils/isString'),
    stamp = require('./../utils/stamp'),
    Encrypt = require('./Encrypt');
/**
 * Cahce store
 */
const CHACHE = {
    /**
     * store program
     */
    PROGRAM: {},
    /**
    * store shader
    */
    SHADER: {},
    /**
    * store texture
    */
    TEXTURE: {},
    /**
     * store BUFFER
     */
    BUFFER: {},
    /**
     * store FRAMEBUFFER
     */
    FRAMEBUFFER:{},
    /**
     * store RENDERBUFFER
     */
    RENDERBUFFER:{},
    /**
     * store uinform
     */
    UNIFOMR: {},
}
/**
 * @class
 */
class Actuator {

    constructor() {
        /**
         * @type {Array}
         */
        this._records = [];
        /**
         * @type {WebGLRenderingContext}
         */
        this._gl = null;
    }
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */
    setGl(v) {
        this._gl = v;
        this.play();
    }
    /**
     * 执行
     * @param {Array} records 
     */
    play(records = []) {
        this._records = this._records.concat(records);
        const gl = this._gl;
        if (gl) {
            let record = this._records.shift();
            while (record) {
                const opName = record.opName,
                    encrypt = Encrypt[opName] || {};
                //replace the reference object
                if (encrypt.replace > 0) {
                    const refObjects = {};
                    for (const key in record.ptMapIndex) {
                        const target = record.ptMapIndex[key],
                            ptIndex = target.index,
                            ptName = target.id,
                            cacheName = target.prefix,
                            refObject = CHACHE[cacheName][ptName];
                        refObjects[ptIndex] = refObject;
                    }
                    record.replace(refObjects);
                }
                //if need to return and cache,
                if (encrypt.return) {
                    // case of uniform returned is not string
                    const returnId = isString(record.returnId) ? record.returnId : stamp(record.returnId),
                        returanIdPrefix = record.returanIdPrefix;
                    CHACHE[returanIdPrefix][returnId] = gl[opName].apply(gl, record.args);
                }
                else {
                    gl[opName].apply(gl, record.args);
                }
                //next record
                record = this._records.shift();
            }
        }
    }
}
/**
 * instance of Actuator
 */
const actuator = new Actuator();

module.exports = actuator;