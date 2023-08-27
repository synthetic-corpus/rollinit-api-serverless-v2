import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (code: number, response: object) => {
  
  const httpReply: {code: number, message?: String, data?: any, error?: boolean} = {code: code, data: response}
  return {
    statusCode: code,
    body: JSON.stringify(httpReply)
  }
}
