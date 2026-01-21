import { useEffect, useRef } from "react";

export default function LiquidChrome() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(
        width * Math.sin(t * 0.2),
        0,
        width,
        height
      );

      /* Tuned palette */
      gradient.addColorStop(0, "rgba(197,216,157,0.9)"); // primary green
      gradient.addColorStop(0.5, "rgba(246,240,215,0.6)"); // softened beige
      gradient.addColorStop(1, "rgba(137,152,109,0.85)"); // dark olive

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      t += 0.005;
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}