import { userHTTP } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const userCreate = {
  handler: `${handlerPath(__dirname)}/userhandlers.userCreateMiddy`,
  events: [
    {
      http: {
        authorizer: 'authHandler',
        method: 'post',
        path: 'user',
        request: {
          schemas: {
            'application/json': userHTTP,
          },
        },
      },
    },
  ],
};

export const userRetrieve = {
    handler: `${handlerPath(__dirname)}/userhandlers.userRetrieveMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'get',
          path: 'user/self'
        },
      },
    ],
  };

export const userUpdate = {
  handler: `${handlerPath(__dirname)}/userhandlers.userUpdateMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'patch',
          path: 'user/patch'
        },
      },
    ],
}

export const userDelete = {
  handler: `${handlerPath(__dirname)}/userhandlers.userDeleteMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'delete',
          path: 'user/delete'
        },
      },
    ],
}