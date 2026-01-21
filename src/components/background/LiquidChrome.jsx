import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./LiquidChrome.css";

export default function LiquidChrome({
  baseColor = [0.78, 0.85, 0.62],
  speed = 0.6,
  amplitude = 0.35,
  frequencyX = 3.5,
  frequencyY = 3.5,
  interactive = true,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ antialias: true });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: `
        attribute vec2 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;

        uniform float uTime;
        uniform vec3 uResolution;
        uniform vec3 uBaseColor;
        uniform float uAmplitude;
        uniform float uFreqX;
        uniform float uFreqY;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          for (float i = 1.0; i < 8.0; i++) {
            uv.x += uAmplitude / i * cos(i * uFreqX * uv.y + uTime);
            uv.y += uAmplitude / i * sin(i * uFreqY * uv.x + uTime);
          }

          float glow = 1.2 / length(uv);
          vec3 color = uBaseColor * glow;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1, 1]) },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFreqX: { value: frequencyX },
        uFreqY: { value: frequencyY },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { offsetWidth, offsetHeight } = container;
      renderer.setSize(offsetWidth, offsetHeight);
      program.uniforms.uResolution.value.set([
        offsetWidth,
        offsetHeight,
        offsetWidth / offsetHeight,
      ]);
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId;
    const update = (t) => {
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);

      if (rendererRef.current) {
        try {
          const canvas = rendererRef.current.gl.canvas;
          canvas?.parentNode?.removeChild(canvas);
          rendererRef.current.gl
            .getExtension("WEBGL_lose_context")
            ?.loseContext();
        } catch {}
        rendererRef.current = null;
      }
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY]);

  return <div ref={containerRef} className="liquidChrome-container" />;
}