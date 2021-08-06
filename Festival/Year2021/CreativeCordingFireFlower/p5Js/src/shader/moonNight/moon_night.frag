precision highp float;
precision highp int;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
// out
varying vec2 vTexCoord;
#define PI2 6.28318530718
#define PI 3.141592653589793

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  return coord;
}

float gRect(vec2 position, vec2 size){
  position = abs(position) - size;
  return length(max(position, 0.0)) + min(max(position.x, position.y), 0.0);
}

float gCircle(vec2 position, float radius){
  return length(position) - radius;
}

vec2 translate(vec2 position, vec2 offset){
  return position - offset;
}


vec3 background(vec2 position){
  vec3 seaColor1 = vec3(0.0745, 0.0784, 0.2392);
  vec3 seaColor2 = vec3(0.0353, 0.0706, 0.3882);

  vec3 seaColor = mix(seaColor1, seaColor2, position.y);

  return seaColor;
}

vec3 create(vec2 position){
  
  vec2 size = vec2(0.25, 0.25);  

  position = translate(position, vec2(cos(time * 0.05), 0.2));
  float radius = 0.05;
  float circle = gCircle(position, radius);
  
  float d = circle;
  
  vec3 color1 = vec3(1.0, 1.0, 0.5);
  vec3 color2 = background(position);

  vec3 color = mix(color1, color2, smoothstep(-0.005, 0.005, d));

  return color;
}

void main(){
  vec2 position = vTexCoord;
  
  position = wave_effect(position);

  vec3 color = create(position);
  gl_FragColor = vec4(color, 1.0);
}