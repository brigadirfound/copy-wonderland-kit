import { useEffect, useRef, useState } from "react";
import { BG_RGB, currentLook, lookPalettes } from "@/lib/look";
import { cn } from "@/lib/utils";

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Живой градиент: большие мягкие пятна цвета, слегка деформированные simplex-шумом.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  return 0.65 * snoise(p) + 0.35 * snoise(p * 2.1 + 11.0);
}

vec2 orbit(vec2 base, vec2 amp, float t, float phase, float aspect) {
  return vec2((base.x + amp.x * sin(t + phase)) * aspect, base.y + amp.y * cos(t * 0.8 + phase * 1.3));
}

float blob(vec2 p, vec2 c, float k) {
  vec2 d = p - c;
  return exp(-dot(d, d) * k);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.1;

  // Мягкая «жидкая» деформация пространства.
  vec2 warp = vec2(
    fbm(p * 1.1 + vec2(t * 0.35, -t * 0.2)),
    fbm(p * 1.1 + vec2(4.7, 1.9) - vec2(t * 0.25, t * 0.3))
  );
  p += warp * 0.16;

  // Несколько больших светящихся пятен, которые медленно плавают.
  float a = blob(p, orbit(vec2(0.76, 0.70), vec2(0.07, 0.07), t, 0.0, aspect), 4.2);
  float b = blob(p, orbit(vec2(0.55, 0.98), vec2(0.10, 0.05), t, 2.1, aspect), 5.5);
  float c = blob(p, orbit(vec2(0.95, 0.42), vec2(0.05, 0.09), t, 4.2, aspect), 7.0);
  float d = blob(p, orbit(vec2(0.35, 0.85), vec2(0.12, 0.06), t, 1.3, aspect), 9.0);

  vec3 glow = uC1 * a + uC2 * b * 0.85 + uC3 * c * 0.6 + uC2 * d * 0.35;
  glow = 1.0 - exp(-glow * 1.35);
  float intensity = mix(0.85, 1.0, smoothstep(0.6, 1.4, aspect));
  vec3 col = uBg + glow * intensity * smoothstep(0.0, 0.5, uv.y);

  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) / 160.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Время «качается» туда-обратно, чтобы шум не терял точность на долгих сессиях.
const PING_PONG = 600;
const pingPong = (seconds: number) => PING_PONG - Math.abs((seconds % (2 * PING_PONG)) - PING_PONG);

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const [c1, c2, c3] = lookPalettes[currentLook()];
    gl.uniform3f(gl.getUniformLocation(program, "uBg"), ...BG_RGB);
    gl.uniform3f(gl.getUniformLocation(program, "uC1"), ...c1);
    gl.uniform3f(gl.getUniformLocation(program, "uC2"), ...c2);
    gl.uniform3f(gl.getUniformLocation(program, "uC3"), ...c3);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Градиент мягкий, поэтому рендерим в пониженном разрешении — это экономит батарею.
    const scale = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
    const startOffset = 14;
    const startedAt = performance.now();

    let raf = 0;
    let onScreen = true;
    let pageVisible = document.visibilityState === "visible";
    let shown = false;

    const resize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (seconds: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, pingPong(startOffset + seconds));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        setReady(true);
      }
    };

    const frame = (now: number) => {
      draw((now - startedAt) / 1000);
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduceMotion) {
        draw(0);
      } else if (onScreen && pageVisible) {
        raf = requestAnimationFrame(frame);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion || !raf) draw((performance.now() - startedAt) / 1000);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Если браузер отобрал WebGL-контекст — прячем канвас, под ним остаётся CSS-градиент.
    const onContextLost = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="glow-fallback absolute inset-0" />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
