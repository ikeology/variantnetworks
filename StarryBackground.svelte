<script lang="ts">
    import { onMount } from 'svelte';
  
    let canvas: HTMLCanvasElement;
    const STAR_COUNT = 500; // Increased count for more distant stars
    const MAX_SPEED = 1.5; // Slower speed for calmer effect
  
    type Star = {
        x: number;
        y: number;
        dx: number;
        dy: number;
        size: number;
        r: number;
        g: number;
        b: number;
        alpha: number;
    };
  
    onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const stars: Star[] = [];
  
        const mkStar = (): Star => {
            const w = canvas.width;
            const h = canvas.height;
            
            // Create stars from random positions across the screen
            const x = Math.random() * w;
            const y = Math.random() * h;
            
            // Very subtle movement for distant stars
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * MAX_SPEED * 0.3 + 0.1; // Very slow
            
            const dx = Math.cos(angle) * speed;
            const dy = Math.sin(angle) * speed;
            
            // star size
            const size = Math.random() * 0.9 + 0.5;
            
            // Mostly white with very slight color variation
            const colorVariation = Math.random() * 20 - 10;
            const r = 255;
            const g = 255 + colorVariation;
            const b = 255 - colorVariation;
            
            return { 
                x, y, dx, dy, 
                size,
                r, g, b,
                alpha: Math.random() * 0.5 + 0.5 // Consistent transparency
            };
        };
  
        for (let i = 0; i < STAR_COUNT; i++) stars.push(mkStar());
  
        const animate = () => {
            requestAnimationFrame(animate);
            const w = canvas.width = window.innerWidth;
            const h = canvas.height = window.innerHeight;
            
            // Pure black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, w, h);
            
            let newStars = 0;
  
            stars.forEach((star, i) => {
                star.x += star.dx;
                star.y += star.dy;
                
                if (
                    star.x + star.size < 0 || star.x > w + star.size ||
                    star.y + star.size < 0 || star.y > h + star.size
                ) {
                    stars.splice(i, 1);
                    newStars++;
                }
    
                // Draw simple rectangle star
                ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${star.alpha})`;
                ctx.fillRect(star.x, star.y, star.size, star.size);
            });
  
            for (let i = 0; i < newStars; i++) stars.push(mkStar());
            
            // Maintain star count
            while (stars.length < STAR_COUNT) {
                stars.push(mkStar());
            }
        };
  
        animate();
        
        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>
  
<canvas bind:this={canvas} class="star-canvas"></canvas>
  
<style>
    .star-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
    }
</style>
