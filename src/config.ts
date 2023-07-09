// Will use either or statements to get these from Parameters in AWS for production.
export const config = {
    authUrl: process.env.AUTH_URL,
    port: process.env.API_PORT,
    mongoAddress: process.env.MONGO_ADDRESS,
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASS,
    mongoPrefix: process.env.MONGO_PREFIX
}