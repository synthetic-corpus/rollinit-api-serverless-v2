/*
    These "tents" are so named because they represent "tent cards" for the games.
*/
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from "@libs/api-gateway";
import { tentHTTP } from "./schema";
import { middyfy } from "@libs/lambda";
import { getUserId } from "@functions/auth/authUtils";
import * as tents from '@business/tent.logic'

const tentCreate: ValidatedEventAPIGatewayProxyEvent<typeof tentHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const body = JSON.parse(event.body)
    const returnThis = await tents.createTent(user_id,body)
    return formatJSONResponse(returnThis.code,returnThis.data)
}

const tentRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await tents.getTent(user_id,id)
    return formatJSONResponse(returnThis.code,returnThis.data)
}
const tentRetrieveAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const returnThis = await tents.getAllTents(user_id)
    return formatJSONResponse(returnThis.code,returnThis.data)
}

const tentPatch: ValidatedEventAPIGatewayProxyEvent<typeof tentHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const patch = JSON.parse(event.body)
    const returnThis = await tents.patchTent(user_id,id,patch)
    return formatJSONResponse(returnThis.code,returnThis.data)
}

const tentDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await tents.deleteTent(user_id,id)
    return formatJSONResponse(returnThis.code,returnThis.data)
}

export const tentCreateMiddy = middyfy(tentCreate)
export const tentRetrieveMiddy = middyfy(tentRetrieve)
export const tentRetrieveAllMiddy = middyfy(tentRetrieveAll)
export const tentPatchMiddy = middyfy(tentPatch)
export const tentDeleteMiddy = middyfy(tentDelete)