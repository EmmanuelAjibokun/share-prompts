'use client'

/**
 * Implement Search
 * - Search by prompt content
 * - Search by tag
 * - Search by username
 * Implement Click on tag
 */

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

const promptFilter = (searchText, posts) => {
  const searchWord = searchText.trim().toLowerCase().split(/\s+/);
  
  const scorepost = post => {
    console.log("searched words: ", searchWord)
    const username = post.creator?.username.toLowerCase() || ''
    const tag = post.tag.toLowerCase() || ''
    const prompt = post.prompt.toLowerCase() || '';

    let score = 0;

    searchWord.forEach(word => {
      if (username === word) score += 10
      else if (username.startsWith(word)) score += 8
      else if (username.includes(word)) score += 6

      if (tag === word) score += 9
      else if (tag.startsWith(word)) score += 7
      else if (tag.includes(word)) score += 5

      if (prompt === word) score += 8
      else if (prompt.startsWith(word)) score += 6
      else if (prompt.includes(word)) score += 4
      // console.log("tag", tag)
      // console.log("word", word)
    });

    console.log("each post score: ", score)

    return score;
  }

  const newPost = posts.map(post => ({post, score: scorepost(post)}))
  console.log("new posts: ", newPost)

  return posts
    .map(post => ({post, score: scorepost(post)}))
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.post)
}

function Feed() {
  const [allPosts, setAllPosts] = useState([]);
  
  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  const [posts, setPosts] = useState([]);

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
  }, []);
  
  const handleSearchChange = (e) => {
    console.log(searchTimeout)
    clearTimeout(searchTimeout)
    const searchInput = e.target.value
    setSearchText(searchInput)

    // Debounce filtering logic
    setSearchTimeout(
      setTimeout(() => {
        const result = promptFilter(searchInput, posts);
        setSearchedResults(result);
      }, 300)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const result = promptFilter(tag, posts);
    console.log("tags: ", tag)
    console.log("results: ", result)
    setSearchedResults(result)
  }

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
      {console.log("searched text: ", searchText)}
      {console.log("searched result: ", searchedResults)}
      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed