precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec4 vertTexCoord;
varying vec4 vertColor;
varying vec3 vertNormal;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;

vec3 background(vec2 position){
  vec3 color = mix(
    vec3(0.0078, 0.0235, 0.2863), 
    vec3(0.3059, 0.3333, 0.7882), 
    position.y
  );
  return color;
}


vec2 rotate(vec2 position, float radian){
  float c = cos(-radian);
  float s = sin(-radian);
  vec2 calc = mat2(c, s, -s, c) * position;

  return calc;
}

float sphere(vec3 position, float radius){
  return length(position) - radius;
}

float torus(vec3 position){
  vec2 t = vec2(0.75, 0.25);
  vec2 radius = vec2(length(position.xy) - t.x, position.z);

  return length(radius) - t.y;
}

float map(vec3 position){
  position = mod(position, 5.0) - 2.5;
  
  float radius = 1.0;
  float g_sphere = sphere(position, radius);

  vec3 size = vec3(1.0, 1.0, 1.0);
  float g_torus = torus(position);

  float t = sin(uTime * 5.0) * 0.5 + 0.5;
  float d = mix(g_sphere, g_torus, t);

  return d;
}

vec3 calcNormal(vec3 position){
  float e = 0.01;
  float mapping1 = map(position + vec3(e, 0.0, 0.0)) - map(position - vec3(e, 0.0, 0.0));
  float mapping2 = map(position + vec3(0.0, e, 0.0)) - map(position - vec3(0.0, e, 0.0));
  float mapping3 = map(position + vec3(0.0, 0.0, e)) - map(position - vec3(0.0, 0.0, e));

  return normalize(vec3(mapping1, mapping2, mapping3));
}

vec3 raymarch(vec3 ro, vec3 rayDictance, vec2 coord){
  const int rayLoopMax = 64;
  vec3 position = ro;
  vec3 directionalLight = vec3(-0.5, 0.5, 0.5);
  //vec3 gradientColor = vec3(coord.x, coord.y, 0.5);
  vec3 gradientColor = vec3(coord.x, coord.y, 0.5);
  for(int i = 0; i < rayLoopMax; i++){
    float objectDistance = map(position);
    position += objectDistance * rayDictance;
    if(objectDistance < 0.01){
      vec3 normal = calcNormal(position);
      float diffuese = clamp(dot(directionalLight, normal), 0.1, 1.0);
      vec3 mainColor = vec3(diffuese, diffuese, diffuese);
      mainColor += gradientColor;
      
      return mainColor;
    }
  }

  vec3 bgColor = background(coord);

  return bgColor;
}

void main() {
  vec4 locationCoord = vertTexCoord;
  vec2 coord = vec2(locationCoord.x, locationCoord.y);
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  
  coord = rotate(coord, uTime * 0.05);
  
  vec3 ro = vec3(10.0 * vec2(0.5, 0.5) - 5.0, - uTime);
  vec3 ta = vec3(0.0, 0.0, -5.0 - uTime);

  vec3 normalColor = vec3(1.0, 1.0, 1.0);
  vec3 cameraZ = normalize(ta - ro);
  vec3 cameraX = normalize(cross(cameraZ, normalColor));
  vec3 cameraY = cross(cameraX, cameraZ);

  vec3 rayDictance = normalize(cameraX * coord.x + cameraY * coord.y + 1.5 * cameraZ);
  
  vec4 raymarchColor = vec4(vec3(raymarch(ro, rayDictance, coord)), 1.0);

  gl_FragColor = raymarchColor;
}
