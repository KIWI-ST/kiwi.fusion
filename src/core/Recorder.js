/**
 * @author yellow date 2018/1/4
 */
const Record = require('./Record');

const Encrypt = require('./Encrypt');

/**
 * @class
 */
class Recorder{

    constructor(glContext){
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
        Recorder.instances[glContext.id] = this;
    }
    /**
     * 新增record
     * @param {Record} record 
     */
    increase(record){
        this._records.push(record);
    }
    /**
     * 将现有的记录转换成指令
     */
    toInstruction(){
        const len = this._records.length,
            list = this._records.splice(0,len);
        return list;
    }

}
/**
 * 
 */
Recorder.instances = {};

module.exports = Recorder;