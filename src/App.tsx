import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FeaturedProjectCard from './components/FeaturedProjectCard';
import { projects } from './data/projects';
import SwiftUIArchitectureExplorer from "./SwiftUIArchitectureExplorer";
import Blogs from './Blogs';
import BlogDetail from './BlogDetail';
import Header from './components/Header';
import Background from './components/Background';
import Work from './Work';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useEffect } from "react";
import vikramImage from './assets/vikram.jpg';
import ahmedabadMap from './assets/ahmedabad_map.png';

const MainPage = () => {
  useScrollAnimation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.state && (location.state as any).scrollTo) {
      const scrollToId = (location.state as any).scrollTo;
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Optional: Clear state to prevent scroll on refresh, but requires history manipulation
          // window.history.replaceState({}, document.title); 
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white relative overflow-hidden">
      <Header />

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">

        {/* HERO SECTION - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-secondary mb-4 backdrop-blur-md">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for new projects
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              I'm Vikram, <br />
              a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Mobile App Developer</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              🚀 Expert iOS & Android Developer (Swift, UIKit, SwiftUI, Kotlin, Compose, Flutter) | Building High-Quality, Scalable Apps for Startups & Enterprises
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative pl-8 pr-2 py-2 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Hire Me
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:-rotate-45 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] animate-pulse-slow" />

            {/* Main Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={vikramImage}
                alt="Vikram Chaudhary"
                className="h-[550px] w-auto object-cover rounded-[2.5rem] mask-image-gradient"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
              />

              {/* Floating Badges */}
              <div className="absolute top-20 right-10 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl"></span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Experience</p>
                    <p className="text-lg font-bold text-white">8+ Years</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-40 left-0 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce duration-[4000ms]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">App Store</p>
                    <p className="text-lg font-bold text-white">20+ Apps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Strip */}
        <div className="w-[120vw] overflow-hidden border-y border-white/5 bg-white/5 backdrop-blur-sm py-6 mb-24 -rotate-2 transform origin-center relative left-1/2 -translate-x-1/2">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center mx-8 text-gray-400 font-medium tracking-widest uppercase">
                <span className="text-primary mr-4">+</span>
                PIXEL PERFECT
                <span className="text-secondary mx-4">+</span>
                SCALABLE
                <span className="text-primary mx-4">+</span>
                NATIVE PERFORMANCE
                <span className="text-secondary mx-4">+</span>
                INTERACTIVE
                <span className="text-primary mx-4">+</span>
                CLEAN ARCHITECTURE
              </div>
            ))}
          </div>
        </div>

        {/* Recent Work Section */}
        <div id="recent-work" className="mb-24 space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary font-medium tracking-widest uppercase">Recent Work</span>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <FeaturedProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>

        {/* Bento Grid Layout (Remaining Content) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Tech Stack - Scrolling Marquee style within a card */}
          <div className="col-span-1 md:col-span-2 rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/5 p-8 flex flex-col justify-center overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-6">Mobile Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Flutter', 'Dart', 'UIKit', 'Clean Architecture', 'CI/CD', 'Fastlane'].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Map/Location Card */}
          <div className="col-span-1 md:col-span-2 rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/5 p-6 relative overflow-hidden group hover:border-secondary/30 transition-all duration-300 min-h-[200px]">
            {/* Map Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={ahmedabadMap}
                alt="Ahmedabad Map"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-110 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div className="relative z-20 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Based In</h3>
                <div className="p-2 bg-white/10 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Ahmedabad</p>
                <p className="text-gray-400">Gujarat, India</p>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="col-span-1 md:col-span-4 rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/5 p-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-12 h-[1px] bg-primary"></span>
                <span className="text-primary font-medium tracking-widest uppercase">About Me</span>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg text-white font-medium">
                  👋 I’m Vikram — a Senior iOS & Android Developer with 8+ years of experience helping startups and companies turn ideas into high-quality, scalable mobile apps.
                </p>

                <p>
                  I specialize in building beautiful, reliable, and high-performance mobile applications using <span className="text-white">SwiftUI, Kotlin, and Flutter</span> — with clean architecture, optimized performance, and modern UX.
                </p>

                <div className="py-4">
                  <h4 className="text-white font-semibold mb-4">What sets me apart:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">✅</span>
                      <span>20+ apps published on App Store & Play Store</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">🌎</span>
                      <span>Experience working with international clients across the US, UK, Europe, Canada, Australia, UAE, Saudi Arabia and India</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">💡</span>
                      <span>Proven track record helping startups launch MVPs and scale to 100K+ users</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">🧩</span>
                      <span>Strong focus on UI/UX, animations, and fluid user interactions</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Whether you need a new app built from scratch or want to improve an existing one, I bring both technical depth and business understanding.
                </p>

                <div className="pt-4 flex items-center gap-2">
                  <span className="text-xl">📩</span>
                  <span className="font-medium text-white">Let’s collaborate to bring your app idea to life. Email:</span>
                  <a href="mailto:vikramchaudhary.dev@gmail.com" className="text-primary hover:text-secondary transition-colors font-medium">
                    vikramchaudhary.dev@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Blog Post - Large Card */}
          <Link id="latest-article" to="/blogs/swiftui-architecture" className="col-span-1 md:col-span-4 rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/5 p-8 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Latest Article
                </div>
                <h2 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">SwiftUI Clean Architecture</h2>
                <p className="text-gray-400 max-w-2xl">
                  Interactive exploration and walkthrough of Clean Architecture applied to a SwiftUI Product Catalog App. Dive deep into the code structure.
                </p>
                <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Read Article <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-video rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">🏗️</div>
              </div>
            </div>
          </Link>

        </div>
      </main>

      <footer className="py-12 pb-32 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Vikram Chaudhary.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/swiftui-architecture" element={<SwiftUIArchitectureExplorer />} />
      </Routes>
    </Router>
  );
};

export default App;
