
# BookBuddy

Backend for BookBuddy Aplication



## Tech Stack

**Framework:** Spring boot

**Database:** Azure CosmosDB with MongoDB, Redis

**Storage:** Azure blob storage


# API Reference


## Register a user

```http
  POST /auth/register
```

**Authorization needed:** no

#### Request body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |
| `roles` | `string` | **Required**. User roles |

Returns a jwt token 


## Login

```http
  POST /auth/register
```

**Authorization needed:** no

#### Request body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |

Returns a jwt token 


## Get user email

```http
  GET /users/me
```

**Authorization needed:** yes, bearer token 

#### Response example

```json
  example@mail.com
```

## Delete user's own account

```http
  DELETE /users/me
```

**Authorization needed:** yes, bearer token 

#### Response example

```json
  Deleted a user
```

## Get all books

```http
  GET /books
```

**Authorization needed:** yes, bearer token

#### Response example

```json
  [
    {
        "title": "Refactoring: Improving the design of existing code",
        "author": "Martin Fowler",
        "tags": [
            "Coding",
            "Programming",
            "Refactoring"
        ],
        "subject": [
          "Programming"
        ],
        "avgRating": 4.5,
        "ratingsCount": 5,
        "coverUrl": "https://bookbuddy.blob.core.windows.net/book-covers/8a3c.jpg"
        "id": "6962f567f9565cbc5bedb9e0"
    },
    {
        "title": "Domain-Driven Design",
        "author": "Eric Evans",
        "tags": [
            "Desing patterns",
            "Programming"
        ],
        "subject": [
          "Programming"
        ],
        "avgRating": 5.0,
        "ratingsCount": 2,
        "coverUrl": "https://bookbuddy.blob.core.windows.net/book-covers/8a3c.jpg"
        "id": "6964bab6fe1abf37429662ea"
    },
    .....
  ]
```

## Get a book by id

```http
  GET /books/{bookId}
```
**Authorization needed:** yes, bearer token

#### Response example

```json
  [
    {
        "title": "Refactoring: Improving the design of existing code",
        "author": "Martin Fowler",
        "tags": [
            "Coding",
            "Programming",
            "Refactoring"
        ],
        "subject": [
          "Programming"
        ],
        "avgRating": 4.5,
        "ratingsCount": 5,
        "coverUrl": "https://bookbuddy.blob.core.windows.net/book-covers/8a3c.jpg"
        "id": "6962f567f9565cbc5bedb9e0"
    }
  ]
```


## Create a book

```http
  POST /books
```

**Authorization needed:** yes, bearer token

#### Request body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Book title |
| `author` | `string` | **Required**. Book author |
| `tags` | `Array[string]` | **Optional**. List of tags |
| `subjects` | `Array[string]` | **Optional**. List of subjects |

Returns the created book document

#### Response example

```json
  [
    {
        "title": "Refactoring: Improving the design of existing code",
        "author": "Martin Fowler",
        "tags": [
            "Coding",
            "Programming",
            "Refactoring"
        ],
        "subject": [
          "Programming"
        ],
        "avgRating": 4.5,
        "ratingsCount": 5,
        "id": "6962f567f9565cbc5bedb9e0"
    }
  ]
```

## Get ratings for a book

```http
  GET /books/{bookId}/ratings
```

**Authorization needed:** yes, bearer token

#### Response example

```json
  [
    {
        "id": "6964c6050ed7195970237c3e",
        "bookId": "6962f567f9565cbc5bedb9e0",
        "userId": "example@mail.com",
        "comment": "Good book",
        "rating": 5,
        "createdAt": "2026-01-12T09:59:33.643Z"
    },
    {
        "id": "6962f51df9565cbc5bedb9df",
        "bookId": "6962f567f9565cbc5bedb9e0",
        "userId": "example@mail.com",
        "comment": "Enjoyed reading it",
        "rating": 4.5,
        "createdAt": "2026-01-11T06:36:29.567Z"
    }
  ]
```

## Post review for a book

```http
  POST /books/{bookId}/rate
```

**Authorization needed:** yes, bearer token

#### Request body

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rating` | `number` | **Required**. Rating |
| `comment` | `Array[string]` | **Optional**. Comment |

Returns the created review document


## Get recommendations

```http
  POST /books/{bookId}/rate
```

**Authorization needed:** yes, bearer token

Returns a recommendations of books based on reviewed books of the user


## Delete a book

```http
  DELETE /books/{bookId}
```

**Authorization needed:** yes, bearer token

Returns success message if the book is successfully deleted


## Get user email

```http
  GET /users/me
```

**Authorization needed:** yes, bearer token

Returns email of the currently logged in user



