precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

varying vec2 vTexCoord;
varying vec3 vNoise;

float random(vec3 value){
  return fract(sin(dot(value,vec3(12.9898,78.233,19.8321)))*43758.5453);
}

float noise(vec3 value){
  vec3 i=floor(value);
  vec3 f=smoothstep(0.,1.,fract(value));
  float color1=mix(
    mix(random(i),random(i+vec3(1.,0.,0.)),f.x),
    mix(random(i+vec3(0.,1.,0.)),random(i+vec3(1.,1.,0.)),f.x),
    f.y
  );
  float color2=mix(
    mix(random(i+vec3(0.,0.,1.)),random(i+vec3(1.,0.,1.)),f.x),
    mix(random(i+vec3(0.,1.,1.)),random(i+vec3(1.,1.,1.)),f.x),
    f.y
  );
  return mix(color1,color2,f.z);
}

void main(){
  vec2 coord = vTexCoord;
  
  vec3 color = vNoise;
  
  gl_FragColor = vec4(color, 1.0);
}