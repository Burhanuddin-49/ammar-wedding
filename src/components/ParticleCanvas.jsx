import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const colors = [
      'rgba(243, 227, 172, ',
      'rgba(201, 162, 39, ',
      'rgba(223, 186, 75, ',
      'rgba(255, 248, 220, '
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = width < 768 ? 30 : 60;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = (resetToBottom = false) => {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: resetToBottom ? height + 10 : Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        baseAlpha: Math.random() * 0.6 + 0.25,
        alpha: 0,
        colorBase: colorBase,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.65 + 0.25),
        pulseOffset: Math.random() * Math.PI * 2,
        glowMultiplier: Math.random() > 0.8 ? 2.5 : 1
      };
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isHovering = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.0015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.3;
        p.y += p.vy;
        p.alpha = Math.max(0, p.baseAlpha * (0.6 + 0.4 * Math.sin(time * 3 + p.pulseOffset)));

        if (isHovering) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = ((100 - dist) / 100) * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(true);
        }

        const radius = p.size;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius * 3.5 * p.glowMultiplier
        );
        gradient.addColorStop(0, `${p.colorBase}${p.alpha})`);
        gradient.addColorStop(0.4, `${p.colorBase}${p.alpha * 0.45})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5 * p.glowMultiplier, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${p.colorBase}${Math.min(1, p.alpha * 1.5)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}
