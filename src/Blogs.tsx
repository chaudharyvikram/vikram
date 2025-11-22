import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const Blogs = () => {
  const posts = [
    {
      id: 'swiftui-architecture',
      title: 'SwiftUI Clean Architecture Example',
      excerpt: 'An interactive walkthrough of Clean Architecture (MVVM + Repositories + DI) applied to a Product Catalog SwiftUI app.',
      tags: ['SwiftUI', 'Architecture', 'MVVM']
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-white">Latest Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.id} className="bg-white/5 border border-white/10 rounded-xl shadow p-5 hover:border-violet-500/30 transition-all hover:-translate-y-1 duration-300 backdrop-blur-sm">
              <div className="h-40 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg mb-4 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                {/* Small illustrated header - placeholder */}
                {post.title}
              </div>

              <h2 className="text-xl font-semibold mb-2 text-white">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 border border-white/5 rounded-full text-xs text-gray-300">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Link to={`/blogs/${post.id}`} className="text-sm font-medium text-violet-400 hover:text-violet-300 hover:underline">Read article →</Link>
                <span className="text-xs text-gray-500">Jan 1, 2024</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
