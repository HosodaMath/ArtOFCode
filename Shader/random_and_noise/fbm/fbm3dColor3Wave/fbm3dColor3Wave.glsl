precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

float noise(vec3 value){
  vec3 i = floor(value);
  vec3 f = smoothstep(0.0, 1.0, fract(value));
  float color1 = 	mix(
		mix(random(i), random(i + vec3(1.0, 0.0, 0.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 0.0)), random(i + vec3(1.0, 1.0, 0.0)), f.x),
		f.y
	);
  float color2 = mix(
		mix(random(i + vec3(0.0, 0.0, 1.0)), random(i + vec3(1.0, 0.0, 1.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 1.0)), random(i + vec3(1.0, 1.0, 1.0)), f.x),
		f.y
	);
  return mix(color1,color2,f.z);
}

float fbm(vec3 value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

float circle(vec2 uv){
  return length(uv * 2.0 - 1.0);
}


vec3 wave(vec2 position) {
  vec2 add = vec2(abs(cos(position.x)), abs(sin(position.y)));
  float len = length(20.0 * add);
  float t = cos(len - time);
  float s = t * 0.5 + 0.5;

  return vec3(s);
}

vec3 createColor(vec2 p,vec2 uv){

  vec3 color1 = vec3(
    fbm(vec3(p * 10.0, abs(cos(time * 0.5)))), 
    fbm(vec3(p * 10.0, abs(sin(time * 0.5)))), 
    1.0);
  vec3 color2 = vec3(0.2314, 1.0, 0.7451);
  
  vec3 color = mix(color1, color2, wave(uv));

  return color;
}

void main(){
  vec2 p = gl_FragCoord.xy / resolution;
  vec2 uv = (10.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 color = createColor(p, uv);
  gl_FragColor = vec4(color, 1.0);
}