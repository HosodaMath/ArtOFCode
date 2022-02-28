#version 300 es
precision highp float;
precision highp int;
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;

out vec4 fragColor;

void main(void){
  
  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y); 
  
  vec4 color = vColor;
  
  fragColor = color;
}