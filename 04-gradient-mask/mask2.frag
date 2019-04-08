// Author:
// Title:
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
const vec2 center = vec2(.5);
const vec3 white = vec3(1.);
float circle (vec2 c, vec2 p, float r, float m ) {
    float d = distance(c, p) * 2.0;

    // if ( d < r ) return 1.0;
    // if ( d < r + m ) return 1.0 - smoothstep(r, r+m, d);

    return 1.0 - smoothstep(r, r+m, d);

    //return 0.0;
}
// float square (vec2 c, float s) {
//     float s2 = s/2.0;

//     if ( c.x < c.x+s2 )
// }
float rand(float x) {
    return fract(sin(x));
}
float noise (float x) {
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec2 mouse = u_mouse/u_resolution;
    // mouse.y = 1.0 - mouse.y;

    //vec2 p = st + vec2(sin(u_time) * .5, cos(u_time) * .5);
    vec2 p = st;// + mouse;

    float a = atan(st.y,st.x);
    float r2 = sin(u_time+a*16.0);
    float c = circle(center,p, 0.444 + .05 * r2, 0.016);
    vec3 bg = vec3(st,abs(sin(u_time)));

   vec3 color = mix( white,bg,c);
    gl_FragColor = vec4(color,1.0);
}