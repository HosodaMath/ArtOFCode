precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define TWO_PI 6.283185307179586

vec3 wave(vec2 position) {
  vec2 add = vec2(cos(position.x), sin(position.y));
  float len = length(20.0 * add);
  float t = cos(len - time);
  float s = t * 0.5 + 0.5;

  return vec3(s);
}

/*
vec3 createColor(vec3 data, vec2 uv){
  vec3 color1 = vec3(0.0, uv.x, uv.y);
  vec3 color2 = vec3(0.1804, 0.0157, 0.4863);
  return mix(color1, color2, smoothstep(0.8, 0.9, data));
}
*/

vec3 createColor(vec3 data, vec2 uv){
  vec3 color1 = vec3(
    0.0, 
    abs(tan(cos(uv.x + time + 2.0) + 2.0 + time * 0.5)),
    abs(tan(sin(uv.y + time + 1.5) + 3.0 * time * 0.3))
  );
  vec3 color2 = vec3(0.1804, 0.0157, 0.4863);
  return mix(color1, color2, smoothstep(0.8, 0.9, data));
}

void main(void){
  vec2 uv = gl_FragCoord.xy / resolution;

  vec2 position = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  
  vec3 wave = wave(position);
  vec3 color = createColor(wave, uv);
  
  gl_FragColor = vec4(color, 1.0);
}