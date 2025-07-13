'use client'

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = () => {

  }

  useEffect(()=> {
    try {
      const fetchPosts = async() => {
        const response = await fetch('api/prompt');
        const data = await response.json();

        setPosts(data);
      }
      fetchPosts()
    } catch(error) {
      console.error(error)
    }
  }, [])

  return (
    <section className='feed'>
      <form action="" className='relative w-full justify-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          />
      </form>

      <PromptCardList
        data={[]}
        handleTagClick={()=>{}} />
    </section>
  )
}

export default Feed