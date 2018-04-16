/**
 * vertex fragment
 */
const standard_vertex = `
    attribute vec3 a_position;
    varying vec2 texCoord;
    void main(){
        texCoord = a_position.xy*0.5+0.5;
        gl_position = vec4(a_position,1.0);
    }`;

const drop_fragment = `
    const float PI = 3.141592653589793;
    uniform sampler2D texture;
    uniform vec2 center;
    uniform float radius;
    uniform float strength;
    
    varying vec2 texCoord;

    void main(){
        vec4 info = texture2D(texture,texCoord);
        float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - texCoord) / radius);
        drop = 0.5 - cos(drop * PI) * 0.5;
        info.r += drop * strength;
        gl_FragColor = info;
    }`;

const update_fragment=`
    uniform sampler2D texture;
    uniform vec2 delta;
    varying vec3 texCoord;

    void main(){
        vec4 info = texture2D(texture,coord);
        vec2 dx = vec2(delta.x,0.0);
        vec2 dy = vec2(0.0,delta.y);
        float average = (texture2D(texture, coord - dx).r +texture2D(texture, coord - dy).r +texture2D(texture, coord + dx).r +texture2D(texture, coord + dy).r) * 0.25;
        info.g += (average - info.r) * 2.0;
        info.g *= 0.995;
        info.r += info.g;
        gl_FragColor = info;
    }`;

const normal_fragment = `
    uniform sampler2D texture;
    uniform vec2 delta;
    varying vec2 texCoord;

    void main(){
        vec4 info = texture2D(texture,coord);
        vec3 dx = vec3(delta.x,texture2D(texture,vec2(texCoord.x+delta.x,coord.y)).r-info.r,0.0);
        vec3 dy = vec3(0.0,texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);
        info.ba = normalize(cross(dy, dx)).xz;
        gl_FragColor = info;
    }`;

const glCanvas = new kiwi.gl.GLCanvas('mapCanvas');
/**
 * @type {WebGLRenderingContext}
 */
const gl = glCanvas.getContext('webgl');

gl.vertex










glCanvas.linkToCanvas(document.getElementById('mapCanvas'));