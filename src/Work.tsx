import React from 'react';
import Header from './components/Header';
import Background from './components/Background';
import ProjectCard from './components/ProjectCard';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const projects = [    
    {
        title: "Calliope Stories",
        category: "Books & Reference",
        link: "https://apps.apple.com/in/app/calliope-stories/id6447096686",
        color: "from-fuchsia-600 to-pink-500"
    },
    {
        title: "Fit-2-Flaunt",
        category: "Health & Fitness",
        link: "https://apps.apple.com/in/app/fit-2-flaunt/id1501799266",
        color: "from-rose-500 to-orange-400"
    },
    {
        title: "Veena World",
        category: "Travel",
        link: "https://apps.apple.com/in/app/veena-world/id6741761791",
        color: "from-yellow-500 to-amber-600"
    },
    {
        title: "Radio Nova Toronto",
        category: "Music & Audio",
        link: "https://apps.apple.com/in/app/radio-nova-toronto/id1454401999",
        color: "from-red-600 to-pink-600"
    },
    {
        title: "Host for Radionova",
        category: "Utilities",
        link: "https://apps.apple.com/in/app/host-for-radionova/id6746206032",
        color: "from-indigo-600 to-violet-600"
    },
    {
        title: "Sarafiy (صرافی)",
        category: "Finance",
        link: "https://apps.apple.com/in/app/sarafiy-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C/id6477912439",
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "Footrax",
        category: "Sports",
        link: "https://apps.apple.com/in/app/footrax/id1594586162",
        color: "from-green-500 to-lime-500"
    },
    {
        title: "Clique – The Rewards App",
        category: "Lifestyle",
        link: "https://apps.apple.com/in/app/clique-the-rewards-app/id6741565671",
        color: "from-violet-600 to-fuchsia-600"
    },
    {
        title: "LMC: Global Container Hub",
        category: "Business",
        link: "https://apps.apple.com/in/app/lmc-global-container-hub/id6741157742",
        color: "from-slate-600 to-gray-500"
    }
];

const Work = () => {
    useScrollAnimation();

    return (
        <div className="min-h-screen flex flex-col text-white selection:bg-violet-500 selection:text-white relative">
            <Header />

            <main className="flex-1 relative z-10 pt-24 px-6">
                <div className="max-w-7xl mx-auto animate-on-scroll">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            Featured Work
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
                        A collection of high-quality mobile applications built for startups and enterprises across the globe.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                        {projects.map((project, index) => (
                            <div key={index} className={`animate-on-scroll delay-${(index % 3) * 100 + 100}`}>
                                <ProjectCard {...project} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Work;
