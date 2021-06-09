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

vec3 createColor(vec2 uv){

  vec3 color1_1 = vec3(1.0, 0.4863, 0.7255);
  vec3 color1_2 = vec3(1.0, 0.6078, 0.4863);
  float circle_data = circle(vec2(cos(uv.x * time * 0.5), sin(uv.y * time * 0.5)));
  vec3 color1 = vec3(mix(color1_1, color1_2, circle_data));
  vec3 color2 = vec3(vec2(fbm(vec3(uv * 10.0, abs(cos(time * 0.5))))), 1.0);
  vec3 color = mix(color1, color2, uv.y);

  return color;
}

void main(){
  vec2 p = gl_FragCoord.xy / resolution;
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 color = createColor(uv);
  gl_FragColor = vec4(color, 1.0);
}