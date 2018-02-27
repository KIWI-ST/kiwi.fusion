const base_vs = `attribute vec4 a_position;
void main(){
    gl_Position = a_position;
}`;

const base_fs = `void main() {
    gl_FragColor = vec4(1,0,0.5,1);
}`;


module.exports = {
    base_vs,
    base_fs
}