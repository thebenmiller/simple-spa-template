require('./css/main.css');

const triangle = require('a-big-triangle');
const createShader = require('gl-shader');
const glsl = require('glslify');
const fit = require('canvas-fit');
const loop = require('raf-loop');

const vert = require('./shaders/vert.glsl');
const frag = require('./shaders/frag.glsl');

// set up initial GL context
const gl = require('webgl-context')({
  width: window.innerWidth,
  height: window.innerHeight
});

// set up canvas renderer
const canvas = gl.canvas;
document.body.appendChild(canvas);
window.addEventListener('resize', fit(canvas), false);

// set up UI controls
const dat = require('dat.gui/build/dat.gui.js');
const Stats = require('stats.js');
const stats = new Stats();
const controls = new dat.GUI();

let controllerOptions = {
  message: 'test',
  slider: 1
};

controls.add(controllerOptions, 'message');
controls.add(controllerOptions, 'slider');

stats.showPanel(0);
document.body.appendChild(stats.dom);

// shader updating code
let i = 0.0;

const shader = createShader(gl, vert, frag);
shader.uniforms.iGlobalTime = i;

function render() {
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  gl.viewport(0, 0, width, height);

  shader.bind();
  shader.uniforms.iGlobalTime = i;

  triangle(gl);
  i += 0.01;
}

const looper = loop(() => {
  stats.begin();
  render();
  stats.end();
});
looper.start();
