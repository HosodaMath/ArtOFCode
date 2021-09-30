precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uBlurTexture;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 calcBlur(
  vec2 coord, 
  sampler2D blurTexture, 
  sampler2D textureData1, 
  sampler2D textureData2
  ){
  vec3 calcTexture0 = texture2D(blurTexture, vec2(1.0)-coord).rgb;
  vec3 calcTexture1 = texture2D(textureData1, coord).rgb;
  vec3 calcTexture2 = texture2D(textureData1, coord).rgb;

  //float average = dot(calcTexture1, vec3(1.0)) / 3.0;
  float average = dot(calcTexture0, vec3(0.3333));

  vec3 bloomMix1 = mix(calcTexture1, calcTexture0, clamp(average * 1.25, 0.0, 1.0));
  vec3 bloomMix2 = mix(calcTexture2, calcTexture0, clamp(average * 1.25, 0.0, 1.0));
  vec3 bloomMix = bloomMix1 * bloomMix2;

  vec4 calcColor = vec4(bloomMix, 1.0);

  return calcColor;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = calcBlur(locationCoord, uBlurTexture, uTexture1, uTexture2);

  gl_FragColor = color;
}