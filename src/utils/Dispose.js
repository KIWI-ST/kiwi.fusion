/**
 * 设计思路为.net framework 的 IDispose接口
 * 除此之外提供额外的属性：
 * -id
 * -handle
 * -create handle
 * -dispose
 */

const stamp = require('./stamp').stamp;

/**
 * @class
 */
class Dispose {
    /**
     * 构建一个可被销毁的资源对象,id链
     */
    constructor(id = null) {
        this._id = id ? id +'-'+stamp(this) : stamp(this);
    }
    /**
     * 获取资源id
     */
    get id() {
        return this._id;
    }
    /**
     * 资源销毁方法，执行完一段后，统一调用
     * must be implement be child class
     * @abstract
     */
    dispose() {
        throw new Error(`no implementation of function dispose`);
    }
}

module.exports = Dispose;