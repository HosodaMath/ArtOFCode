precision highp float;
precision highp int;

uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;
varying vec3 vertNormal;
varying vec3 vertLightDir;

void main(){
  
  vec4 locationCoord = vertTexCoord;
  
  vec2 coord = vec2(locationCoord.x, locationCoord.y);

  vec3 calcColor = vec3(coord.x, coord.y, 1.0);

  float intensity = max(0.0, dot(vertLightDir, vertNormal));
  vec3 diffuse = vertColor.xyz * intensity * calcColor;
  
  vec4 color = vec4(diffuse, vertColor.w);
  vec4 calcTexture = texture2D(uTexture, coord);

  vec4 outColor = color * calcTexture;

  gl_FragColor = outColor;
}