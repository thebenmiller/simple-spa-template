import './css/main.css';

import glsl from 'glslify';
import createShader from 'gl-shader';
import triangle from 'a-big-triangle';

import vert from './shaders/vert.glsl';
import frag from './shaders/vert.glsl';

const shader = createShader(gl, glsl(vert), glsl(frag));

function render() {
  shader.bind();
  triangle(gl);
}
