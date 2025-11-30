import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeaturedProjectProps {
    title: string;
    category?: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    color: string;
}

const FeaturedProjectCard: React.FC<FeaturedProjectProps> = ({ title, category = "iOS App", description, tags, image, link, color }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={`block relative overflow-hidden rounded-[2rem] bg-surface/30 backdrop-blur-xl border border-white/5 p-5 group hover:border-white/10 transition-colors duration-500`}
        >
            {/* Gradient Glow Effect */}
            <div className={`absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br ${color} opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Content Side - Spans 7 cols */}
                <div className="lg:col-span-7 space-y-3">
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary text-xs font-medium mb-2 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {category}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                            {description}
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-white transition-colors pt-1">
                        View on App Store
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Image Side - Spans 5 cols */}
                <div className="lg:col-span-5 flex items-center justify-center lg:justify-end lg:pr-6">
                    <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </a>
    );
};

export default FeaturedProjectCard;
