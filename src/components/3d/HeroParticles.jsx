import React, { useEffect, useRef } from 'react';

/**
 * CampusXchange HeroParticles
 * Monochrome interactive campus network visualization.
 * Represents connected student nodes across university campuses.
 */
export const HeroParticles = ({ className = 'absolute inset-0' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let width, height;

    const mouse = { x: -999, y: -999 };

    const resize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // ── Node class ────────────────────────────────────────────────
    class Node {
      constructor() {
        this.reset(true);
      }
      reset(init = false) {
        this.x  = init ? Math.random() * width  : (Math.random() < 0.5 ? -5 : width + 5);
        this.y  = init ? Math.random() * height : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r  = Math.random() * 1.8 + 0.8;
        this.hub = Math.random() > 0.88;
        if (this.hub) this.r = 3.2;
        this.alpha = Math.random() * 0.5 + 0.3;
        this.phase = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.phase += 0.025;

        // Soft mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        // Wall bounce
        if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
          this.reset();
        }
      }
      draw() {
        const pulse = this.hub ? Math.sin(this.phase) * 0.6 : 0;
        const r = this.r + pulse;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha * (this.hub ? 1 : 0.7)})`;
        if (this.hub) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(255,255,255,0.6)';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const COUNT = window.innerWidth < 768 ? 50 : 90;
    const nodes = Array.from({ length: COUNT }, () => new Node());
    const MAX_DIST = 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = nodes[i].hub || nodes[j].hub ? 1.1 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse aura dot
      if (mouse.x > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: 'auto' }}
    />
  );
};
