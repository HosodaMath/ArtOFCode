precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float vFrameCount;

varying vec3 vertNormal;
varying vec3 vertLightDir;

void main(){
  float intensity = max(0.0, dot(vertNormal, vertLightDir));
  vec4 color;

  if(intensity > 0.95){
    color = vec4(0.7, 0.7, 1.0, 1.0);
  } else if(intensity > 0.5){
    color = vec4(0.5, 0.5, 1.0, 1.0);
  }  else if(intensity > 0.25){
    color = vec4(0.1, 0.2, 1.0, 1.0);
  } else {
    color = vec4(0.0, 0.0, 0.6, 1.0);
  }

  gl_FragColor = color;
}