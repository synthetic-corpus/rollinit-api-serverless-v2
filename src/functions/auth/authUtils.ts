// Utilities used to deal with JSON tokens and user identification.

import { decode, verify } from 'jsonwebtoken'
import { JwtPayload, Jwt } from './auth_interfaces'
import Axios from 'axios'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { config } from '../../../src/config'

export function getUserId(event: APIGatewayProxyEvent): string | undefined {
    const authorization = event.headers.authorization as string
    if(authorization){
        //console.log(authorization)
        const split: string[] = authorization.split(/[ %,]+/)
        const jwtToken = split[1].replace('"','')
        return parseUserId(jwtToken)
    }
}

export function parseUserId(jwtToken: string): string {
    //console.log("parsing user id with...",jwtToken)
    const decodedJwt = decode(jwtToken) as JwtPayload
    //console.log("paresed user id payload as....",decodedJwt.sub)
    return decodedJwt.sub
  }

export async function verifyToken(authHeader: string): Promise<JwtPayload> {
    try{const token = getToken(authHeader)
    //console.log("The token I got was.... ",token)
    const jwt: Jwt = decode(token, { complete: true }) as Jwt
    //console.log("I tried to decode and got ",jwt)
    const rawCert: string = await matchToKey(jwt.header.kid)
    const cert = stringToPEM(rawCert)
    //console.log("Raw Cert Acquired!")
    const returnabel = verify(token, cert, { algorithms: ['RS256']}) as JwtPayload
    console.log(returnabel)
    return returnabel}
    catch(e){
        throw new Error(e)
    }
  }
  
  function getToken(authHeader: string): string {
    //console.log(authHeader)
    if (!authHeader) throw new Error('No authentication header')
  
    if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')
    const split = authHeader.split(/[ ,]+/)
    const token = split[1].replace('"','')
    //console.log("Get Token gets ",token)
    return token
  }
  
  async function matchToKey(kid: any): Promise<string> {
    try{
      const actualKeys = await Axios.get(config.authUrl)
      const signerKey = actualKeys.data.keys.filter((key: { [x: string]: string }) => {key[kid] === kid})[0] || actualKeys.data.keys[0]
      const x5cKey: string = signerKey.x5c[0]
      if(!x5cKey){
        throw new Error(`Unable to Match any Keys. x5cKey not extracted.`)
      }
  
      return x5cKey
    }catch(e){
      throw new Error(`Unable to Match any Keys. x5cKey not extracted.`)
      return ''
    }
    
  }
  
  function stringToPEM(cert: string): string {
    // @ts-ignore: Object is possibly 'null'
    const newCert: string = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${newCert}\n-----END CERTIFICATE-----\n`;
    return cert;
  }