# create new messages

create a new message

**URL** : `/api/v1/messages`

**Method** : `POST`

**Payload** 
```json
{
  "message": "123"
}
```
    

## Success Responses

**Code** : `200`

```json
{
  "result": {
    "_id": "607251b9d578199b29b9f7e0",
    "message": "123",
    "palindromic": false,
    "createdAt": "2021-04-11T01:32:41.471Z",
    "updatedAt": "2021-04-11T01:32:41.471Z",
    "__v": 0
  },
  "message": "",
  "error": "",
  "timestamp": "2021-04-11T01:32:41.476Z"
}
```

## Error Responses

**Code** : `500`

**condition**: Server Error
```json
{
  "result": null,
  "message": "",
  "error": "Server Error",
  "timestamp": "2021-04-11T01:26:56.019Z"
}
```

**Code** : `400`  

**condition**: Invalid request payload
```json
{
  "result": null,
  "message": "malformed payload.",
  "timestamp": "2021-04-11T01:33:39.910Z"
}
```
