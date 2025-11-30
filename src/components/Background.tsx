import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#0a0a0a]">
            {/* Deep Gradient Base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e1e2e_0%,#0a0a0a_100%)] opacity-60"></div>
        </div>
    );
};

export default Background;
