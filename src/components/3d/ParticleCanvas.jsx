import React, { useEffect, useRef } from 'react';

/**
 * CampusXchange Reusable Particle Foundation
 * Represents a digital campus network graph with dynamic node connections
 * Strictly Monochrome, high performance canvas architecture
 */
export const ParticleCanvas = ({
  nodeCount = 60,
  maxConnectionDistance = 140,
  interactive = true,
  className = "w-full h-[320px]",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse state for physics interaction
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      radius: 150,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Node class representing campus peers
    class Node {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1.5;
        this.isHub = Math.random() > 0.85; // Major campus hub node
        if (this.isHub) this.radius = 3.5;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.03;

        // Bounce from walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interactive mouse force
        if (interactive && mouse.isHovered) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }
      }

      draw(isDarkTheme = true) {
        ctx.beginPath();
        const pulseSize = this.isHub ? Math.sin(this.pulse) * 0.8 : 0;
        ctx.arc(this.x, this.y, this.radius + pulseSize, 0, Math.PI * 2);
        
        ctx.fillStyle = isDarkTheme ? '#ffffff' : '#000000';
        ctx.shadowBlur = this.isHub ? 8 : 0;
        ctx.shadowColor = isDarkTheme ? '#ffffff' : '#000000';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize node array
    const nodes = Array.from({ length: nodeCount }, () => new Node());

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const isDark = document.documentElement.classList.contains('dark');
      const strokeColor = isDark ? '255, 255, 255' : '0, 0, 0';

      // Draw campus network links between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        nodeA.update();
        nodeA.draw(isDark);

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(${strokeColor}, ${alpha})`;
            ctx.lineWidth = nodeA.isHub || nodeB.isHub ? 1.2 : 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw cursor network aura
      if (interactive && mouse.isHovered) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${strokeColor}, 0.8)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${strokeColor}, 0.2)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [nodeCount, maxConnectionDistance, interactive]);

  return (
    <div className={`relative ${className} bg-cx-950/80 rounded-cx-xl border border-cx-700/80 overflow-hidden shadow-cx-card-dark`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-3 left-3 pointer-events-none font-mono text-[10px] uppercase text-cx-500 tracking-wider flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-cx-0 animate-ping inline-block" />
        <span>DYNAMIC CAMPUS MESH // {nodeCount} VERIFIED PEER NODES</span>
      </div>
    </div>
  );
};
