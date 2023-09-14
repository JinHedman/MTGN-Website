import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Navbar';
import { fetchBlogPosts } from '../utils/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import neon_space from '../images/Neon space.jpg';

const LandingPage = ({ onLogout }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    };

    fetchPosts();
  }, []);

  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className='flex justify-center min-w-full min-h-full'>
      <img src={neon_space} alt='background' className='fixed min-h-full -z-50'/>
      </div>
      <Nav onLogout={onLogout} />
      <Outlet />
      <div className="container mx-auto mt-8 pt-16 px-4">
        <h1 className="text-4xl font-bold mb-6 text-yellow-500 text-center">Blog Posts</h1>
        
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id} className="mb-8 bg-gray rounded shadow p-6 border">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">{post.title}</h2>
              <div className="mb-4 text-yellow-600">{documentToReactComponents(post.content)}</div>
              <h2 className="text-xl text-yellow-500">{post.author}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
};

export default LandingPage;
