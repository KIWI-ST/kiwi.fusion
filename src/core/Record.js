/**
 * 操作记单元
 * @author yellow date 2018/1/4
 */
/**
 * @class
 */
class Record{
    /**
     * 
     * @param {*} opName 
     * @param {*} rest 
     */
    constructor(opName, ...rest) {
        /**
         * webgl operation name
         */
        this._opName = opName;
        /**
         * args
         */
        this._rest = this._exact(rest);
        /**
         * use prfix instead of value in args
         * @type {Int}
         */
        this._ptIndex = -1;
        /**
         * the prefix Name of args in ptIndex
         * @type {String}
         */
        this._ptName = null;
        /**
         * indicate this record needs to return value
         * @type {String}
         */
        this._returnId = null;
    }
    /**
     * operation name
     */
    get opName(){
        return this._opName;
    }
    /**
     * arguments of record
     */
    get args(){
        return this._rest;
    }
    /**
     * @returns {String}
     */
    get returnId(){
        return this._returnId;
    }
    /**
     * the value is one of 'SHADER','PROGRAM','TEXTURE','BUFFER','FRAMEBUFFER'
     * @returns {String}
     */
    get returnType(){
        return this._returnType;
    }
    /**
     * @private
     * @param {*} rest 
     */
    _exact(rest) {
        for (let i = 0, len = rest.length; i < len; i++) {
            let target = rest[i];
            if (target instanceof Float32Array) {
                rest[i] = new Float32Array(target);
            }
        }
        return rest;
    }
    /**
     * 修改某处指令的值
     * @param {int} ptIndex 
     * @param {String} ptName always represents shaderId/porgramId/
     */
    exactIndex(ptIndex, ptName) {
        this._ptIndex = ptIndex;
        this._ptName = ptName;
        this._rest[ptIndex] = ptName;
    }
    /**
     * 设置返回的id
     */
    setReturnId(v){
        this._returnId = v;
    }
}

module.exports = Record;