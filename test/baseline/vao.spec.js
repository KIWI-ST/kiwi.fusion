/** 
 * https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
*/
const assert = require('assert'),
    headless = require('gl'),
    common = require('./../common'),
    GLConstants = require('./../../src/gl/GLConstants'),
    kiwi = require('./../../src/init');

const glCavnas = new kiwi.gl.GLCanvas("mapCanvas");
const gl = glCavnas.getContext('webgl');
const ext = gl.getExtension('OES_vertex_array_object');

// describe('baseline test', () => {
//     it('#1.vertex array object', () => {
//         const glCavnas = new kiwi.gl.GLCanvas("mapCanvas");
//         const gl = glCavnas.getContext('webgl');
//         const ext = gl.getExtension('OES_vertex_array_object');


//     });
// });