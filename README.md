# rollinit-api-serverless-v2

This is a serverless API. This project is the back end for the [Roll Init project](https://www.youtube.com/watch?v=1nW_T2IStAA),
which is designed to allow dungeon masters to quickly set up initiatives for Dungeons and Dragons 5e.

A video introduction of this project can be found here.

I am no longer maintaining this project, but it is documented here.

## What is Required to Deploy this?

This project currently uses two non-AWS services for deployment.

First, users should set up an [Auth0 application](https://auth0.com/) for purposes of authentication.
This applications allows users to authenticate with Google, Facebook etc.

It has the added benefit of not requiring the developer to handle authentication. :-)

The second thing needed is a [MongoDB](https://www.mongodb.com/) for database storage. Set up a user name and password along with a database once you sign in. This database will need to be publicly accessible for the application to work.

Various URLs and strings from both Auth0 and MongoDB will be referenced in the serverless configuration.

## Does this Cost anything?
Deploying this application will incur costs with AWS. I assume no liability for that. ;-)

## What Knowledge of AWS is required to Deploy this project?
This project uses [Serverless](https://www.serverless.com/), and its full documentation can be found [here](https://www.serverless.com/framework/docs). Users must have the Serverless CLI installed as well.

The project also relies on manually entering strings into AWS Parameter Store. Please see its [documention.](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

Finally, it assumed that a user of this project knows how to work with AWS Cli. Users will also need to know how to configure an AWS profile with sufficient permissions to deploy the stack (make lambdas, tags, read secret parameters etc). AWS's official documentation of [IAM is here](https://docs.aws.amazon.com/systems-manager/latest/userguide/security-iam.html) and the aws [CLI documentation is here](https://aws.amazon.com/cli/).

## Configuring the Project for Deployment

All parameters should be set up using AWS Parameter Store. There should be no need to edit the code directly. However, strings could be hard coded under the "environment" value of the Serverless.ts file.

An explanation of each value is here:

### AUTH_URL: '{ssm:auth_url}'
Name a parameter store as 'auth_url'. Set it to a secure string. Put the URL of your Auth0 project here with a reference to the URL used for authentication. It should look something like https://my-cool-project.auth0.com/.well-known/jwks.json

### MONGO_ADDRESS: '{ssm:mongo_address}'
This parameter does not need to be a secure string, but ensure the name is 'mongo_address'. It the name of your Mongo cluster without an http. Example? cluster0.cyzee.mongodb.net

### MONGO_USER: '{ssm:mongo_user}'
Does not need to be secure. Make sure the value of 'mongo_user' matches the username set up in MongoDB.

### MONGO_PASSWORD: '{ssm:mongo_password}'
This should be secure parameter. The value should be the password set up in MongoDB.

### MONGO_PREFIX: '{ssm:mongo_prefix}'
This value could be hardcoded. The value here is a string that used in concatenation with the other two 'mongo' values to create a url that connects to mongo. This value can simply be 'mongodb+srv://' without quotations.

## Deploying the App.
Once all the parameters have been set up, the Serverless CLI has been installed, and you have a profile with right permissions the stack can be deployed. In a terminal, navigate to the root of the project and run the following command:

sls deploy -c severless.ts --aws-profile %name of profile you set up in AWS CLI%