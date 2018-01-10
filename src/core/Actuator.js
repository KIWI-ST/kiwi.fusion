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
        if (this._gl) {
            const record = this._records.shift();
            while (record) {
                const opName = record.opName,
                    encrypt = Encrypt[onpagehide] || {};
                //1.有返回对象的操作
                if (encrypt.return) {
                    
                }
            }
        }
    }

}
/**
 * instance of Actuator
 */
const actuator = new Actuator();

module.exports = actuator;