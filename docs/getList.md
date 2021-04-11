# List Messages

Show messages based on pagination and filter

**URL** : `/api/v1/messages`

**Method** : `GET`

**Query Params** : page default 1

**Query Params** : size default 10

**Query Params** : sort default -createdAt 

**Query Params** : palindromic 0|1 filter palindromic

## Success Responses

**Code** : `200`

```json
{
  "result": {
    "data": [
      {
        "_id": "6072451d39b1e69894f6d074",
        "message": "my test",
        "palindromic": false,
        "createdAt": "2021-04-11T00:38:53.190Z",
        "updatedAt": "2021-04-11T00:38:53.190Z",
        "__v": 0
      },
      {
        "_id": "6072184c7ba2e2952d7c2316",
        "message": "123",
        "palindromic": false,
        "createdAt": "2021-04-10T21:27:40.993Z",
        "updatedAt": "2021-04-10T21:27:40.993Z",
        "__v": 0
      }
    ],
    "currentPage": 2,
    "totalPages": 11,
    "totalRecords": 21,
    "currentSize": "2"
  },
  "message": "",
  "error": "",
  "timestamp": "2021-04-11T01:26:56.019Z"
}
```

## Error Responses

**Code** : `500`

```json
{
  "result": null,
  "message": "",
  "error": "Server Error",
  "timestamp": "2021-04-11T01:26:56.019Z"
}
```
