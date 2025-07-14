"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await res.json();
    // console.log("data: ", data)
    setPosts(data);
  }
  
  useEffect(() => {
    console.log("user id", session?.user.id)
    if (session?.user.id) fetchPosts();
  }, [status])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if (hasConfirmed) {
      try {
        const res = await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        });
        
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        
        setPosts(filteredPosts)
        
        if (!res.ok) {
          throw new Error("Failed to delete post from server");
        }
      } catch (error) {
        // Rollback UI: 'posts' still holds it's previous state is updated to include deletion, this is because, the component hasn't rerendered at this point to include new changes
        setPosts(posts);
        alert("Failed to delete post. Please try again.");
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;