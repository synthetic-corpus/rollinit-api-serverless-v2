import { UserModel } from "./schemas/schema";
import { myDatabase } from "./database";

export async function convertUserId(userId: string): Promise<string>{
    const user_keys: {} = {}
    try{
        // checks cache first
        if (user_keys[userId]){
            return user_keys[userId]
        }else{
            myDatabase
            const mongoUser = await UserModel.findOne({_authID: userId}).exec()
            console.log("converter tool: mongo Searched with: ",userId)
            console.log("converter tool: mongo found: ",mongoUser)
            const mongovalue =  mongoUser._id.toString()
            user_keys[userId] = mongovalue
            return mongovalue
        }
        
    }catch(e){
        console.error(`Could Not Convert an ID! ${e}`)
        return ''
    }
}