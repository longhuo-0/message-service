# Test Result

    #npm run test:unit
     isPalindromic unit test
    ✓ empty string return false
    ✓ Rotator - should return true
    ✓ Racecar - should return true
    ✓ tattarrattat - should return true
    ✓ A Santa Lived As a Devil At NASA - should return true
    ✓ Are we not pure? “No, sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man—a prisoner up to new era. 
    
    should return true
    ✓ Canada should return false
    
    Message Restful API Unit Test
    Create New Message
    ✓ create new message, correct format - should return true
    ✓ create new message, empty message content - should return false
    ✓ create new message, malformed payload - should return false
    Update Existing Message
    ✓ update message, malformed payload - should not passing controller validation
    ✓ update message, empty message content - should not passing controller validation
    ✓ update message, malformed path params id - should not passing controller validation
    ✓ update message, none exist id path params id - should not passing controller validation
    Get One Message
    ✓ get one message, valid message id - should return true
    ✓ get one message, malformed path params id - should not passing controller validation
    ✓ get one message, none exist id path params id - should passing validation but return null in service
    Delete One Message
    ✓ delete one message, valid message id - should pass
    ✓ delete one message, malformed path params id - should not pass controller validation
    ✓ delete one message, none exist path params id - should pass controller validation but return null in service and return error
    List Messages
    ✓ get message list, no filter, use default pagination - should return true
    ✓ get message list, filter palindromic=1, use default pagination - should return true
    ✓ get message list, filter palindromic=0, use default pagination - should return true
    ✓ get message list, no filter, use page=2&size=3 - should return true
    ✓ get message list, no filter, size=5 - should return true
    ✓ get message list, invalid query params sort=ID - should return false
    ✓ get message list, invalid query params sort = whitespace - should return false
    ✓ get message list, sort not in allowed sort list - should return false
    ✓ get message list, page = -5 - should return false
    ✓ get message list, page = 101 - should return true
    
    Message Service Unit Test
    create
    ✓ should create new message
    ✓ should not save - simulate mongo general
    ✓ should not save - simulate mongo error
    get
    ✓ get a message from a valid objectId, should pass
    ✓ get message from invalid record objectId, should pass
    ✓ get message from malformed objectId, should fail
    update
    ✓ update a message with a valid objectId, should pass
    ✓ update message from invalid record objectId, should return null
    ✓ update a message from malformed objectId, should throw error
    ✓ update a message from valid objectId, but message content is empty should throw error
    delete
    ✓ delete a message from a valid objectId, should pass
    ✓ get message from invalid record objectId, should return null
    ✓ get message from malformed objectId, should throw error
    getList
    ✓ get message list, no filter, use default pagination - should return array of messages
    ✓ get message list, filter palindromic only, use default pagination - should return array of messages
    ✓ get message list, filter palindromic false, use page=19 - should return array of messages
    
    
    46 passing (112ms)
