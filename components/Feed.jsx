"use client"
import { useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState([]);

  const handleSearchChange = e => {
    e.preventDefault()
    setSearchText(e.target.value)


  }

  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    console.log("Fetched posts:", data);  // Log the fetched posts
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Only fetch posts once on mount

  useEffect(() => {
    if (posts.length > 0) {
      const newResult = posts.filter((post) =>
        post.creator?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log("Filtered result:", newResult);  // Log the filtered result
      setResult(newResult);
    }
  }, [searchText, posts]);
  
  console.log("Texting my console")
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer' />
      </form>

      <PromptCardList
        data={result}
        handleTagClick={tag => setSearchText(tag)}/>
    </section>
  )
}

export default Feed;