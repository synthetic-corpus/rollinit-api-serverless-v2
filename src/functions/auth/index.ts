import { handlerPath } from '@libs/handler-resolver';

export const authHandler = {
  handler: `${handlerPath(__dirname)}/handler.auth`
};