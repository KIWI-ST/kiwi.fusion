/**
 * @author yellow date 2018/1/4
 */
const Record = require('./Record');

const Encrypt = require('./Encrypt');

/**
 * @class
 */
class Recorder {

    constructor(glContext, storeInstance = true) {
        /**
         * @type {GLContext}
         */
        this._glContext = glContext;
        /**
         * @type {Array}
         */
        this._records = [];
        /**
         * 注册到全局实例中
         */
        storeInstance ? Recorder.instances[glContext.id] = this : null;
    }
    /**
     * 新增record
     * @param {Record} record 
     */
    increase(record) {
        this._records.push(record);
    }
    /**
     * 将现有的记录转换成指令
     */
    toInstruction(programId = null) {
        const record = new Record('useProgram',null);
        record.exactIndexByValue(0, programId);
        const len = this._records.length,
            list = [record].concat(this._records.splice(0, len));
        return list;
    }
    /** 
     * 将现有记录转化成操作，与gl指令无关
    */
    toOperation() {
        const len = this._records.length,
            list = this._records.splice(0, len);
        return list;
    }

}
/**
 * 
 */
Recorder.instances = {};

module.exports = Recorder;