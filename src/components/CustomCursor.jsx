import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SEGMENTS = 18;

export default function CustomCursor() {
  const [segments, setSegments] = useState(
    Array.from({ length: SEGMENTS }, () => ({
      x: -100,
      y: -100,
      angle: 0,
    }))
  );

  useEffect(() => {
    let mouse = { x: -100, y: -100 };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    let frame;

    const animate = () => {
      setSegments((prev) => {
        const next = [...prev];

        next[0] = {
          ...next[0],
          x: mouse.x,
          y: mouse.y,
        };

        for (let i = 1; i < SEGMENTS; i++) {
          const dx = next[i - 1].x - next[i].x;
          const dy = next[i - 1].y - next[i].y;

          next[i] = {
            x: next[i].x + dx * 0.35,
            y: next[i].y + dy * 0.35,
            angle: Math.atan2(dy, dx) * (180 / Math.PI),
          };
        }

        return next;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {segments.map((segment, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[9999]"
          animate={{
            x: segment.x,
            y: segment.y,
            rotate: segment.angle,
          }}
          transition={{
            duration: 0.05,
          }}
          style={{
            width: `${26 - index * 0.8}px`,
            height: `${18 - index * 0.5}px`,
            borderRadius: "999px",
            background: "white",
            opacity: 1 - index * 0.03,
            transformOrigin: "center center",
            mixBlendMode: "difference",
          }}
        />
      ))}
    </>
  );
}