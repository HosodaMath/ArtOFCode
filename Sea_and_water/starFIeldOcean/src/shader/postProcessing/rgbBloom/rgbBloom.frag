precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uBlurTexture;
uniform sampler2D uTexture;
varying vec2 vTexCoord;

vec4 calcBloom(vec2 coord,sampler2D uBlurTexture , sampler2D uTexture){
  vec3 calcTexture1 = texture2D(uBlurTexture, vec2(1.0) - coord).rgb;
  vec3 calcTexture2 = texture2D(uTexture, coord).rgb;

  float average = dot(calcTexture1, vec3(0.33333));

  vec3 bloomMix = mix(calcTexture2, calcTexture1, clamp(average * 1.25, 0.0, 1.0));

  vec4 calcColor = vec4(bloomMix, 1.0);

  return calcColor;
}
void main(){
  vec2 coord = vTexCoord;

  vec4 color = calcBloom(coord, uBlurTexture, uTexture);

  gl_FragColor = color;
}