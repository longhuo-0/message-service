# Cloud Audition Project

## Project Description

- Application manages messages and provides details about those messages, and determine whether a
  message is a palindrome.
- Project api is designed follow Rest Design Pattern. [See API Doc](API.md).
- Application created by using nodejs and storing data in mongodb.net mongo db.
- Application tested in node version 10, 12, 14, 15 by github actions.

## Before using on local env

- NodeJS 12+
- MongoDB installed and running locally
- Run `npm install` or `yarn` in your root project folder

## Start Application

edit package.json `start` script `MONGO_DB_URI` to point to your local mongodb environment

    npm install
    npm run start //start application at localhost:3000

## Use Docker for local testing

Important Setup .env.dev in your project root

```
API_ENDPOINT=/api/v1
NODE_ENV=development
MONGO_DB_URI=mongodb://your-mongodb-connction-string/message-service-db
```

- start container

```
docker-compose up -d //start application at localhost:3000
```

## API Doc

[API Doc](API.md)

### Unit Test

    npm run test:unit

[Unit Test Result](docs/images/command-line-test-result.md)

### Integrated Test make sure .env.dev file is ready

    docker-compose -f docker-compose-intergrated-test.yml up 

### GitHub Action Report Unit Test Report

[Unit Test Result](https://github.com/GoodSpeed-HL/message-service/runs/2315423072?check_suite_focus=true)


