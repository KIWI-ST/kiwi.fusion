
const Record = require('./Record');

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

    increase(record){
        this._records.push(record);
    }
    
}
/**
 * 
 */
Recorder.instances = {};

module.exports = Recorder;