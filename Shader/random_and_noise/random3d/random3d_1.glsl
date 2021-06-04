precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

float rect(vec2 position, vec2 size){
  vec2 d = abs(position) - size;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float random3d(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

vec3 createColor(vec2 position){
  vec3 color1 = vec3(
    random3d(vec3(position, 1.0)), 
    abs(cos(position.x + (time * 0.5))), 
    abs(tan(position.y + (time * 0.5))));

  vec2 rectPosition = vec2(0.5, 0.5);
  vec2 rectSize = vec2(0.1, 0.008);
  vec3 color2 = mix(
    vec3(1.0, 1.0, random3d(vec3(position, 1.0))), 
    vec3(0.0, 1.0, 1.0), 
    smoothstep(0.0, 2.0 / position.y, rect(rectPosition, rectSize))
  );

  
  vec3 color = mix(color1, color2, position.x);

  return color;
}

void main(){
   vec2 position = gl_FragCoord.xy / resolution;
   vec3 color = createColor(position);
   gl_FragColor = vec4(color, 1.0);
}