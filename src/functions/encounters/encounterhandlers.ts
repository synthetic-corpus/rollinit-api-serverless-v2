/*
    These are the encounters that the DM sets up.
*/
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway"
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda"
import { formatJSONResponse } from "@libs/api-gateway";
import { encounterHTTP } from "./schema";
import { middyfy } from "@libs/lambda";

const encounterCreate: ValidatedEventAPIGatewayProxyEvent<typeof encounterHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "encounter create called!",
        event
    })
}

const encounterRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "retrieve encounter was called!",
        event
    })
}

const encounterRetrieveAll: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "retrieve encounter was called!",
        event
    })
}

const encounterPatch: ValidatedEventAPIGatewayProxyEvent<typeof encounterHTTP> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "encounter patch called!",
        event
    })
}

const encounterDelete: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "delete encounter was called!",
        event
    })
}

export const encounterCreateMiddy = middyfy(encounterCreate)
export const encounterRetrieveMiddy = middyfy(encounterRetrieve)
export const encounterRetrieveAllMiddy = middyfy(encounterRetrieveAll)
export const encounterPatchMiddy = middyfy(encounterPatch)
export const encounterDeleteMiddy = middyfy(encounterDelete)