precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec4 rgbMirror(vec2 coord){
  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 calcTexture1 = texture2D(uTexture, mirrorCoord);
  
  vec4 color1 = vec4(0.2353, 0.4471, 0.7216, 1.0);
  vec4 color2 = vec4(0.3725, 0.2471, 0.6588, 1.0);
  vec4 calcColor = mix(color1, color2, coord.y);

  vec4 calcTexture = calcTexture1 * calcColor;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  locationCoord = wave_effect(locationCoord);

  vec4 color = rgbMirror(locationCoord);

  gl_FragColor = color;
}
