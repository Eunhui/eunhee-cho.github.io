import { useEffect, useRef } from "react";
import silhouetteData from "./silhouette.json";

const DOT_SIZE = 3;
const GAP = 3;
const COLS = 60;
const ROWS = 80;
const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 5;

export default function PixelSilhouette() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const dotsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const W = COLS * (DOT_SIZE + GAP);
    const H = ROWS * (DOT_SIZE + GAP);
    canvas.width = W;
    canvas.height = H;

    // Init dots with home positions
    dotsRef.current = silhouetteData.map(([gx, gy]) => ({
      hx: gx * (DOT_SIZE + GAP) + DOT_SIZE / 2,
      hy: gy * (DOT_SIZE + GAP) + DOT_SIZE / 2,
      x: gx * (DOT_SIZE + GAP) + DOT_SIZE / 2,
      y: gy * (DOT_SIZE + GAP) + DOT_SIZE / 2,
      vx: 0,
      vy: 0,
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      dotsRef.current.forEach((dot) => {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          dot.vx += (dx / dist) * force * REPEL_STRENGTH;
          dot.vy += (dy / dist) * force * REPEL_STRENGTH;
        }

        // Spring back to home
        dot.vx += (dot.hx - dot.x) * 0.12;
        dot.vy += (dot.hy - dot.y) * 0.12;

        // Damping
        dot.vx *= 0.75;
        dot.vy *= 0.75;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Color based on distance from mouse
        const distFromMouse = Math.sqrt(
          (dot.x - mx) ** 2 + (dot.y - my) ** 2
        );
        const proximity = Math.max(0, 1 - distFromMouse / REPEL_RADIUS);
        const r = Math.round(100 + proximity * 155);
        const g = Math.round(255);
        const b = Math.round(218 + proximity * 37);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.7 + proximity * 0.3})`;

        ctx.beginPath();
        ctx.roundRect(
          dot.x - DOT_SIZE / 2,
          dot.y - DOT_SIZE / 2,
          DOT_SIZE,
          DOT_SIZE,
          1
        );
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        display: "block",
      }}
    />
  );
}
