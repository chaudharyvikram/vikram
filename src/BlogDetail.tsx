import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './components/Header';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  imageUrl: string;
  link?: string;
}

const blogPosts: Record<string, BlogPost> = {
  'swiftui-architecture': {
    id: 'swiftui-architecture',
    title: 'SwiftUI Clean Architecture Explorer',
    description: 'An interactive visualization of Clean Architecture principles in SwiftUI applications',
    imageUrl: '/assets/swiftui-architecture.png',
    content: (
      <div className="prose prose-lg prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-white">SwiftUI Clean Architecture Explorer</h1>

        <p className="lead mb-8 text-gray-300">
          Discover how Clean Architecture principles can be applied in SwiftUI applications through
          this interactive explorer. Learn about the separation of concerns, dependency injection,
          and how different layers interact in a real-world application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Key Features</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-300">
          <li>Interactive file explorer showcasing a complete project structure</li>
          <li>Visual representation of architecture layers and their relationships</li>
          <li>Real code examples for each component</li>
          <li>Detailed explanations of design patterns and best practices</li>
        </ul>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Ready to Explore?</h3>
          <p className="text-blue-200 mb-4">
            Jump into the interactive explorer to see Clean Architecture in action. Browse through
            the project structure, examine code samples, and understand how different components
            work together.
          </p>
          <Link
            to="/swiftui-architecture"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
          >
            Open SwiftUI Architecture Explorer
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">What You'll Learn</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-300">
          <li>How to structure a SwiftUI application using Clean Architecture</li>
          <li>Implementation of MVVM pattern with SwiftUI</li>
          <li>Proper dependency management and injection techniques</li>
          <li>Data flow between different architectural layers</li>
          <li>Error handling and testing strategies</li>
        </ul>

        <p className="mt-8 text-gray-300">
          This interactive explorer is designed to help developers understand Clean Architecture
          principles through a practical example. By examining a complete project structure
          and real code samples, you'll gain insights into building maintainable and scalable
          SwiftUI applications.
        </p>
      </div>
    ),
    link: '/swiftui-architecture'
  }
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blogs"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <div className="prose prose-lg prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-white">{post.title}</h1>

          <p className="lead mb-8 text-gray-300">
            {post.description}
          </p>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Ready to Explore?</h3>
            <p className="text-blue-200 mb-4">
              Jump into the interactive explorer to see Clean Architecture in action. Browse through
              the project structure, examine code samples, and understand how different components
              work together.
            </p>
            <Link
              to="/swiftui-architecture"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              Open SwiftUI Architecture Explorer
            </Link>
          </div>

          <div className="text-gray-300">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;