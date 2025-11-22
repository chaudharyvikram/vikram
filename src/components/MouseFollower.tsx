import React, { useEffect, useRef } from 'react';

const MouseFollower: React.FC = () => {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            const { clientX, clientY } = e;
            if (blobRef.current) {
                blobRef.current.animate(
                    {
                        left: `${clientX}px`,
                        top: `${clientY}px`,
                    },
                    { duration: 3000, fill: "forwards" }
                );
            }
        };

        window.addEventListener('pointermove', handlePointerMove);
        return () => window.removeEventListener('pointermove', handlePointerMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div
                ref={blobRef}
                className="absolute w-[600px] h-[600px] bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen will-change-transform"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>
    );
};

export default MouseFollower;
