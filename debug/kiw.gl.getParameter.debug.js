/**
 * @type {WebGLRenderingContext}
 */
const gl = require('gl')(400,100);
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
 */
const ACTIVE_TEXTURE = gl.getParameter(gl.ACTIVE_TEXTURE);


const ALPHA_BITS = gl.getParameter(gl.ALPHA_BITS);

const ARRAY_BUFFER_BINDING = gl.getParameter(gl.ARRAY_BUFFER_BINDING);

const BLEND = gl.getParameter(gl.BLEND);

const BLEND_COLOR = gl.getParameter(gl.BLEND_COLOR);

const BLEND_DST_ALPHA = gl.getParameter(gl.BLEND_DST_ALPHA);

const BLEND_DST_RGB = gl.getParameter(gl.BLEND_DST_RGB);

const BLEND_EQUATION = gl.getParameter(gl.BLEND_EQUATION);

const BLEND_EQUATION_ALPHA = gl.getParameter(gl.BLEND_EQUATION_ALPHA);
//
const VERSION = gl.getParameter(gl.VERSION);

const ALIASED_LINE_WIDTH_RANGE = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);

const ALIASED_POINT_SIZE_RANGE = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);

const MAX_VIEWPORT_DIMS = gl.getParameter(gl.MAX_VIEWPORT_DIMS);

const s= "";

