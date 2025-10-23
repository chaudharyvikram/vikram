import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SwiftUIArchitectureExplorer from "./SwiftUIArchitectureExplorer";
import Blogs from './Blogs';
import BlogDetail from './BlogDetail';
import Header from './components/Header';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1 pt-24">
        <section className="hero relative flex items-center justify-center px-6 py-24">
          <div className="absolute inset-0 -z-10">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <div className="blob blob-4"></div>
            <div className="blob blob-5"></div>
          </div>

          <div className="content max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-pink-500">Hello,</h1>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2">I'm Vikram Chaudhary</h2>
            <p className="mt-4 text-lg text-gray-600">iOS Developer with a passion for creating interactive Mobile Application experiences.</p>
          </div>
        </section>

        <section className="about px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-500">About Me</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              As Senior iOS Developer with 8+ years of experience in the industry. I have extensive knowledge and expertise in developing iOS applications for various industries such as e-commerce, Social Media, Health, and Trivia Games. My technical skills include proficiency in Swift, Objective-C, and Xcode. I am adept in using various iOS frameworks such as SwiftUI, UIKit, Core Data, Map Kit, In-App Purchase, and Core Animation. I am also experienced in integrating third-party libraries and APIs into iOS applications.
            </p>
          </div>
        </section>

        <section className="projects px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/blogs/swiftui-architecture" className="group">
                <div className="project bg-white rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800">SwiftUI Clean Architecture Example</h3>
                  <p className="text-gray-600 mt-3">Interactive exploration and walkthrough of Clean Architecture applied to a SwiftUI Product Catalog App.</p>
                  <div className="mt-4 text-sm text-gray-500">Read post →</div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer bg-white px-6 py-8 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="social-buttons flex justify-center gap-4 mb-4">
            <a href="https://linkedin.com/in/chaudharyvikram" target="_blank" rel="noreferrer" className="linkedin w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">in</a>
            <a href="https://instagram.com/_chaudharyvikram/" target="_blank" rel="noreferrer" className="instagram w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">ig</a>
            <a href="https://x.com/_ivikram" target="_blank" rel="noreferrer" className="x w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">x</a>
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 Vikram Chaudhary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<MainPage />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/blogs/:id" element={<BlogDetail />} />
  <Route path="/swiftui-architecture" element={<SwiftUIArchitectureExplorer />} />
      </Routes>
    </Router>
  );
};

export default App;
