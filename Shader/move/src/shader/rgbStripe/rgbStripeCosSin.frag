precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

void main(){
  vec2 coord = vTexCoord;

  vec2 stripe = vec2(0.5, coord.y);
  vec4 textureCalc = texture2D(uTexture, stripe);

  float red = textureCalc.r;
  float green = abs(cos(time));
  float blue = abs(sin(time));

  vec4 color = vec4(red, green, blue, 1.0);

  gl_FragColor = color;
}