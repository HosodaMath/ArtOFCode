precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbSplit(vec2 coord){
  
  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = pixelSize * cos(uTime) * 10.0;

  vec4 redTexture1 = texture2D(uTexture1, coord - offset);
  vec4 greenTexture1 = texture2D(uTexture1, coord);
  vec4 blueTexture1 = texture2D(uTexture1, coord + offset);
  vec4 color1 = vec4(redTexture1.r, greenTexture1.g, blueTexture1.b, 1.0);

  vec4 redTexture2 = texture2D(uTexture2, coord - offset);
  vec4 greenTexture2 = texture2D(uTexture2, coord);
  vec4 blueTexture2 = texture2D(uTexture2, coord + offset);
  vec4 color2 = vec4(redTexture2.r, greenTexture2.g, blueTexture2.b, 1.0);

  vec4 calcRGBSplit = color1 * color2;

  return calcRGBSplit;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbSplit(locationCoord);

  gl_FragColor = color;
}
