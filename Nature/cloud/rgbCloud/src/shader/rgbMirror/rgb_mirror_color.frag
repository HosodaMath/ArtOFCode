precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;

// out
varying vec2 vTexCoord;



void main(){
  
  vec2 coord = vTexCoord;

  vec2 mirror = vec2(
    abs(coord.x * 2.0 - 1.0),
    abs(coord.y * 2.0 - 1.0)
  );
  vec4 calcTexture = texture2D(uTexture, mirror);

  vec4 color = vec4(0.3, coord.x, calcTexture.b, 1.0);

  gl_FragColor = color;
}
