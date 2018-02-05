const GLCanvas = require('./gl/GLCanvas');
const GLContext = require('./gl/GLContext');
const Mock = require('./utils/Mock');

module.exports = {
    Mock: Mock,
    gl: {
        GLCanvas,
        GLContext
    }
}