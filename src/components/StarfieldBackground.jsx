import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function StarfieldBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // In light mode, just clear and bail
    if (theme !== 'dark') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const layers = [
      { count: 120, speed: 0.15, sizeRange: [0.5, 1.2], parallax: 0.01 },
      { count: 80, speed: 0.25, sizeRange: [1, 2], parallax: 0.02 },
      { count: 30, speed: 0.4, sizeRange: [1.5, 2.5], parallax: 0.04 },
    ];

    const stars = layers.flatMap((layer) =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
        speed: layer.speed,
        parallax: layer.parallax,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        baseOpacity: 0.3 + Math.random() * 0.5,
      }))
    );

    const handleMouse = (e) => {
      mouseX = e.clientX - canvas.width / 2;
      mouseY = e.clientY - canvas.height / 2;
    };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity + twinkle * 0.3;
        const px = star.x + mouseX * star.parallax;
        const py = star.y + mouseY * star.parallax;

        ctx.beginPath();
        ctx.arc(
          ((px % canvas.width) + canvas.width) % canvas.width,
          ((py % canvas.height) + canvas.height) % canvas.height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(180, 200, 255, ${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, display: theme === 'dark' ? 'block' : 'none' }}
    />
  );
}
