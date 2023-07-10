import { tentHTTP } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const tentCreate = {
  // Make one tent
  handler: `${handlerPath(__dirname)}/tenthandlers.tentCreateMiddy`,
  events: [
    {
      http: {
        authorizer: 'authHandler',
        method: 'post',
        path: 'tent',
        request: {
          schemas: {
            'application/json': tentHTTP,
          },
        },
      },
    },
  ],
};

export const tentRetrieve = {
    // retrive one tent
    handler: `${handlerPath(__dirname)}/tenthandlers.tentRetrieveMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'get',
          path: 'tent/{id}',
          request: {
            schemas: {
              'application/json': tentHTTP,
            },
          },
        },
      },
    ],
  };

  export const tentRetrieveAll = {
    // retrive all tents
    handler: `${handlerPath(__dirname)}/tenthandlers.tentRetrieveAllMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'get',
          path: 'tent',
          request: {
            schemas: {
              'application/json': tentHTTP,
            },
          },
        },
      },
    ],
  };

export const tentUpdate = {
  handler: `${handlerPath(__dirname)}/tenthandlers.tentUpdateMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'patch/{id}',
          path: 'tent'
        },
      },
    ],
}

export const tentDelete = {
  handler: `${handlerPath(__dirname)}/tenthandlers.tentDeleteMiddy`,
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