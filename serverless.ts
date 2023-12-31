import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import {userCreate, userRetrieve, userUpdate, userDelete} from '@functions/users'
import {tentCreate, tentRetrieve, tentRetrieveAll, tentUpdate, tentDelete } from '@functions/tents'
import { encounterCreate, encounterRetrieve, encounterRetrieveAll, encounterUpdate, encounterDelete } from '@functions/encounters';
import { authHandler } from '@functions/auth'

const serverlessConfiguration: AWS = {
  service: 'rollinit-api-serverless-v2',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {

      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AUTH_URL: '${env:AUTH_URL}',
      MONGO_ADDRESS: '${env:MONGO_ADDRESS}',
      MONGO_USER: '${env:MONGO_USER}',
      mongoPass: '${env:MONGO_PASS}',
      mongoPrefix: '${env:MONGO_PREFIX}'
    },
  },
  // import the function via paths
  functions: {
    authHandler, 
    hello,
    // User Paths
    userCreate,
    userRetrieve,
    userUpdate,
    userDelete,
    // Tent Paths
    tentCreate,
    tentRetrieve,
    tentRetrieveAll,
    tentUpdate,
    tentDelete,
    // Encounters
    encounterCreate,
    encounterRetrieve,
    encounterRetrieveAll,
    encounterUpdate,
    encounterDelete
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
