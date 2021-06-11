precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float orb(vec2 coord){
  float dest = 0.0;
  for(float x = 0.0; x < 10.0; x++){
    float y = x + 0.1;
    vec2 q = coord + vec2(cos(time * (y * 0.1) * 4.5), sin(time * (y * 0.1) * 1.5)) * 0.2;
    dest += 0.05 / length(q);
  }

  return dest;
}

vec3 create(vec2 coord){ 
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(0.3255, 0.9804, 0.7608);
  vec3 color = mix(color1, color2, orb(coord));
  
  return color;
}

void main(){
  // vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 color = create(coord);  
  gl_FragColor = vec4(color, 0.0);
}