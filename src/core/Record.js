/**
 * 操作记单元
 * @author yellow date 2018/1/4
 */
const isArray = require('./../utils/isArray'),
    /**
    * use stamp to get reference object Id
    */
    stamp = require('./../utils/stamp');
/**
 * @class
 */
class Record {
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
        this._ptMapIndex = {};
        /**
         * indicate this record needs to return value
         * @type {String}
         */
        this._returnId = null;
    }
    /**
     * operation name
     */
    get opName() {
        return this._opName;
    }
    /**
     * arguments of record
     */
    get args() {
        return this._rest;
    }
    /**
     * @returns {String}
     */
    get returnId() {
        return this._returnId;
    }
    /**
     * @returns {String}
     */
    get returanIdPrefix(){
        return this._returanIdPrefix;
    }
    /**
     * @type {Int}
     */
    get ptMapIndex() {
        return this._ptMapIndex;
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
    exactIndexByValue(ptIndex, ptName) {
        const arr = ptName.split('_');
        //map to _ptIndex
        this._ptMapIndex[ptIndex] = {
            prefix: arr[0],
            index: ptIndex,
            id: ptName
        };
        //replace value
        this._rest[ptIndex] = ptName;
    }
    /**
     * 
     * @param {Array} ptIndex 
     */
    exactIndexByObject(ptIndexs) {
        for (let i = 0, len = ptIndexs.length; i < len; i++) {
            const ptIndex = ptIndexs[i],
                ptName = stamp(this._rest[ptIndex]);
            this.exactIndexByValue(ptIndex, ptName);
        }
    }
    /**
     * 
     * @param {Object|Array} ref 
     */
    replace(ref) {
        const ptIndex = this._ptMapIndex;
        if (!isArray(ptIndex)) {
            this._rest[ptIndex] = ref;
        } else {
            for (let i = 0, len = ptIndex.length; i < len; i++) {
                this._rest[ptIndex[i]] = ref[i];
            }
        }
    }
    /**
     * 设置返回的id
     */
    setReturnId(v) {
        this._returnId = v;
        this._analysisReturnId(v);
    }
    /**
     * 
     * @param {String} v 
     */
    _analysisReturnId(v){
        const arr = v.split('_');
        //map to _ptIndex
        this._returanIdPrefix = arr[0];
    }

}

module.exports = Record;