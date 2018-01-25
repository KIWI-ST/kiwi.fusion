/**
 * 用于填充默认的getParamater，getLoation等值
 */
const GLConstants = require('./GLConstants');
/**
 * all value store
 */
const _polyfill = {};
/**
 * default value
 */
const ParameterNames = {
    'VERSION': {
        name: 'VERSION',
        key: GLConstants.VERSION,
        webgl: 'WebGL 1.0',
        webgl2: 'WebGL 2.0'
    }
};
/**
 * the default webgl version
 */
const current_webgl_version = 'webgl';
/**
 * 
 */
for (const key in ParameterNames) {
    const target = ParameterNames[key];
    _polyfill[key] = _polyfill[target.name] = target;
}
/**
 * 
 * @param {String} pName 
 */
const _isExist = (pName) => {
    return !!ParameterNames[pName];
};

module.exprots = {
    parameterMaps: _polyfill,
    isExist: _isExist
}

