module.exports = {
  messages: {
    "success": true,
    "result": [
      {
        "_id": "606feb13a7730c4975962803",
        "message": "123321",
        "palindromic": true,
        "createdAt": "2021-04-09T05:50:11.052Z",
        "updatedAt": "2021-04-09T05:50:11.052Z",
        "__v": 0
      },
      {
        "_id": "606feb7ba7730c4975962804",
        "message": "Sagas",
        "palindromic": true,
        "createdAt": "2021-04-09T05:51:55.845Z",
        "updatedAt": "2021-04-09T05:51:55.845Z",
        "__v": 0
      },
      {
        "_id": "606feb87a7730c4975962805",
        "message": "Step on no pets",
        "palindromic": true,
        "createdAt": "2021-04-09T05:52:07.409Z",
        "updatedAt": "2021-04-09T05:52:07.409Z",
        "__v": 0
      },
      {
        "_id": "606feb8fa7730c4975962806",
        "message": "My gym",
        "palindromic": true,
        "createdAt": "2021-04-09T05:52:15.802Z",
        "updatedAt": "2021-04-09T05:52:15.802Z",
        "__v": 0
      },
      {
        "_id": "606feb9ea7730c4975962807",
        "message": "my random test message 01",
        "palindromic": false,
        "createdAt": "2021-04-09T05:52:30.159Z",
        "updatedAt": "2021-04-09T05:52:30.159Z",
        "__v": 0
      },
      {
        "_id": "606feba0a7730c4975962808",
        "message": "my random test message 02",
        "palindromic": false,
        "createdAt": "2021-04-09T05:52:32.507Z",
        "updatedAt": "2021-04-09T05:52:32.507Z",
        "__v": 0
      }
    ],
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:52:35.510Z"
  },
  messagesLimit1: {
    "success": true,
    "result": [
      {
        "_id": "606feb13a7730c4975962803",
        "message": "123321",
        "palindromic": true,
        "createdAt": "2021-04-09T05:50:11.052Z",
        "updatedAt": "2021-04-09T05:50:11.052Z",
        "__v": 0
      },
    ],
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:52:35.510Z"
  },
  createSuccess: {
    "success": true,
    "result": {
      "_id": "606feba0a7730c4975962808",
      "message": "my random test message 02",
      "palindromic": false,
      "createdAt": "2021-04-09T05:52:32.507Z",
      "updatedAt": "2021-04-09T05:52:32.507Z",
      "__v": 0
    },
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:52:32.515Z"
  },
  createFail: {
    "success": false,
    "result": null,
    "message": "invalid payload",
    "error": "",
    "timestamp": "2021-04-09T05:53:27.588Z"
  },
  getByIdSuccess: {
    "success": true,
    "result": {
      "_id": "606feb8fa7730c4975962806",
      "message": "My gym",
      "palindromic": true,
      "createdAt": "2021-04-09T05:52:15.802Z",
      "updatedAt": "2021-04-09T05:52:15.802Z",
      "__v": 0
    },
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:54:43.256Z"
  },
  getByIdFailed: {
    "success": true,
    "result": null,
    "message": "record not found",
    "error": "",
    "timestamp": "2021-04-09T05:55:39.063Z"
  },
  deleteByIdFailed: {
    "success": false,
    "result": null,
    "message": "delete message 606e8e3c80fd745682a02891 failed",
    "error": "record not found",
    "timestamp": "2021-04-09T03:46:59.471Z"
  },
  deleteByIdSuccess: {
    "success": true,
    "result": {
      "_id": "606feb87a7730c4975962805",
      "message": "Step on no pets",
      "palindromic": true,
      "createdAt": "2021-04-09T05:52:07.409Z",
      "updatedAt": "2021-04-09T05:52:07.409Z",
      "__v": 0
    },
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:57:16.625Z"
  },
  updateByIdSuccess: {
    "success": true,
    "result": {
      "_id": "606feb8fa7730c4975962806",
      "message": "1234321",
      "palindromic": true,
      "createdAt": "2021-04-09T05:52:15.802Z",
      "updatedAt": "2021-04-09T05:58:23.450Z",
      "__v": 0
    },
    "message": "",
    "error": "",
    "timestamp": "2021-04-09T05:58:23.456Z"
  },
  updateByIdFailed: {
    "success": false,
    "result": null,
    "message": "update message 606feb8fa7730c4975962801 failed",
    "error": "record not found",
    "timestamp": "2021-04-09T06:00:50.615Z"
  }
}
