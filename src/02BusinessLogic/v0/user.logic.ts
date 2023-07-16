import  * as User from '@interfaces/user.interface';
import * as DB from '../../03data/v0/user.mongo';
import { convertUserId } from '../../03data/v0/convertUserId';
import { HttpReplyMessage } from '@interfaces/responses.interface'



export async function createUser(userId: string, name: string): Promise<HttpReplyMessage>{
    console.log("passing create USER layer")
    const reply: HttpReplyMessage = await DB.createUser(userId, name);
    return reply
}

export async function getUser(userId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.retrieveUser(db_uuid)
    console.log("logic layer searches with: ",userId, "which converted to ",db_uuid)
    console.log("logic layer finds: ",reply)
    return reply
}

export async function patchUser(userId: string, update: User.UserPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateUser(db_uuid,update)
    return reply
}

export async function deleteUser(userId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteUser(db_uuid)
    return reply
}