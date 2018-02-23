precision mediump float;

#pragma glslify: noise = require(glsl-noise/simplex/3d)

uniform sampler2D texture;
uniform vec2 resolution;
varying vec2 texCoord;

void main() {
  gl_FragColor = texture2D(texture, texCoord);
}
