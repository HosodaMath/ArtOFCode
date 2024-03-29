precision highp float;

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


void main(){
  
  vec2 coord = vTexCoord;

  vec2 mirror = vec2(
    abs(coord.x * 2.0 - 1.0),
    abs(coord.y * 2.0 - 1.0)
  );
  vec4 calcTexture = texture2D(uTexture, mirror);

  vec3 red = vec3(calcTexture.r, coord.x, coord.y);
  vec3 green = vec3(calcTexture.g, coord.x, coord.y);
  vec3 blue = vec3(calcTexture.b, coord.x, coord.y);

  vec4 color = vec4(noise(red), noise(green), calcTexture.b, 1.0);

  gl_FragColor = color;
}
