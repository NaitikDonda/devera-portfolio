'use client';

import { useEffect, useRef } from 'react';

const FloatingBlocks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const blocks = useRef<{
    x: number;
    y: number;
    size: number;
    speed: number;
    targetX: number;
    targetY: number;
    color: string;
  }[]>([]);

  const colors = [
    'rgba(99, 102, 241, 0.8)',  // indigo
    'rgba(139, 92, 246, 0.8)',  // purple
    'rgba(236, 72, 153, 0.8)',  // pink
    'rgba(244, 63, 94, 0.8)',   // rose
    'rgba(245, 158, 11, 0.8)',  // amber
    'rgba(16, 185, 129, 0.8)',  // emerald
    'rgba(59, 130, 246, 0.8)',  // blue
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlocks();
    };

    // Initialize blocks only at the top section
    const initBlocks = () => {
      blocks.current = [];
      const topSectionHeight = 300; // Height of the top section in pixels
      const blockCount = Math.floor((canvas.width * topSectionHeight) / 5000); // More dense in top section
      
      for (let i = 0; i < blockCount; i++) {
        blocks.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * topSectionHeight,
          size: 10 + Math.random() * 30,
          speed: 0.5 + Math.random() * 1.5,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blocks.current.forEach(block => {
        // Move towards target
        block.x += (block.targetX - block.x) * 0.01 * block.speed;
        block.y += (block.targetY - block.y) * 0.01 * block.speed;

        // If close to target, set new random target in top section
        const dx = block.targetX - block.x;
        const dy = block.targetY - block.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const topSectionHeight = 300; // Same as above

        if (distance < 5) {
          block.targetX = Math.random() * canvas.width;
          block.targetY = Math.random() * topSectionHeight;
        }

        // Draw block with pulsing effect
        const pulse = 0.8 + Math.sin(Date.now() * 0.001 * block.speed) * 0.2;
        ctx.fillStyle = block.color.replace('0.8', String(0.5 + pulse * 0.3));
        ctx.fillRect(
          block.x - block.size / 2,
          block.y - block.size / 2,
          block.size,
          block.size
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    const animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        resizeCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[300px] -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default FloatingBlocks;
