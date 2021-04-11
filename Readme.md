### Cloud Audition Project

## Project Description
- Application manages messages and provides details about those messages, specifically whether a message is a palindrome. 
- Project api is designed follow Rest Design Pattern. [See API Doc](API.md).
- Application created by using nodejs and storing data in mongo db.
- Application tested in node version 10, 12, 14, 15 by github actions.
 

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

[Unit Test Result](docs/images/command-line-test-result.md)

### Integrated Test (this will clear the message collection. make sure change `.env` MONGO_DB_URL to dev env before executing it)

    npm run test:integrated

### GitHub Action Report Unit Test Report

[Unit Test Result](https://github.com/GoodSpeed-HL/message-service/runs/2315423072?check_suite_focus=true)


