precision highp float;
precision highp int;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;

// out
varying vec2 vTexCoord;

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

vec3 rgbShift(vec2 coord, vec4 calcTexture){
  
  vec3 red = vec3(calcTexture.r, (time - 1.0) * 0.1, coord.y);
  
  vec3 green = vec3(calcTexture.g, coord.x, time * 0.1);
  
  vec3 blue = vec3(calcTexture.b,  (time + 1.0) * 0.1, coord.y);
  
  vec3 fbmValue = vec3(fbm(red), fbm(green), fbm(blue));

  return vec3(smoothstep(0.5, 0.55, fbmValue));
}

void main(){
  
  vec2 coord = vTexCoord;

  vec2 mirror = vec2(
    abs(coord.x * 2.0 - 1.0),
    abs(coord.y * 2.0 - 1.0)
  );
  vec4 calcTexture = texture2D(uTexture, mirror);

  vec4 color = rgbShift(coord, calcTexture);

  gl_FragColor = color;
}
