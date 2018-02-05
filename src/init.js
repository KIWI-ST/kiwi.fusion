const GLCanvas = require('./gl/GLCanvas');
const GLContext = require('./gl/GLContext');
const Mock = require('./core/Mock');

module.exports = {
    Mock: Mock,
    gl: {
        GLCanvas,
        GLContext
    }
}