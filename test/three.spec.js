import Container from './../src/core/Container';

describe("three.plugin.spec", () => {
    describe('#context', () => {
        it('#three.plugin', () => {
            const width = 800,
                height = 600;
            let cvs = document.createElement('canvas');
            cvs.width = width;
            cvs.height = height;
            document.body.appendChild(cvs);
            //创建绘制上下文
            const container = new Container({
                alpha: false,
                antialias: false,
                premultipliedAlpha: false,
                stencil: false,
                preserveDrawingBuffer: false,
                width: width,
                height: height
            });
            //背景设置为白色
            // ctx.clearColor();
            //
            // let point_program = ctx.useProgram('point');
            // point_program.uniforms.uSampler = 1;
            // point_program.uniforms.positions = 0;
            // point_program.uniforms.bounds = [ctx._width, ctx._height];
            // point_program.uniforms.zoom = 0.5;
            //设置attribute

        });
    });
});