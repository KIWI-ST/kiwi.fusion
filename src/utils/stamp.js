/**
 * assign kiwi.gl object to be an unique id in the global
 * @author yellow 2017/5/26
 */

const isObject = require('./isObject'),
    isString = require('./isString');

const prefix = '_kiwi.gl_',
    prefixId = prefix + 'id_';

let i = 1;

const getId = () => {
    return prefixId + (i++);
};

const setId = (obj, id) => {
    isObject(obj)&&isString(id)?obj._kiwi_gl_id_=id:null;
}

/**
 * get the unique id
 * @method stamp
 * @param {Object} obj 
 * @return {String} error if returned 'null'
 */
const stamp = (obj) => {
    if (isObject(obj)) {
        obj._kiwi_gl_id_ = obj._kiwi_gl_id_ || getId();
        return obj._kiwi_gl_id_
    }
    else if (isString(obj)) {
        return prefix + obj;
    } else
        return null;
};



module.exports = { stamp, prefix, getId, setId }