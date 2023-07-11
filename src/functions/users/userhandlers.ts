// User CRUD exported
import { getUserId } from "@functions/auth/authUtils";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { userHTTP } from './schema'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const userCreate: ValidatedEventAPIGatewayProxyEvent<typeof userHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Simply records a user name and ID.
    return formatJSONResponse({
        message: "user Creat called!",
        event
    })
}

const userRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    return formatJSONResponse({
        message: "retrieve user was called!",
        extracted_id: user_id,
        event
    })
}

const userPatch: ValidatedEventAPIGatewayProxyEvent<typeof userHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // could update the user name sometime
    return formatJSONResponse({
        message: "user patch called!",
        event
    })
}

const userDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "delete user was called!",
        event
    })
}

export const userCreateMiddy = middyfy(userCreate)
export const userRetrieveMiddy = middyfy(userRetrieve)
export const userPatchMiddy = middyfy(userPatch)
export const userDeleteMiddy = middyfy(userDelete)