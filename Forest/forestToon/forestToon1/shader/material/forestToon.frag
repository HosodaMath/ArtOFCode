precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main(){
  vec2 coord = vertTexCoord.xy;
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  float intensity = max(0.0, dot(vertNormal, vertLightDir));

  vec4 shadowColor;
  
  if(intensity > 0.95){
    shadowColor = vec4(0.851, 1.0, 0.7804, 1.0);
  } else if(intensity > 0.5){
    shadowColor = vec4(0.4745, 0.9216, 0.5137, 1.0);
  }  else if(intensity > 0.25){
    shadowColor = vec4(0.2471, 0.8392, 0.3961, 1.0);
  } else {
    shadowColor = vec4(0.1529, 0.4196, 0.2745, 1.0);
  }

  gl_FragColor = shadowColor;
}