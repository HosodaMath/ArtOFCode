precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI2 6.28318530718

float circle(vec2 position, float radius){
  return length(position) - radius;
}

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
    value *= 1.1;
    //value *= 5.00;
    amp *= 0.5;
    // amp *= abs(cos(time * 0.1));
  }

  return result;
}
vec3 rgbShift(vec2 coord){
  vec3 fbmValue1 = vec3(2.0 * coord, 0.1 * (time - 1.0));
  float n1 = fbm(fbmValue1);
  
  vec3 fbmValue2 = vec3(2.0 * coord, 0.1 * time);
  float n2 = fbm(fbmValue2);
  
  vec3 fbmValue3 = vec3(2.0 * coord, 0.1 * (time + 1.0));
  float n3 = fbm(fbmValue3);
  
  vec3 fbmValue = vec3(n1, n2, n3);

  return vec3(smoothstep(0.5, 0.55, fbmValue));
}

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  return coord;
}

vec3 createSea(vec2 coord){
  vec3 seaColor1 = vec3(0.1137, 0.1725, 0.4392);
  vec3 seaColor2 = vec3(0.1922, 0.2941, 0.7412);
  vec3 seaColor = mix(seaColor1, seaColor2, coord.y);

  return seaColor;
}

vec3 create(vec2 coord){
  /*
  vec3 color = mix(
    vec3(0.0, 0.0, 0.0), 
    rgbShift(coord), 
    smoothstep(-0.005, 0.005, circle(coord, 0.5)) 
  );*/
  float radius = clamp(0.0, 0.5, abs(cos(time * 0.1)));
  vec3 color = mix(
    rgbShift(coord), 
    createSea(coord), 
    smoothstep(-0.005, 0.005, circle(coord, radius)) 
  );

  return color;
}

void main(){
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);

  coord = wave_effect(coord);
  vec3 color = create(coord);
  
  gl_FragColor = vec4(color, 1.0);
}