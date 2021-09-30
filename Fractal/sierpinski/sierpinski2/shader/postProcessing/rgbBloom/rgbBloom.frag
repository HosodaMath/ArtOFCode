precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uBlurTexture;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 calcBlur(vec2 coord, sampler2D blurTexture, sampler2D textureData){
  vec3 calcTexture1 = texture2D(blurTexture, vec2(1.0)-coord).rgb;
  vec3 calcTexture2 = texture2D(textureData, coord).rgb;

  //float average = dot(calcTexture1, vec3(1.0)) / 3.0;
  float average = dot(calcTexture1, vec3(0.3333));

  vec3 bloomMix = mix(calcTexture2, calcTexture1, clamp(average * 1.25, 0.0, 1.0));

  vec4 calcColor = vec4(bloomMix, 1.0);

  return calcColor;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = calcBlur(locationCoord, uBlurTexture, uTexture);

  gl_FragColor = color;
}