"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import Form from "@components/Form";

const page = () => {
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const router = useRouter();

  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();

      console.log("data", data)

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) return alert("Prompot ID not found")
    
    try {
      const response = await fetch(`api/prompt/${promptId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          })
        }
      )

      if (response.ok)
        router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  }

  console.log(post)
  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default page