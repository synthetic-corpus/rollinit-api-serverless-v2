/*
    These are the encounters that the DM sets up.
*/
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from "@libs/api-gateway";
import { encounterHTTP } from "./schema";
import { middyfy } from "@libs/lambda";
import { getUserId } from '@functions/auth/authUtils'
import * as encounters from "@business/encounter.logic"


const encounterCreate: ValidatedEventAPIGatewayProxyEvent<typeof encounterHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Adds a new encounter
    const user_id = getUserId(event)
    const body: any = event.body as Object
    const returnThis = await encounters.createEncounter(user_id,body)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const encounterRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await encounters.getEncounter(user_id,id)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const encounterRetrieveAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const returnThis = await encounters.getAllEncounters({_user_id: user_id})
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const encounterPatch: ValidatedEventAPIGatewayProxyEvent<typeof encounterHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await encounters.patchEncounter(user_id,id,event.body as Object)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const encounterDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await encounters.deleteEncounter(user_id,id)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

export const encounterCreateMiddy = middyfy(encounterCreate)
export const encounterRetrieveMiddy = middyfy(encounterRetrieve)
export const encounterRetrieveAllMiddy = middyfy(encounterRetrieveAll)
export const encounterUpdateMiddy = middyfy(encounterPatch)
export const encounterDeleteMiddy = middyfy(encounterDelete)