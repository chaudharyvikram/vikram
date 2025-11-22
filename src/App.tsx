import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SwiftUIArchitectureExplorer from "./SwiftUIArchitectureExplorer";
import Blogs from './Blogs';
import BlogDetail from './BlogDetail';
import Header from './components/Header';
import Background from './components/Background';
import Work from './Work';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const MainPage = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col text-white selection:bg-violet-500 selection:text-white relative">
      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 animate-on-scroll bg-transparent">
          <div className="max-w-5xl mx-auto w-full relative z-10">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-100 to-gray-400">
                  Vikram
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                  Chaudhary
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed border-l-4 border-violet-500 pl-6">
                Expert iOS & Android Developer (SwiftUI, Kotlin, Flutter) <br />
                <span className="text-gray-500">Building High-Quality, Scalable Apps for Startups & Enterprises</span>
              </p>
              <p className="text-lg text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Ahmedabad, Gujarat, India
              </p>

              <div className="pt-8 flex flex-wrap gap-4">
                <a href="mailto:vikramchaudhary.dev@gmail.com" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-violet-50 transition-all hover:scale-105 transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Contact Me
                </a>
                <Link to="/work" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-105 transform duration-200 backdrop-blur-sm">
                  View Work
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-24 px-6 animate-on-scroll">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-violet-400">Summary</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm Vikram — a Senior iOS & Android Developer with 8+ years of experience helping startups and companies turn ideas into high-quality, scalable mobile apps.
                </p>
                <p>
                  I specialize in building beautiful, reliable, and high-performance mobile applications using SwiftUI, Kotlin, and Flutter — with clean architecture, optimized performance, and modern UX.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-fuchsia-400">What sets me apart:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-2">20+</div>
                  <p className="text-gray-400">Apps published on App Store & Play Store</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-fuchsia-500/30 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-2">Global</div>
                  <p className="text-gray-400">Clients across US, UK, Europe, Canada, Australia, UAE & India</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-2">100K+</div>
                  <p className="text-gray-400">Users scaled for startups launching MVPs</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Strong focus on UI/UX, animations, and fluid user interactions.
              </p>
              <p>
                Whether you need a new app built from scratch or want to improve an existing one, I bring both technical depth and business understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-24 px-6 animate-on-scroll">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Latest Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blogs/swiftui-architecture" className="group block">
                <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-violet-500/50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-violet-500/10 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-violet-400 transition-colors">SwiftUI Clean Architecture Example</h3>
                  <p className="text-gray-400 mb-6">Interactive exploration and walkthrough of Clean Architecture applied to a SwiftUI Product Catalog App.</p>
                  <div className="flex items-center text-sm text-violet-400 font-medium">
                    Read post <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 animate-on-scroll">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Let's collaborate to bring your app idea to life.</h2>
            <a href="mailto:vikramchaudhary.dev@gmail.com" className="inline-block text-xl md:text-2xl text-violet-400 hover:text-violet-300 transition-colors border-b border-violet-400/30 hover:border-violet-300 pb-1">
              vikramchaudhary.dev@gmail.com
            </a>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/chaudharyvikram" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">LinkedIn</a>
            <a href="https://instagram.com/_chaudharyvikram/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">Instagram</a>
            <a href="https://x.com/_ivikram" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">X (Twitter)</a>
          </div>
          <p className="text-sm text-gray-600">&copy; 2024 Vikram Chaudhary. All rights reserved.</p>
        </div>
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
