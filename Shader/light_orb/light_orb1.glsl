precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

vec3 createOrb(vec2 coord){
  vec3 destColor = vec3(0.3333, 0.9922, 0.6078);
  for(float x = 0.0; x < 5.0; x++){
    float y = x + 1.0;
    vec2 q = coord + vec2(tan(time * y), sin(time * y)) * 0.1;
    destColor += 0.05 / length(q);
  }

  return destColor;
}


vec3 create(vec2 coord){
  vec3 color1 = vec3(0.6157, 0.6745, 1.0);
  vec3 color2 = createOrb(coord);

  vec3 color = mix(color1, color2, coord.y); 
  
  return color;
}

void main(){
  // vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  
  vec3 color = create(coord);
  
  gl_FragColor = vec4(color, 0.0);
}