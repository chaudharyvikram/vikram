import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouseX = -1000;
        let mouseY = -1000;

        const points: Point3D[] = [];
        // Increase point count to cover full screen
        const numPoints = Math.min(250, (width * height) / 5000);

        class Point3D {
            x: number;
            y: number;
            z: number;
            baseX: number;
            baseY: number;
            baseZ: number;
            vx: number;
            vy: number;
            vz: number;

            constructor() {
                // Distribute across the entire screen volume
                this.baseX = (Math.random() - 0.5) * width * 1.5;
                this.baseY = (Math.random() - 0.5) * height * 1.5;
                this.baseZ = (Math.random() - 0.5) * width; // Depth similar to width

                this.x = this.baseX;
                this.y = this.baseY;
                this.z = this.baseZ;

                this.vx = 0;
                this.vy = 0;
                this.vz = 0;
            }

            rotate(rotationX: number, rotationY: number) {
                // Rotate base positions
                let cosRY = Math.cos(rotationY);
                let sinRY = Math.sin(rotationY);
                let tempX = this.baseX * cosRY - this.baseZ * sinRY;
                let tempZ = this.baseX * sinRY + this.baseZ * cosRY;

                let cosRX = Math.cos(rotationX);
                let sinRX = Math.sin(rotationX);
                let tempY = this.baseY * cosRX - tempZ * sinRX;
                tempZ = this.baseY * sinRX + tempZ * cosRX;

                // Apply physics offset (warp effect)
                this.x = tempX + this.vx;
                this.y = tempY + this.vy;
                this.z = tempZ + this.vz;

                // Damping for physics
                this.vx *= 0.95;
                this.vy *= 0.95;
                this.vz *= 0.95;

                // Return to base (spring)
                this.vx -= this.vx * 0.01;
                this.vy -= this.vy * 0.01;
                this.vz -= this.vz * 0.01;
            }

            project(perspective: number): { x: number, y: number, scale: number } {
                // Simple perspective projection
                const scale = perspective / (perspective + this.z + 1000);
                return {
                    x: width / 2 + this.x * scale,
                    y: height / 2 + this.y * scale,
                    scale: scale
                };
            }
        }

        const init = () => {
            points.length = 0;
            for (let i = 0; i < numPoints; i++) {
                points.push(new Point3D());
            }
        };

        let rotationX = 0;
        let rotationY = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Constant slow rotation
            rotationY += 0.002;
            rotationX += 0.001;

            const projectedPoints: { x: number, y: number, scale: number, original: Point3D }[] = [];

            // 1. Update Physics & Project
            points.forEach(point => {
                // Mouse Interaction (Ray casting approximation)
                // We project the point first to see if it's close to mouse in 2D
                const p = point.project(800);

                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    // Push in 3D space roughly opposite to mouse
                    point.vx -= dx * force * 0.5;
                    point.vy -= dy * force * 0.5;
                    point.vz -= force * 50; // Push back in Z
                }

                point.rotate(rotationX, rotationY);
                projectedPoints.push({ ...point.project(800), original: point });
            });

            // 2. Draw Lines
            ctx.lineWidth = 0.5;
            for (let i = 0; i < points.length; i++) {
                // Optimization: Only check nearby points in array (requires sorting, but simple loop is fine for < 300 points)
                for (let j = i + 1; j < points.length; j++) {
                    const p1 = projectedPoints[i];
                    const p2 = projectedPoints[j];

                    // Check 2D distance for visual connections
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        const alpha = (1 - dist / 100) * ((p1.scale + p2.scale) / 2);
                        if (alpha > 0.05) {
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(100, 200, 255, ${alpha * 0.6})`;
                            ctx.stroke();
                        }
                    }
                }
            }

            // 3. Draw Points
            projectedPoints.forEach(p => {
                const alpha = p.scale;
                if (alpha > 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.fill();

                    if (p.scale > 0.8) {
                        ctx.shadowBlur = 15 * p.scale;
                        ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
                    } else {
                        ctx.shadowBlur = 0;
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#0a0a0a]">
            {/* Deep Gradient Base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e1e2e_0%,#0a0a0a_100%)] opacity-60"></div>

            {/* Canvas Animation */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default Background;
