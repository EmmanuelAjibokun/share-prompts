"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const [posts, setPosts] = useState();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name")
  console.log("params: ", params)

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${params?.id}/posts`)
    const data = await res.json();
    console.log("data: ", data)
    setPosts(data);
  }

  useEffect(() => {
    // if (posts?.id) fetchPosts();
    fetchPosts();
  }, [])


  return (
    <Profile
      name={userName}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  )
}

export default UserProfile;