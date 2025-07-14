import UpdatePromptClient from "@components/UpdatePromptClient";

const page = async({searchParams}) => {
  const promptId = await searchParams.id
  return (
      <UpdatePromptClient promptId={promptId}/>
  )
}

export default page;