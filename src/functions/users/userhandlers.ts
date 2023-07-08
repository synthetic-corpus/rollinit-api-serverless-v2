// User CRUD exported

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { userHTTP } from './schema'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const userCreate: ValidatedEventAPIGatewayProxyEvent<typeof userHTTP> = async (event) => {
    return formatJSONResponse({
        message: "user Create called!",
        event,
    })
}

const userRetrieve: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return formatJSONResponse({
        message: "retrieve user was called!",
        event
    })
}

export const userCreateMiddy = middyfy(userCreate)
export const userRetrieveMiddy = middyfy(userRetrieve)