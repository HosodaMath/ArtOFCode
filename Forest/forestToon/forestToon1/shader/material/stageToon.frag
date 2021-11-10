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
    shadowColor = vec4(0.3412, 0.8392, 0.4078, 1.0);
  } else if(intensity > 0.5){
    shadowColor = vec4(0.2235, 0.7882, 0.2549, 1.0);
  }  else if(intensity > 0.25){
    shadowColor = vec4(0.8392, 0.702, 0.2471, 1.0);
  } else {
    shadowColor = vec4(0.4196, 0.2941, 0.1529, 1.0);
  }

  gl_FragColor = shadowColor;
}