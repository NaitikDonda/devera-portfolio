'use client';

import { useEffect, useRef, useState } from 'react';

const BlockyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const blocks = useRef<{x: number, y: number, color: string, filled: boolean, fillTime: number}[]>([]);
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6'];
  const blockSize = 50;
  const [mounted, setMounted] = useState(false);
  let columns = 0;
  let rows = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    let fillQueue: number[] = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.ceil(canvas.width / blockSize);
      rows = Math.ceil(canvas.height / blockSize);
    };

    // Initialize blocks
    const initBlocks = () => {
      blocks.current = [];
      fillQueue = [];
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const index = blocks.current.length;
          blocks.current.push({
            x: x * blockSize,
            y: y * blockSize,
            color: '#0f172a', // Darker background
            filled: false,
            fillTime: 0
          });
          fillQueue.push(index);
        }
      }
      
      // Shuffle the fill queue for random filling pattern
      for (let i = fillQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fillQueue[i], fillQueue[j]] = [fillQueue[j], fillQueue[i]];
      }
    };

    // Draw blocks
    const drawBlocks = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blocks.current.forEach(block => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, blockSize - 2, blockSize - 2);
        
        // Add a subtle glow effect for filled blocks
        if (block.filled && block.color !== '#0f172a') {
          ctx.shadowBlur = 10;
          ctx.shadowColor = block.color;
          ctx.fillRect(block.x, block.y, blockSize - 2, blockSize - 2);
          ctx.shadowBlur = 0;
        }
      });
    };

    // Animate blocks
    const animate = () => {
      frameCount++;
      
      // Fill blocks progressively (3 blocks every 2 frames)
      if (frameCount % 2 === 0 && fillQueue.length > 0) {
        for (let i = 0; i < 3; i++) {
          if (fillQueue.length === 0) break;
          
          const blockIndex = fillQueue.shift()!;
          const block = blocks.current[blockIndex];
          
          if (!block.filled) {
            block.filled = true;
            block.color = colors[Math.floor(Math.random() * colors.length)];
            block.fillTime = frameCount;
          }
        }
      }
      
      // Randomly change some filled blocks to create dynamic effect
      if (frameCount % 30 === 0) {
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * blocks.current.length);
          const block = blocks.current[randomIndex];
          
          if (block.filled && frameCount - block.fillTime > 60) {
            block.color = Math.random() > 0.3 
              ? colors[Math.floor(Math.random() * colors.length)]
              : '#0f172a';
            block.filled = block.color !== '#0f172a';
          }
        }
      }
      
      // Reset and refill when all blocks are done
      if (fillQueue.length === 0 && frameCount % 300 === 0) {
        // Gradually clear some blocks
        const blocksToClear = Math.floor(blocks.current.length * 0.3);
        for (let i = 0; i < blocksToClear; i++) {
          const randomIndex = Math.floor(Math.random() * blocks.current.length);
          const block = blocks.current[randomIndex];
          block.color = '#0f172a';
          block.filled = false;
          fillQueue.push(randomIndex);
        }
      }
      
      drawBlocks();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initBlocks();
      drawBlocks();
    };
    
    window.addEventListener('resize', handleResize);

    // Initialize
    resizeCanvas();
    initBlocks();
    drawBlocks();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 w-screen h-screen">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-40"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default BlockyBackground;
