import {StreamChat} from "stream-chat"

import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("Stream API key or Secret is missing")
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]); //upsert = create or update user depending on if it exists or not
        return userData
    }catch(error){
        console.error("Error upserting Stream user:", error);

    }
};
//gonna do this later
export const generateStreamToken = (userId) => {}
