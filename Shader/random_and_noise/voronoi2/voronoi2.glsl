precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

vec2 random2(vec2 coord){  
  vec2 value = fract(
    sin(vec2(dot(coord, vec2(127.1, 311.7)), 
    dot(coord, vec2(269.5, 183.3)))) * 43758.5453
  );
  return value;
}

float voronoi1(vec2 coord){
  vec2 point = floor(coord);
  float minimum_dist = 1.0;
  for(int x = -1; x <= 1; x++){
    for(int y = -1; y <= 1; y++){
      vec2 nb = point + vec2(x, y);
      float dist = distance(coord, nb + random2(nb));
      minimum_dist = min(minimum_dist, dist);
    }
  }

  return minimum_dist;
}

void main(){
  // vec2 coord = gl_FragCoord.xy / resolution.xy;
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  float size = abs(cos(time * 0.05)) * 10.0;
  vec3 color = vec3(0.0, voronoi1(uv * size), 1.0);
  gl_FragColor = vec4(color, 1.0);
}