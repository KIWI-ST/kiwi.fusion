const kiwi = require('./../src/init');

window={};
Image = function(){};
HTMLCanvasElement =function(){};
HTMLVideoElement = function(){};

const clay = require('claygl');
const glCanvas = new kiwi.gl.GLCanvas('mapCanvas');
var app = clay.application.create(glCanvas, {
    event: true,
    graphic: {
        shadow: true
    },
    init: function (app) {
        // Create camera
        this._camera = app.createCamera([0, 3, 8], [0, 1, 0]);
        // Create lights
        app.createDirectionalLight([-1, -1, -1], '#fff', 0.7);
        app.createAmbientLight('#fff', 0.3);
        // Create geometries.
        app.createCube();
        app.createSphere().position.set(2, 0, 0);
        app.createPlane().position.set(-2, 0, 0);
        // More geometries can be found under clay.geometry namespace
        app.createMesh(new clay.geometry.Cone()).position.set(4, 0, 0);
        app.createMesh(new clay.geometry.Cylinder()).position.set(-4, 0, 0);
        // Create a room
        var roomCube = app.createCubeInside({
            roughness: 1,
            color: [0.3, 0.3, 0.3]
        });
        roomCube.silent = true;
        // Cube not cast shadow to reduce the bounding box of scene and increse the shadow resolution.
        roomCube.castShadow = false;
        roomCube.scale.set(10, 10, 10);
        roomCube.position.y = 9;
        // Use orbit control
        this._control = new clay.plugin.OrbitControl({
            target: this._camera,
            domElement: app.container
        });
        app.scene.on('mouseover', function (e) {
            e.target.material.set('color', '#f00');
        }).on('mouseout', function (e) {
            e.target.material.set('color', '#fff');
        });
    },
    loop: function (app) {
        this._control.update(app.frameTime);
    }
});

glCanvas.linkToWebGLRenderingContext(require('gl')(800,600));