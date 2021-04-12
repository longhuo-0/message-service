# Test Result

```
api_1    | 
api_1    | > message-service@0.0.0 test:integrated /usr/src/app
api_1    | > mocha './test/message-service.integrated.test.js'
api_1    | 
api_1    | /api/v1
api_1    | start db connection mongodb://mongo/message-service-db
api_1    | 
api_1    | 
api_1    |   GET /messages
api_1    | db connection ok mongodb://mongo/message-service-db
api_1    |     ✓ should return all messages with default pagination orderby createAt desc (57ms)
api_1    |     ✓ should return messages with filter palindromic=1 orderby createAt desc
api_1    |     ✓ should return messages with filter palindromic=0 page=2 size=3 orderby createdAt asc
api_1    | 
api_1    |   POST /messages
api_1    |     ✓ should create a new message palindromic = false
api_1    |     ✓ should create a new message palindromic = true
api_1    |     ✓ should fail on creating a new message with malformed payload
api_1    |     ✓ should fail on creating a new message with message empty
api_1    | 
api_1    |   PUT /messages
api_1    |     ✓ should update an existing message with palindromic = false
api_1    |     ✓ should update an existing message with palindromic = true
api_1    |     ✓ should fail on updating an existing message with malformed payload
api_1    |     ✓ should fail on updating an existing message with message empty
api_1    |     ✓ should fail on updating a none-existing message
api_1    | 
api_1    |   DELETE /messages
api_1    |     ✓ should delete an existing message 
api_1    |     ✓ should fail on deleting a none-existing message
api_1    |     ✓ should fail on deleting a malformed id
api_1    | 
api_1    |   GET /messages/{id}
api_1    |     ✓ should get an existing message 
api_1    |     ✓ should fail on getting a none-existing message
api_1    |     ✓ should fail on getting a malformed id
api_1    | 
api_1    |   Express Server middleware test
api_1    |     ✓ none exist route should return 404
api_1    |     ✓ payload over 1mb should return http status code 413 (118ms)
api_1    | 
api_1    | 
api_1    |   20 passing (565ms)
api_1    | 
message-service_api_1 exited with code 0
``` 
