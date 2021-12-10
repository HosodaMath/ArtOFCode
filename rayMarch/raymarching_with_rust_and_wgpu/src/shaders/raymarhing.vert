#version 450

layout(location = 0) in vec4 aColor;
layout(location = 1) in vec3 aPosition;
layout(location = 2) in vec3 aNormal;
layout(location = 3) in vec2 aTexcoord;

layout(location = 0) out vec4 vColor;
layout(location = 1) out vec3 vNormal;
layout(location = 2) out vec2 vTexCoord;
layout(location = 3) out vec2 vResolution;
layout(location = 4) out float vTime;

layout(set = 0, binding = 0) uniform Data {
    mat4 world_matrix;
    mat4 view_matrix;
    mat4 projection_matrix;
    vec2 u_resolution;
    float u_time;
} uniforms;

void main() {
    vTime = uniforms.u_time;
    vResolution = uniforms.u_resolution;
    vColor = aColor;
    vTexCoord = aTexcoord;
    vNormal = aNormal;
    mat4 worldview = uniforms.view_matrix * uniforms.world_matrix;
    gl_Position = uniforms.projection_matrix * worldview * vec4(aPosition, 1.0);
}
