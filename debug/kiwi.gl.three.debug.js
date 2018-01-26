/**
 * 命名空间导入
 */
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
