/**
 * management of GLExtension
 * @author yellow date 2017/6/15
 */
/**
 * contain ie firefox chrome opera safari
 */
const browser = require('./../utils/browser');
/** 
 * extension index
*/
const EXTENSION_INDEX = {
    OES_standard_derivatives: ['OES_standard_derivatives'],
    OES_element_index_uint: ['OES_element_index_uint'],
    WEBGL_depth_texture: ['WEBGL_depth_texture', 'WEBKIT_WEBGL_depth_texture'],
    OES_texture_float: ['OES_texture_float'],
    EXT_frag_depth: ['EXT_frag_depth'],
    WEBGL_debug_shaders: ['WEBGL_debug_shaders'],
    WEBGL_compressed_texture_s3tc: ['WEBGL_compressed_texture_s3tc', 'MOZ_WEBGL_compressed_texture_s3tc', 'WEBKIT_WEBGL_compressed_texture_s3tc'],
    WEBGL_compressed_texture_pvrtc: ['WEBGL_compressed_texture_pvrtc', 'WEBKIT_WEBGL_compressed_texture_pvrtc'],
    WEBGL_compressed_texture_etc1: ['WEBGL_compressed_texture_etc1'],
    EXT_texture_filter_anisotropic: ['EXT_texture_filter_anisotropic', 'MOZ_EXT_texture_filter_anisotropic', 'WEBKIT_EXT_texture_filter_anisotropic'],
    OES_vertex_array_object: ['OES_vertex_array_object', 'MOZ_OES_vertex_array_object', 'WEBKIT_OES_vertex_array_object'],
    ANGLE_instanced_arrays: ['ANGLE_instanced_arrays']
}
/** 
 * webgl1 available extension
*/
const extensions1 = {};
/** 
 * webgl2 available extension
*/
const extensions2 = {};
/** 
 * }{debug
 * needs to be extend
 * @class
*/
class Extension {
    constructor(extName) {
        this._name = extName;
    }
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays
 */
if ((browser.firefox && parseInt(browser.firefox) >= 33) || (browser.ie && parseInt(browser.ie) >= 11)) {
    extensions1['ANGLE_instanced_arrays'] = new Extension('ANGLE_instanced_arrays');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_blend_minmax
 */
if (browser.firefox && parseInt(browser.firefox) >= 33) {
    extensions1['EXT_blend_minmax'] = new Extension('EXT_blend_minmax');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_color_buffer_float
 */
if (browser.firefox && parseInt(browser.firefox) >= 49) {
    extensions2['EXT_color_buffer_float'] = new Extension('EXT_color_buffer_float');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_color_buffer_half_float
 */
if (browser.firefox && parseInt(browser.firefox) >= 30) {
    extensions1['EXT_color_buffer_half_float'] = new Extension('EXT_color_buffer_half_float');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query
 */
if ((browser.firefox && parseInt(browser.firefox) >= 51) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
    extensions1['EXT_disjoint_timer_query'] = new Extension('EXT_disjoint_timer_query');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_frag_depth
 */
if ((browser.firefox && parseInt(browser.firefox) >= 30) || browser.ie) {
    extensions1['EXT_frag_depth'] = new Extension('EXT_frag_depth');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_sRGB
 */
if (browser.firefox && parseInt(browser.firefox) >= 28) {
    extensions1['EXT_sRGB'] = new Extension('EXT_sRGB');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_shader_texture_lod
 */
if (browser.firefox && parseInt(browser.firefox) >= 50) {
    extensions1['EXT_shader_texture_lod'] = new Extension('EXT_shader_texture_lod');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic
 */
if ((browser.firefox && parseInt(browser.firefox) >= 17) || browser.ie) {
    extensions2['EXT_texture_filter_anisotropic'] = extensions1['EXT_texture_filter_anisotropic'] = new Extension('EXT_texture_filter_anisotropic');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
 */
if ((browser.firefox && parseInt(browser.firefox) >= 24) || browser.ie) {
    extensions2['OES_element_index_uint'] = extensions1['OES_element_index_uint'] = new Extension('OES_element_index_uint');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
 */
if ((browser.firefox && parseInt(browser.firefox) >= 10) || browser.ie) {
    extensions1['OES_standard_derivatives'] = new Extension('OES_standard_derivatives');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float
 */
if ((browser.firefox && parseInt(browser.firefox) >= 6) || browser.ie) {
    extensions1['OES_texture_float'] = new Extension('OES_texture_float');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float_linear
 */
if ((browser.firefox && parseInt(browser.firefox) >= 24) || browser.ie) {
    extensions2['OES_texture_float_linear'] = extensions1['OES_texture_float_linear'] = new Extension('OES_texture_float_linear');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float
 */
if ((browser.firefox && parseInt(browser.firefox) >= 29) || browser.ie) {
    extensions1['OES_texture_half_float'] = new Extension('OES_texture_half_float');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float_linear
 */
if ((browser.firefox && parseInt(browser.firefox) >= 30) || browser.ie) {
    extensions2['OES_texture_half_float_linear'] = extensions1['OES_texture_half_float_linear'] = new Extension('OES_texture_half_float_linear');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OES_vertex_array_object
 */
if (browser.firefox && parseInt(browser.firefox) >= 25) {
    extensions1['OES_vertex_array_object'] = new Extension('OES_vertex_array_object');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_color_buffer_float
 */
if (browser.firefox && parseInt(browser.firefox) >= 30) {
    extensions1['WEBGL_color_buffer_float'] = new Extension('WEBGL_color_buffer_float');
}
/**
 * }{debug mobile/hardware
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_astc
 */
if ((browser.firefox && parseInt(browser.firefox) >= 53) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
    extensions2['WEBGL_compressed_texture_astc'] = extensions1['WEBGL_compressed_texture_astc'] = new Extension('WEBGL_compressed_texture_astc');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_atc
 */
if (browser.firefox && parseInt(browser.firefox) >= 18) {
    extensions2['WEBGL_compressed_texture_atc'] = extensions1['WEBGL_compressed_texture_atc'] = new Extension('WEBGL_compressed_texture_atc');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_etc
 */
if (browser.firefox && parseInt(browser.firefox) >= 51) {
    extensions2['WEBGL_compressed_texture_etc'] = extensions1['WEBGL_compressed_texture_etc'] = new Extension('WEBGL_compressed_texture_etc');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_etc1
 */
if (browser.firefox && parseInt(browser.firefox) >= 30) {
    extensions2['WEBGL_compressed_texture_etc1'] = extensions1['WEBGL_compressed_texture_etc1'] = new Extension('WEBGL_compressed_texture_etc1');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_pvrtc
 */
if (browser.firefox && parseInt(browser.firefox) >= 18) {
    extensions2['WEBGL_compressed_texture_pvrtc'] = extensions1['WEBGL_compressed_texture_pvrtc'] = new Extension('WEBGL_compressed_texture_pvrtc');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc
 */
if ((browser.firefox && parseInt(browser.firefox) >= 22) || browser.ie) {
    extensions2['WEBGL_compressed_texture_s3tc'] = extensions1['WEBGL_compressed_texture_s3tc'] = new Extension('WEBGL_compressed_texture_s3tc');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc_srgb
 */
if (browser.firefox && parseInt(browser.firefox) >= 55) {
    extensions2['WEBGL_compressed_texture_s3tc_srgb'] = extensions1['WEBGL_compressed_texture_s3tc_srgb'] = new Extension('WEBGL_compressed_texture_s3tc_srgb');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
 */
if ((browser.firefox && parseInt(browser.firefox) >= 53) || browser.ie) {
    extensions2['WEBGL_debug_renderer_info'] = extensions1['WEBGL_debug_renderer_info'] = new Extension('WEBGL_debug_renderer_info');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_shaders
 */
if ((browser.firefox && parseInt(browser.firefox) >= 30) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
    extensions2['WEBGL_debug_shaders'] = extensions1['WEBGL_debug_shaders'] = new Extension('WEBGL_debug_shaders');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture
 */
if ((browser.firefox && parseInt(browser.firefox) >= 22) || browser.ie) {
    extensions1['WEBGL_debug_renderer_info'] = new Extension('WEBGL_debug_renderer_info');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers
 */
if (browser.firefox && parseInt(browser.firefox) === 28) {
    extensions1['WEBGL_draw_buffers'] = new Extension('WEBGL_draw_buffers');
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context
 */
if (browser.firefox && parseInt(browser.firefox) === 22) {
    extensions2['WEBGL_lose_context'] = extensions1['WEBGL_lose_context'] = new Extension('WEBGL_lose_context');
}
/**
 * @class
 */
class GLExtension {
    /**
     * 
     * @param {GLContext} glContext 
     */
    constructor(glContext) {
        /**
         * quote of GLContext instance
         */
        this._glContext = glContext;
        /**
         * indicate context webgl version,'webgl' or 'webgl2'
         */
        this._renderType = glContext.renderType;
        /**
         * store key and value of extension
         * @type {Object}
         */
        this._options = {};
        /**
         * @type {Object}
         */
        this._extension = this._renderType === 'webgl' ? extensions1 : extensions2;
        /**
         * map webgl extension
         */
        this._map();
    }
    /**
     * rebuild
     */
    _include() {
        //1.map exist
        const extension = this._renderType === 'webgl' ? extensions1 : extensions2;
        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                const extent = this.getExtension(key);
                if (extent) this[key] = extent;
            }
        }
        //2.map standard
        for (var key in EXTENSION_INDEX) {
            if (EXTENSION_INDEX.hasOwnProperty(key)) {
                const extent = this.getExtension(EXTENSION_INDEX[key]);
                if (extent) this[key] = extent;
            }
        }
    }
    /**
    * 
    * @param {String[]} extNames 
    */
    getExtension(...extNames) {
        const gl = this._glContext.gl,
            names = [].concat(...extNames);
        for (let i = 0, len = names.length; i < len; ++i) {
            const extension = gl.getExtension(names[i]);
            if (extension)
                return extension;
        }
        return null;
    }
    /**
     * 
     */
    _map() {
        const extension = this._extension;
        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                this[key] = extension[key];
            }
        }
    }

}

module.exports = GLExtension;