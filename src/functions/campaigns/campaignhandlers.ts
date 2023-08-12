/*
    These are the encounters that the DM sets up.
*/
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from "@libs/api-gateway";
import { campaignHTTP } from "./schema";
import { middyfy } from "@libs/lambda";
import { getUserId } from '@functions/auth/authUtils'
import * as campaigns from "@business/campaign.logic"


const campaignCreate: ValidatedEventAPIGatewayProxyEvent<typeof campaignHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Adds a new encounter
    const user_id = getUserId(event)
    const body: any = event.body as Object
    const returnThis = await campaigns.createCampaign(user_id,body)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const campaignRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await campaigns.getCampaign(user_id,id)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const campaignRetrieveAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const returnThis = await campaigns.getAllCampaigns(user_id)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const campaignPatch: ValidatedEventAPIGatewayProxyEvent<typeof campaignHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await campaigns.patchCampaign(user_id,id,event.body as Object)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

const campaignDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user_id = getUserId(event)
    const id = event.pathParameters.id
    const returnThis = await campaigns.deleteCampaign(user_id,id)
    return formatJSONResponse(returnThis.code, returnThis.data) // Must return with formatJSONResponse
}

export const campaignCreateMiddy = middyfy(campaignCreate)
export const campaignRetrieveMiddy = middyfy(campaignRetrieve)
export const campaignRetrieveAllMiddy = middyfy(campaignRetrieveAll)
export const campaignUpdateMiddy = middyfy(campaignPatch)
export const campaignDeleteMiddy = middyfy(campaignDelete)