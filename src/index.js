require('./css/main.css');

const triangle = require('a-big-triangle');
const createShader = require('gl-shader');
const createTexture = require('gl-texture2d');
const glsl = require('glslify');
const fit = require('canvas-fit');
const loop = require('raf-loop');

const vert = require('./shaders/vert.glsl');
const frag = require('./shaders/frag.glsl');

const tiny = require('./assets/tiny.png');

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

const image = new Image();
image.src = tiny;
let texture = createTexture(gl, image);

image.onload = () => {
  texture = createTexture(gl, image);

  const isPowerOf2 =
    (image.width & (image.width - 1)) == 0 &&
    (image.height & (image.height - 1)) == 0;

  if (isPowerOf2) {
    texture.wrap = gl.MIRRORED_REPEAT;
  } else {
    texture.wrap = gl.CLAMP_TO_EDGE;
    texture.minFilter = gl.LINEAR;
  }
};

const shader = createShader(gl, vert, frag);
shader.uniforms.iGlobalTime = i;
shader.uniforms.texture = texture;

function render() {
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  gl.viewport(0, 0, width, height);
  shader.uniforms.resolution = [10, 10];

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
