#version 450

layout(location=0) in vec4 vColor;
layout(location=1) in vec3 vNormal;
layout(location=2) in vec2 vTexCoord;
layout(location=3) in vec2 vResolution;
layout(location=4) in float vTime;

layout(location=0) out vec4 outColor;

const float PI2 = 6.28318530718;

void main(){
    vec2 coord = vTexCoord;
    coord = (2.0 * gl_FragCoord.xy - vResolution) / min(vResolution.x, vResolution.y);

    vec4 bgColor = vColor;
        
    outColor = bgColor;
}
