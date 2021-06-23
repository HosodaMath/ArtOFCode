precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
const float PI = 3.141592653589793;
const float TWO_PI = 6.283185307179586;

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

float createOrb(vec2 coord){
  float destColor = 0.0;
  for(float x = 0.0; x < 5.0; x++){
    float y = x + 1.0;
    vec2 q = coord + vec2(cos(time * y), tan(time * y)) * 0.8;
    destColor += 0.05 / length(q);
  }

  return destColor;
}

vec3 createColor(vec2 uv){
  vec2 position = uv;
  
  vec3 color1 = vec3(0.651, 1.0, 0.7961); 
  
  float size = 10.0;
  vec3 color2 = vec3(0.0, voronoi1(uv * size), 1.0);
  
  float ring = createOrb(position);
  vec3 color = mix(color1, color2, ring);

  return color;
}

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * TWO_PI);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * TWO_PI);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * TWO_PI);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * TWO_PI);
  
  return coord;
}

void main(){
  // vec2 coord = gl_FragCoord.xy / resolution.xy;
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  uv = wave_effect(uv);
  vec3 color = createColor(uv);
  gl_FragColor = vec4(color, 1.0);
}