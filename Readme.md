### Cloud Audition Project

## Project Description
- Application manages messages and provides details about those messages, specifically whether a message is a palindrome. 
- Application created by using nodejs and storing data in mongo db. Application tested in node version 10, 12, 14, 15 by github actions.
- API follows the RESTAPI design. [See API Doc](API.md). 

## Before using on local env
- NodeJS 12+
- MongoDB installed and running locally
- Run `npm install` or `yarn` in your root project folder

## Start Application
    npm isntall
    npm run start //start application on localhost:3000

## API Doc
[API Doc](API.md)

### Unit Test
    npm run test:unit

[Simple Test Result](docs/getList.md)


###Integrated Test (this will clear the message collection. make sure change `.env` MONGO_DB_URL to local env before executing it) 
    npm run test:integrated


