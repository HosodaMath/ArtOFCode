precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
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
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

vec4 createSand(vec2 position){
  vec3 color = vec3(
    0.2, 
    fbm(vec3(position * 10.0, abs(sin(uTime * 0.5)))), 
    1.0);

  vec2 q = vec2(0.0);
  q.x = fbm(vec3(position * 10.0, abs(cos(uTime * 0.5))));
  q.y = fbm(vec3(position * 10.0, abs(sin(uTime * 0.5))));

  vec2 r = vec2(0.0);
  r.x = fbm(vec3(position + 1.0 * q + vec2(1.7, 9.2), 0.15 * uTime));
  r.y = fbm(vec3(position + 1.0 * q + vec2(8.3, 2.8), 0.126 * uTime));

  float f = fbm(vec3(position + q, uTime * 0.1));

  color = mix(
    vec3(0.6667, 0.4706, 0.102), 
    vec3(0.902, 0.702, 0.4), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.502, 0.2941, 0.0235), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(1.0, 0.7137, 0.102), 
    clamp(length(r.x), 0.0, 1.0)
  );
  
  vec4 calcColor = vec4(vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);

  return calcColor;
}

void main(){
  vec2 coord = vertTexCoord.xy;
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec2 position = coord;
  position *= 10.0;

  vec4 bgColor = createSand(position);

  float intensity = max(0.0, dot(vertNormal, vertLightDir));
  vec4 grassColor;
  if(intensity > 0.95){
    grassColor = vec4(1.0, 0.9294, 0.7804, 1.0);
    bgColor += grassColor;
  } else if(intensity > 0.5){
    grassColor = vec4(0.4745, 0.9216, 0.498, 1.0);
    bgColor += grassColor;
  }  else if(intensity > 0.25){
    grassColor = vec4(0.2667, 0.8392, 0.2471, 1.0);
    bgColor += grassColor;
  } else {
    grassColor = vec4(0.4196, 0.3137, 0.1529, 1.0);
    bgColor += grassColor;
  }

  gl_FragColor = bgColor;
}