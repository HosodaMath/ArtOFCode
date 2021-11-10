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
    shadowColor = vec4(0.3412, 0.6824, 0.8392, 1.0);
  } else if(intensity > 0.5){
    shadowColor = vec4(0.2235, 0.4667, 0.7882, 1.0);
  }  else if(intensity > 0.25){
    shadowColor = vec4(0.2471, 0.2863, 0.8392, 1.0);
  } else {
    shadowColor = vec4(0.1529, 0.2, 0.4196, 1.0);
  }

  gl_FragColor = shadowColor;
}