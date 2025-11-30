import React from 'react';

interface ProjectProps {
    title: string;
    category: string;
    link: string;
    color: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, category, link, color }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-full"
        >
            <div className="relative h-full overflow-hidden rounded-3xl bg-surface/50 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-xl">
                {/* Gradient Background / Placeholder for Screenshot */}
                <div className={`h-48 w-full bg-gradient-to-br ${color} opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-105`}>
                    <div className="flex h-full items-center justify-center">
                        <span className="text-4xl font-bold text-white opacity-20 mix-blend-overlay">{title.substring(0, 2).toUpperCase()}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-secondary">{category}</span>
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors duration-300">
                            <svg className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
                    <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">View on App Store</p>
                </div>
            </div>
        </a>
    );
};

export default ProjectCard;
