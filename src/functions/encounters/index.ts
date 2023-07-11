import { encounterHTTP } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const encounterCreate = {
  // Make one encounter
  handler: `${handlerPath(__dirname)}/encounterhandlers.encounterCreateMiddy`,
  events: [
    {
      http: {
        authorizer: 'authHandler',
        method: 'post',
        path: 'encounters',
        request: {
          schemas: {
            'application/json': encounterHTTP,
          },
        },
      },
    },
  ],
};

export const encounterRetrieve = {
    // retrive one encounter
    handler: `${handlerPath(__dirname)}/encounterhandlers.encounterRetrieveMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'get',
          path: 'encounters/{id}',
          request: {
            schemas: {
              'application/json': encounterHTTP,
            },
          },
        },
      },
    ],
  };

  export const encounterRetrieveAll = {
    // retrive all encounters
    handler: `${handlerPath(__dirname)}/encounterhandlers.encounterRetrieveAllMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'get',
          path: 'encounters',
          request: {
            schemas: {
              'application/json': encounterHTTP,
            },
          },
        },
      },
    ],
  };

export const encounterUpdate = {
  handler: `${handlerPath(__dirname)}/encounterhandlers.encounterUpdateMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'patch',
          path: 'encounters/{id}'
        },
      },
    ],
}

export const encounterDelete = {
  handler: `${handlerPath(__dirname)}/encounterhandlers.encounterDeleteMiddy`,
    events: [
      {
        http: {
          authorizer: 'authHandler',
          method: 'delete',
          path: 'encounters/{id}'
        },
      },
    ],
}