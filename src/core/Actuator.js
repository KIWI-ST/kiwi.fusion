/**
 * 执行器，用于执行Record操作，全局自带一个Actuator
 * @author yellow date 2018/1/3
 */
const Encrypt = require('./Encrypt');
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
            let record = this._records.shift();
            while (record) {
                const opName = record.opName,
                    encrypt = Encrypt[opName] || {};
                //replace the reference object
                if (encrypt.replace > 0) {
                    const refObjects = [];
                    for (const key in record.ptMapIndex) {
                        const target = record.ptMapIndex[key],
                            ptIndex = target.index,
                            ptName = target.id,
                            cacheName = target.prefix,
                            refObject = CHACHE[cacheName][ptName];
                        refObjects.push(refObject);
                    }
                    record.replace(refObjects);
                }
                //if need to return and cache
                if (encrypt.return) {
                    const returnId = record.returnId,
                        returanIdPrefix = record.returanIdPrefix;
                    CHACHE[returanIdPrefix][returnId] = gl[opName].apply(gl, record.args);
                } else
                    gl[opName].apply(gl, record.args);
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