/*
    These "tents" are so named because they represent "tent cards" for the games.
*/
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from "@libs/api-gateway";
import { tentHTTP } from "./schema";
import { middyfy } from "@libs/lambda";

const tentCreate: ValidatedEventAPIGatewayProxyEvent<typeof tentHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "tent create called!",
        event
    })
}

const tentRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "retrieve tent was called!",
        event
    })
}

const tentRetrieveAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "retrieve tent was called!",
        event
    })
}

const tentPatch: ValidatedEventAPIGatewayProxyEvent<typeof tentHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "tent patch called!",
        event
    })
}

const tentDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "delete tent was called!",
        event
    })
}

export const tentCreateMiddy = middyfy(tentCreate)
export const tentRetrieveMiddy = middyfy(tentRetrieve)
export const tentRetrieveAllMiddy = middyfy(tentRetrieveAll)
export const tentPatchMiddy = middyfy(tentPatch)
export const tentDeleteMiddy = middyfy(tentDelete)