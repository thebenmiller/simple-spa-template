require('./css/main.css');

const triangle = require('a-big-triangle');
const createShader = require('gl-shader');
const glsl = require('glslify');
const fit = require('canvas-fit');

const gl = require('webgl-context')({
  width: window.innerWidth,
  height: window.innerHeight
});

const canvas = gl.canvas;
document.body.appendChild(canvas);
window.addEventListener('resize', fit(canvas), false);

const vert = require('./shaders/vert.glsl');
const frag = require('./shaders/frag.glsl');

const shader = createShader(gl, vert, frag);
shader.bind();
render();

function render() {
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  gl.viewport(0, 0, width, height);

  shader.bind();
  triangle(gl);
}
