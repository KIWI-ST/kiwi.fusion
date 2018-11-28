# kiwi.gl
[![Build Status](https://travis-ci.org/axmand/kiwi.gl.svg?branch=master)](https://travis-ci.org/axmand/kiwi.gl)
[![npm version](https://badge.fury.io/js/kiwi.gl.svg)](https://badge.fury.io/js/kiwi.gl)
<!-- [![codecov](https://codecov.io/gh/axmand/kiwi.gl/branch/master/graph/badge.svg)](https://codecov.io/gh/axmand/kiwi.gl) -->
>a virtual webgl running context which can mix thirdly webgl library's gl commands togother,include [three.js](https://github.com/mrdoob/three.js),[claygl](https://github.com/pissang/claygl) and so on.
### example ###
[3D](http://139.129.7.130/kiwi.gl/example/kiwi.gl.3d.html)  
[vao](http://139.129.7.130/kiwi.gl/example/kiwi.gl.vao.html)  
[texture](http://139.129.7.130/kiwi.gl/example/kiwi.gl.texture.html)  
[three](http://139.129.7.130/kiwi.gl/example/kiwi.gl.three.html)  
[claygl](http://139.129.7.130/kiwi.gl/example/kiwi.gl.clay.html)  
[three&claygl](http://139.129.7.130/kiwi.gl/example/kiwi.gl.three.claygl.html)
### Install ###
```javascript
npm install kiwi.gl 
```
> or
```
npm install --save-dev kiwi.gl
```
### Examples ###
> get htmlelement's webgl context
```javascript
//get htmlcanvaselement
const canvas = document.getElementById('mapCanvas');
//get webgl context
const gl = canvas.getContext('webgl',{
    alpha:false,
    depth:true,
    stencil:true,
    antialias:false,
    premultipliedAlpha:true,
    preserveDrawingBuffer:false,
    failIfMajorPerformanceCaveat:false
});
```
### Debug ###
>windows:
```
npm install --global --production windows-build-tools

npm install -global gl
```
>osx:
```
npm install -global gl
```
> use kiwi.gl with threejs
```javascript
// use virtual glCanvas instead of real canvas element
const glCanvas1 = new kiwi.gl.GLCanvas(gl);
// init 3d scene by threejs
const camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.01, 10);
camera.position.z = 1;
scene = new THREE.Scene();
geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
material = new THREE.MeshNormalMaterial();
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
renderer = new THREE.WebGLRenderer({
    canvas: glCanvas1,
    context: glCanvas1.getContext()
});
renderer.setSize(800, 600);
renderer.render(scene, camera);
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
}
animate();
```
![threejs-1](https://user-images.githubusercontent.com/5127112/39559112-6da252c6-4ec6-11e8-9c01-61c7a34d4f17.png)
> use kiwi.gl with claygl
```javascript
// use virtual glCanvas instead of real canvas element
const glCanvas2 = new kiwi.gl.GLCanvas(gl);
// vertex shader source
const vertexShader = `
    attribute vec3 position: POSITION;
    attribute vec3 normal: NORMAL;
    uniform mat4 worldViewProjection : WORLDVIEWPROJECTION;
    varying vec3 v_Normal;
    
    void main() {
        gl_Position = worldViewProjection * vec4(position, 1.0);
        v_Normal = normal;
    }`;
// fragment shader source
const fragmentShader = `
    varying vec3 v_Normal;
    
    void main() {
        gl_FragColor = vec4(v_Normal, 1.0);
    }`;

var app = clay.application.create(glCanvas2, {
    init: function (app) {
        // Create a orthographic camera
        this._camera = app.createCamera([0, 2, 5], [0, 0, 0]);
        // Create a empty geometry and set the triangle vertices
        this._cube = app.createCube({shader: new clay.Shader(vertexShader, fragmentShader)});
    },
    loop: function (app) {
        this._cube.rotation.rotateY(app.frameTime / 1000);
    }
});
```
![claygl-1](https://user-images.githubusercontent.com/5127112/39559113-6dd81604-4ec6-11e8-9ae2-8cf514e3a06e.png)
> mixture
![claygl-three-1](https://user-images.githubusercontent.com/5127112/39559114-6e0f5bdc-4ec6-11e8-81ef-6d636a8c945c.png)
### notice ####
> The tests are not finished yet, all comments welcome！
