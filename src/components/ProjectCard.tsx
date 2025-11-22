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
            <div className="relative h-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 backdrop-blur-sm">
                {/* Gradient Background / Placeholder for Screenshot */}
                <div className={`h-48 w-full bg-gradient-to-br ${color} opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105`}>
                    <div className="flex h-full items-center justify-center">
                        <span className="text-4xl font-bold text-white opacity-20 mix-blend-overlay">{title.substring(0, 2).toUpperCase()}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-violet-400">{category}</span>
                        <svg className="h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">{title}</h3>
                    <p className="mt-2 text-sm text-gray-400">View on App Store</p>
                </div>
            </div>
        </a>
    );
};

export default ProjectCard;
