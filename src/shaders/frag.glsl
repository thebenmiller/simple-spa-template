precision mediump float;

#pragma glslify: noise = require(glsl-noise/simplex/3d)

uniform float iGlobalTime;

void main () {
  float brightness = noise(vec3(gl_FragCoord.xy, iGlobalTime));
  gl_FragColor = vec4(vec3(brightness), 1.);
}
