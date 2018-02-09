/**------------------------------------------mock---------------------------------------------*/
window = {};
Image = function () { };
HTMLCanvasElement = function(){};

window.addEventListener = function(){
    
}

class HTMLCanvasElement2 {
    getBoundingClientRect() {
        return { x: 8, y: 8, top: 8, bottom: 608, left: 8, right: 808, width: 800, height: 600 };
    }
    get nodeName() {
        return 'canvas';
    }
    get width(){
        return 800;
    }
    get height(){
        return 600;
    }
}
HTMLVideoElement = function () { };


/**---------------------------------------------------------------------------------------*/

 const kiwi = require('./../src/init');


const kiwiCanvas = new kiwi.gl.GLCanvas('first');

const THREE = require('./../node_modules/three/build/three');

const camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.01, 10);
camera.position.z = 1;
scene = new THREE.Scene();
geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
material = new THREE.MeshNormalMaterial();
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
renderer = new THREE.WebGLRenderer({
    canvas: kiwiCanvas,
    context: kiwiCanvas.getContext('webgl', {
        antialias: true
    })
});
renderer.setSize(800, 600);
//
renderer.render(scene, camera);

kiwiCanvas.linkToWebGLRenderingContext(require('gl')(800,600));

