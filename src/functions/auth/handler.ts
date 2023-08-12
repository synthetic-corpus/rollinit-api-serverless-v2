import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult, } from 'aws-lambda'
import { verifyToken } from './authUtils'


export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    //console.log("Auth handler called!")
    try {
        // console.log(event.authorizationToken)
        const jwtToken = await verifyToken(event.authorizationToken)
        //console.log(jwtToken)
        console.log("Auth Token succeeded. Permission granted to: ",jwtToken.sub)
        console.log("Completed JWT Token: ",jwtToken)
        return {
          principalId: jwtToken.sub,
          policyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Action: 'execute-api:Invoke',
                Effect: 'Allow',
                Resource: '*'
              }
            ]
          }
        }
      } catch (e) {
        console.log("Authentication failed with: ",e)
        return {
          principalId: 'user',
          policyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Action: 'execute-api:Invoke',
                Effect: 'Deny',
                Resource: '*'
              }
            ]
          }
        }
      }
}


export const auth = handler // may use middleware in the future. For now, now way.