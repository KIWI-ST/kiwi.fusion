/**
 * management of GLExtension
 * @author yellow date 2017/6/15
 */
/**
 * contain ie firefox chrome opera safari
 */
const browser = require('./../utils/browser'),
    Extension = require('./Extensions/Extension'),
    OES_vertex_array_object = require('./Extensions/OES_vertex_array_object'),
    WEBGL_draw_buffers = require('./Extensions/WEBGL_draw_buffers');
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
         * @type {Object}
         */
        this._useExtensions = {};
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
        this._extension = null;
        /**
         * 
         */
        // this._initExtension();
        /**
         * map webgl extension
         */
        this._map();
    }

    _initExtension() {
        /**
         * @type {GLContext}
         */
        const glContext = this._glContext;
        /** 
         * webgl1 available extension
        */
        const extensions1 = {};
        /** 
         * webgl2 available extension
        */
        const extensions2 = {};
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 33) || (browser.ie && parseInt(browser.ie) >= 11) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['ANGLE_instanced_arrays'] = new Extension('ANGLE_instanced_arrays', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_blend_minmax
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 33) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_blend_minmax'] = new Extension('EXT_blend_minmax', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_color_buffer_float
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 49) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['EXT_color_buffer_float'] = new Extension('EXT_color_buffer_float', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_color_buffer_half_float
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_color_buffer_half_float'] = new Extension('EXT_color_buffer_half_float', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 51) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_disjoint_timer_query'] = new Extension('EXT_disjoint_timer_query', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_frag_depth
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_frag_depth'] = new Extension('EXT_frag_depth', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_sRGB
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 28) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_sRGB'] = new Extension('EXT_sRGB', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_shader_texture_lod
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 50) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['EXT_shader_texture_lod'] = new Extension('EXT_shader_texture_lod', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 17) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['EXT_texture_filter_anisotropic'] = extensions1['EXT_texture_filter_anisotropic'] = new Extension('EXT_texture_filter_anisotropic', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 24) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['OES_element_index_uint'] = extensions1['OES_element_index_uint'] = new Extension('OES_element_index_uint', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 10) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['OES_standard_derivatives'] = new Extension('OES_standard_derivatives', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 6) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['OES_texture_float'] = new Extension('OES_texture_float', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float_linear
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 24) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['OES_texture_float_linear'] = extensions1['OES_texture_float_linear'] = new Extension('OES_texture_float_linear', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 29) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['OES_texture_half_float'] = new Extension('OES_texture_half_float', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float_linear
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['OES_texture_half_float_linear'] = extensions1['OES_texture_half_float_linear'] = new Extension('OES_texture_half_float_linear', glContext);
        }
        /**
         * }{debug use OES_vertex_array_object extension
         * https://developer.mozilla.org/en-US/docs/Web/API/OES_vertex_array_object
         * (browser.firefox && parseInt(browser.firefox) >= 25) || (browser.chrome && parseInt(browser.chrome) >= 47)
         */
        if (true) {
            extensions1['OES_vertex_array_object'] = new OES_vertex_array_object('OES_vertex_array_object', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_color_buffer_float
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['WEBGL_color_buffer_float'] = new Extension('WEBGL_color_buffer_float', glContext);
        }
        /**
         * }{debug mobile/hardware
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_astc
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 53) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_astc'] = extensions1['WEBGL_compressed_texture_astc'] = new Extension('WEBGL_compressed_texture_astc', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_atc
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 18) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_atc'] = extensions1['WEBGL_compressed_texture_atc'] = new Extension('WEBGL_compressed_texture_atc', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_etc
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 51) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_etc'] = extensions1['WEBGL_compressed_texture_etc'] = new Extension('WEBGL_compressed_texture_etc', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_etc1
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_etc1'] = extensions1['WEBGL_compressed_texture_etc1'] = new Extension('WEBGL_compressed_texture_etc1', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_pvrtc
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 18) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_pvrtc'] = extensions1['WEBGL_compressed_texture_pvrtc'] = new Extension('WEBGL_compressed_texture_pvrtc', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 22) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_s3tc'] = extensions1['WEBGL_compressed_texture_s3tc'] = new Extension('WEBGL_compressed_texture_s3tc', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc_srgb
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 55) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_compressed_texture_s3tc_srgb'] = extensions1['WEBGL_compressed_texture_s3tc_srgb'] = new Extension('WEBGL_compressed_texture_s3tc_srgb', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 53) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_debug_renderer_info'] = extensions1['WEBGL_debug_renderer_info'] = new Extension('WEBGL_debug_renderer_info', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_shaders
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 30) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_debug_shaders'] = extensions1['WEBGL_debug_shaders'] = new Extension('WEBGL_debug_shaders', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture
         */
        if ((browser.firefox && parseInt(browser.firefox) >= 22) || browser.ie || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['WEBGL_debug_renderer_info'] = new Extension('WEBGL_debug_renderer_info', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers
         */
        if ((browser.firefox && parseInt(browser.firefox) === 28) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions1['WEBGL_draw_buffers'] = new WEBGL_draw_buffers('WEBGL_draw_buffers', glContext);
        }
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context
         */
        if ((browser.firefox && parseInt(browser.firefox) === 22) || (browser.chrome && parseInt(browser.chrome) >= 47)) {
            extensions2['WEBGL_lose_context'] = extensions1['WEBGL_lose_context'] = new Extension('WEBGL_lose_context', glContext);
        }
        /**
         * assignment the extension
         */
        this._extension = this._renderType === 'webgl' ? extensions1 : extensions2;
    }
    /**
     * rebuild
     */
    _include() {
        //map exist
        const extension = this.extension;
        const gl = this._glContext.gl;
        for (var key in extension) {
            if (extension.hasOwnProperty(key)) {
                const ext = extension[key].useExtension(gl, key);
                this[key] = ext ? ext : this[key];
            }
        }
    }
    /**
     * map object
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