import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator") // the populate method add extra details to the search result options: creator in the case would be added to the information returned about each post

    console.log("Prompts: ", prompts)

    return new Response(JSON.stringify(prompts),{ status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all prompts", {status: 500 })
  }
}