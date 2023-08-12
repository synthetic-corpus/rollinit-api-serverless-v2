import { campaignHTTP } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const campaignCreate = {
  // Make one campaign
  handler: `${handlerPath(__dirname)}/campaignhandlers.campaignCreateMiddy`,
  events: [
    {
      http: {
        cors: true,
        authorizer: 'authHandler',
        method: 'post',
        path: 'campaign',
        request: {
          schemas: {
            'application/json': campaignHTTP,
          },
        },
      },
    },
  ],
};

export const campaignRetrieve = {
    // retrive one campaign
    handler: `${handlerPath(__dirname)}/campaignhandlers.campaignRetrieveMiddy`,
    events: [
      {
        http: {
          cors: true,
          authorizer: 'authHandler',
          method: 'get',
          path: 'campaign/{id}'
        },
      },
    ],
  };

  export const campaignRetrieveAll = {
    // retrive all campaigns
    handler: `${handlerPath(__dirname)}/campaignhandlers.campaignRetrieveAllMiddy`,
    events: [
      {
        http: {
          cors: true,
          authorizer: 'authHandler',
          method: 'get',
          path: 'campaign'
        },
      },
    ],
  };

export const campaignUpdate = {
  handler: `${handlerPath(__dirname)}/campaignhandlers.campaignUpdateMiddy`,
    events: [
      {
        http: {
          cors: true,
          authorizer: 'authHandler',
          method: 'patch',
          path: 'campaign/{id}',
          request: {
            schemas: {
              'application/json': campaignHTTP,
            }
          }
        }
      }
    ]
}

export const campaignDelete = {
  handler: `${handlerPath(__dirname)}/campaignhandlers.campaignDeleteMiddy`,
    events: [
      {
        http: {
          cors: true,
          authorizer: 'authHandler',
          method: 'delete',
          path: 'campaign/{id}'
        },
      },
    ],
}