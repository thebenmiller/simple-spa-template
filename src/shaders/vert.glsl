attribute vec2 position;
varying vec2 texCoord;

void main() {
  texCoord = vec2(0.5, 0.5) * (position.xy + 1.0);
  gl_Position = vec4(position, 0.0, 1.0);
}
