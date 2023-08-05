// User CRUD exported
import { getUserId } from "@functions/auth/authUtils";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { userHTTP } from './schema'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as users from "@business/user.logic"


const userCreate: ValidatedEventAPIGatewayProxyEvent<typeof userHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Simply records a user name and ID.
    const user_id = getUserId(event)
    // @ts-ignore typescript problem. Thinks that event.body is a string at runtime. It is not.
    const body: {name: string} = event.body
    console.log(body)
    const returnThis = await users.createUser(user_id,body.name)
    return formatJSONResponse(returnThis.code,returnThis.data)
}

const userRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Gets info on one user
    const user_id = getUserId(event)
    console.log("User Id at Lambda: ",user_id)
    try{
        const returnThis = await users.getUser(user_id)
        return formatJSONResponse(returnThis.code, returnThis.data)
    }catch(e){
        console.log(e)
        return formatJSONResponse(403,{message: "this user could not be authenticated"})
    }
}

const userPatch: ValidatedEventAPIGatewayProxyEvent<typeof userHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // could update the user name sometime

    const user_id = getUserId(event)
    try{
        const update = JSON.parse(event.body)
        const returnThis = await users.patchUser(user_id,update)
        return formatJSONResponse(returnThis.code, returnThis.data)
    }catch(e){
        console.log(e)
        return formatJSONResponse(403,{message: "this user could not be authenticated"})
    }
}

const userDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Delete a user. Not likely to ever be used, but here for the CRUD.

    const user_id = getUserId(event)
    if (!user_id){
        return formatJSONResponse(400, {"message": "Could not find the user!"})
    }
    try{
        const returnThis = await users.deleteUser(user_id)
        return formatJSONResponse(returnThis.code, returnThis.data)
    }catch(e){
        console.log(e)
        return formatJSONResponse(403,{message: "this user could not be authenticated"})
    }
}

export const userCreateMiddy = middyfy(userCreate)
export const userRetrieveMiddy = middyfy(userRetrieve)
export const userUpdateMiddy = middyfy(userPatch)
export const userDeleteMiddy = middyfy(userDelete)