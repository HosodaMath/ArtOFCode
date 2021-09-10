precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 createColor(vec4 coord){

  vec2 textureCoord = vec2(coord.x, coord.y);

  vec4 redTexture = texture2D(uTexture, textureCoord);
  vec4 greenTexture = texture2D(uTexture, textureCoord);
  vec4 blueTexture = texture2D(uTexture, textureCoord);

  vec4 calcTexture = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  vec4 color = vec4(coord.x, coord.y, 0.5, 1.0);

  vec4 calcColor = color * calcTexture;

  return calcColor;
}

void main(){
  vec4 coord = vertTexCoord;

  vec4 color = createColor(coord);

  gl_FragColor = color;
}
