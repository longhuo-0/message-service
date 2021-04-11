# delete messages

**URL** : `/api/v1/messages/{id}`

**Method** : `DELETE`

## Success Responses

**Code** : `200`

```json
{
  "result": "message deleted",
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

**condition**: Malformed payload
```json
{
  "result": null,
  "message": "malformed payload.",
  "timestamp": "2021-04-11T01:33:39.910Z"
}
```
