// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const vec3 white = vec3(1);

float circle(vec2 center, vec2 position, float radius, float margin) {
    float d = distance(center, position) * 2.0;

    return 1.0 - smoothstep(radius, radius + margin, d);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 mouse = u_mouse/u_resolution;
    
	float myPosition = circle(mouse, st, 0.204, 0.026);
    
    vec3 bg = vec3(st, abs(sin(u_time)));
    
    vec3 myColor = mix(white, bg, myPosition);

    gl_FragColor = vec4(myColor,1.0);
}