#version 450

layout(location=0)in vec4 vColor;
layout(location=1)in vec3 vNormal;
layout(location=2)in vec2 vTexCoord;
layout(location=3)in vec2 vResolution;
layout(location=4)in float vTime;

layout(location=0)out vec4 outColor;

const float PI2=6.28318530718;

vec3 background(vec2 position){
    vec3 color=mix(
        vec3(.0078,.0235,.2863),
        vec3(.3059,.3333,.7882),
        position.y
    );
    return color;
}

vec2 rotate(vec2 position,float radian){
    float c=cos(-radian);
    float s=sin(-radian);
    vec2 calc=mat2(c,s,-s,c)*position;
    
    return calc;
}

float sphere(vec3 position,float radius){
    return length(position)-radius;
}

float torus(vec3 position){
    vec2 t=vec2(.75,.25);
    vec2 radius=vec2(length(position.xy)-t.x,position.z);
    
    return length(radius)-t.y;
}

float map(vec3 position){
    position=mod(position,5.)-2.5;
    
    float radius=1.;
    float g_sphere=sphere(position,radius);
    
    vec3 size=vec3(1.,1.,1.);
    float g_torus=torus(position);
    
    float t=sin(vTime*5.)*.5+.5;
    float d=mix(g_sphere,g_torus,t);
    
    return d;
}

vec3 calcNormal(vec3 position){
    float e=.01;
    float mapping1=map(position+vec3(e,0.,0.))-map(position-vec3(e,0.,0.));
    float mapping2=map(position+vec3(0.,e,0.))-map(position-vec3(0.,e,0.));
    float mapping3=map(position+vec3(0.,0.,e))-map(position-vec3(0.,0.,e));
    
    return normalize(vec3(mapping1,mapping2,mapping3));
}

vec3 raymarch(vec3 ro,vec3 rayDictance,vec2 coord){
    const int rayLoopMax=64;
    vec3 position=ro;
    vec3 directionalLight=vec3(-.5,.5,.5);
    vec3 gradientColor=vec3(coord.x,coord.y,.5);
    for(int i=0;i<rayLoopMax;i++){
        float objectDistance=map(position);
        position+=objectDistance*rayDictance;
        if(objectDistance<.01){
            vec3 normal=calcNormal(position);
            float diffuese=clamp(dot(directionalLight,normal),.1,1.);
            vec3 mainColor=vec3(diffuese,diffuese,diffuese);
            mainColor+=gradientColor;
            
            return mainColor;
        }
    }
    
    vec3 bgColor=background(coord);
    
    return bgColor;
}

void main(){
    vec2 coord=vTexCoord;
    coord=(2.*gl_FragCoord.xy-vResolution)/min(vResolution.x,vResolution.y);
    
    coord=rotate(coord,vTime*.05);
    
    vec3 ro=vec3(10.*vec2(.5,.5)-5.,-vTime);
    vec3 ta=vec3(0.,0.,-5.-vTime);
    
    vec3 normalColor=vec3(1.,1.,1.);
    vec3 cameraZ=normalize(ta-ro);
    vec3 cameraX=normalize(cross(cameraZ,normalColor));
    vec3 cameraY=cross(cameraX,cameraZ);
    
    vec3 rayDictance=normalize(cameraX*coord.x+cameraY*coord.y+1.5*cameraZ);
    
    vec4 raymarchColor=vec4(vec3(raymarch(ro,rayDictance,coord)),1.);
    
    outColor=raymarchColor;
}
