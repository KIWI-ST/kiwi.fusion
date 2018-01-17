/**
 * 执行器，用于执行Record操作，全局自带一个Actuator
 * @author yellow date 2018/1/3
 */
const Encrypt = require('./Encrypt').Encrypt_Object;
/**
 * Cahce store
 */
const CHACHE = {
    /**
     * use id to store program
     */
    PROGRAM: {},
    /**
    * use id to store shader
    */
    SHADER: {},
    /**
    * use id to store texture
    */
    TEXTURE: {}
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
            const record = this._records.shift();
            while (record) {
                const opName = record.opName,
                    cacheIndexName = null,
                    encrypt = Encrypt[opName] || {};
                //replace the reference object
                if (encrypt.replace == 1) {
                    const ptIndex = record.ptIndex,
                        ptName = record.ptName,
                        cacheName = ptName.split('_')[0];
                    const refObject = CHACHE[cacheName][ptName];
                    cacheIndexName = cacheName;
                    record.replace(refObject);
                } else if (encrypt.replace == 2) {
                    const ptIndexs = record.ptIndex,
                        ptNames = record.ptName,
                        len = 2,
                        refObjects = [];
                    for (let i = 0; i < len; i++) {
                        const pName = ptNames[i],
                            cacheName = ptName.split('_')[0];
                        const refObject = CHACHE[cacheName][ptName];
                        refObjects.push(refObject);
                    }
                    record.replace(refObjects);
                }
                //if need to return and cache
                if (encrypt.return) {
                    const returnId = record.returnId;
                    CHACHE[cacheIndexName][returnId] = gl[opName].apply(gl, record.args);
                } else
                    gl[opName].apply(gl, record.args);
            }
        }
    }
}
/**
 * instance of Actuator
 */
const actuator = new Actuator();

module.exports = actuator;