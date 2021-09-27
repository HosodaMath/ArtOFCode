precision highp float;
precision highp int;

uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uScale;
uniform sampler2D uTexture;

varying vec3 vNoise;
varying vec2 vTexCoord;

vec4 rgbSplit(vec2 coord){
  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = vec2(
    pixelSize.x * uScale.x, 
    pixelSize.y * uScale.y
  );

  vec4 redTexture = texture2D(uTexture, coord - offset);
  vec4 greenTexture = texture2D(uTexture, coord);
  vec4 blueTexture = texture2D(uTexture, coord + offset);
  
  vec4 color = vec4(vNoise, 1.0);
  vec4 calcTexture = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0) * color;

  return calcTexture;
}

void main(){
  vec2 coord = vTexCoord;

  vec4 color = rgbSplit(coord);

  gl_FragColor = color;
}