# Cloud Audition Project

## Description

- This application manages messages and provides details about those messages, and determine whether
  a message is a palindrome.
- System deployed on Amazon and using AWS Application Load Balancer to manage network traffic to
  docker swarm nodes.
- Chosen Node as rest api server and use mongo atlas as storage.
- Application tested in node version 12, 14, 15 by github actions.
- Project api is designed follow Rest Design Pattern. [See API Doc](API.md).

## Architecture

![alt text](docs/images/MessageServiceDiagram.png)

## Before using on local env

- NodeJS 12+
- MongoDB installed and running locally
- Run `npm install` or `yarn` in your root project folder

## Start Application

edit package.json `start` script `MONGO_DB_URI` to point to your local mongodb environment

    npm install
    npm run start //start application at localhost:3000

## Use Docker for local development

- start container

```
docker-compose up -d //start application at localhost:3000
```

## API Doc

[API Doc](API.md)

### Unit Test

    npm run test:unit

[Unit Test Result](docs/images/command-line-test-result.md)

### Integrated

    docker-compose -f docker-compose-integrated-test.yml up 

[integrated Test Result](docs/images/command-line-test-result-2.md)

### GitHub Action Report Unit Test Report

[Unit Test Result](https://github.com/GoodSpeed-HL/message-service/runs/2315423072?check_suite_focus=true)

### Find unexpected response? use debug env to log detailed log, e.g mongodb query and nodejs error trace

```bash
# DEBUG=message-service:* ...other_env_vars npm run start
```
