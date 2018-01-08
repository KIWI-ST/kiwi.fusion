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
         * 
         */
        this._opName = opName;
        /**
         * 
         */
        this._rest = this._exact(rest)
        /**
         * 
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
     * 设置返回的id
     */
    set returnId(v){
        this._returnId = v;
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
        this._rest[ptIndex] = ptName;
    }
    
}

module.exports = Record;