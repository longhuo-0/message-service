# get one message

**URL** : `/api/v1/messages/{id}`

**Method** : `GET`

## Success Responses

**Code** : `200`

```json
{
  "result": {
    "_id": "607246bc39b1e69894f6d075",
    "message": "123321",
    "palindromic": true,
    "createdAt": "2021-04-11T00:45:48.781Z",
    "updatedAt": "2021-04-11T01:36:19.674Z",
    "__v": 0
  },
  "message": "",
  "error": "",
  "timestamp": "2021-04-11T01:36:19.683Z"
}
```

## Error Responses

**Code** : `404`

**condition**: Record Not Found
```json
{
  "result": null,
  "message": "record not found.",
  "timestamp": "2021-04-11T01:37:18.985Z"
}
```

**Code** : `400`  

**condition**: Malformed Id (id is auto generated from mongodb)
```json
{
  "result": null,
  "message": "malformed payload.",
  "timestamp": "2021-04-11T01:33:39.910Z"
}
```
