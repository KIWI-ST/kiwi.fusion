/**
 * https://js.tensorflow.org/tutorials/core-concepts.html
 */
const tf = require('@tensorflow/tfjs');


const shape = [2,3];
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print();