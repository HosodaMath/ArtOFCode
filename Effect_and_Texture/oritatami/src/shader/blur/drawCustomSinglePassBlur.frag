precision highp float;

uniform vec2 uResolution;
uniform vec2 uTexelSize;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;

varying vec2 vTexCoord;

#define PI2 6.28318530718
#define PI 3.141592653589793

vec2 wave_effect(vec2 coord){
  
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec4 singleBlur(vec2 coord, sampler2D texture){
  float spread = 4.0;
  vec2 offset = uTexelSize * spread;

  // middle middle
  vec4 tex = texture2D(texture, coord);

  // top left
  tex += texture2D(texture, coord + vec2(-offset.x, -offset.y));
  // top middle
  tex += texture2D(texture, coord + vec2(0.0, -offset.y));
  // top right
  tex += texture2D(texture, coord + vec2(offset.x, -offset.y));

  // middle left
  tex += texture2D(texture, coord + vec2(-offset.x, 0.0));
  // middle right
  tex += texture2D(texture, coord + vec2(offset.x, 0.0));

  // bottom left
  tex += texture2D(texture, coord + vec2(-offset.x, offset.y));
  // bottom middle
  tex += texture2D(texture, coord + vec2(0.0, offset.y));
  // bottom right
  tex += texture2D(texture, coord + vec2(offset.x, offset.y));

  tex /= 9.0;

  return tex;
} 

vec4 rgbMirror(vec2 coord, sampler2D uTexture){
  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 texture = texture2D(uTexture, mirrorCoord);

  return texture;
}

vec4 drawImage(vec2 coord){
  
  vec4 texture1 = rgbMirror(coord, uTexture1);
  texture1.g = 1.0;
  texture1.b = 0.8;
  vec4 texture2 = rgbMirror(coord, uTexture2);
  vec4 texture3 = singleBlur(coord, uTexture3);
  vec4 texture = texture1 * texture2 * texture3;

  return texture;
}

void main(){
  vec2 coord = vTexCoord;

  coord = wave_effect(coord);

  gl_FragColor = drawImage(coord);
}
