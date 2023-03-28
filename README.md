# BookBuddy : A Book Management CRUD API
This is a REST API for managing a collection of books, built using Node.js and Express. The API allows users to perform CRUD (create, read, update, delete) operations on books using HTTP requests.

**Website** :  [https://books-backend-w7z6.onrender.com/](https://books-backend-w7z6.onrender.com/)

## Features

- Getting All the books
- Adding Books with verification
- Getting a particular book
- Updating the details of a book
- Deting the book according to id
- **Sorting books on the basis of queries given and pagination**

## Endpoints

### Books

#### I Getting all the books

```js
  GET https://books-backend-w7z6.onrender.com/books
```

#### Body :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user                |

#### Usage

javascript:

```javascript
const GetBooks = await fetch('https://books-backend-w7z6.onrender.com/books', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Secret: process.env.Secret})
});
const response_json = await GetBooks.json();
console.log(response_json);
```

#### response

```javascript
{
  "Success": true,
  "Books": [
    {
      "_id": "642189921d18f3fe8bb42ab1",
      "id": "CSNWQA",
      "Title": "Atomic",
      "Description": "A book that helps you maintain the habits",
      "Author": "James Clear",
      "PublishedDate": "27.03.2023",
      "__v": 0
    },
    {
      "_id": "64218aec4ab10543c428049b",
      "id": "NGYWXC",
      "Title": "Atomic habits",
      "Description": "A book that helps you maintain the habits",
      "Author": "James Clear",
      "PublishedDate": "27.03.2023",
      "__v": 0
    }
  ]
}

```

#### I I Verification and creation of a new Book:

```js
  POST https://books-backend-w7z6.onrender.com/books
```

#### Body :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Title`     | `string` | **Required** Name    |
| `Author`    | `string` | **Required** Email add                 |
| `Description` | `string` | **Required** password (min length : 8) |
| `PublishedDate` | `number` | **Required** password (length : 6) |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user                |

#### Usage

javascript:

```javascript
const createNewBook = await fetch(
  "https://books-backend-w7z6.onrender.com/books",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: credentials.Title,
      Author: credentials.Author,
      Description: credentials.Description,
      PublishedDate: credentials.PublishedDate
      Secret: credentials.Secret
    }),
  }
);
const newbook_response = await createNewBook.json();
console.log(newBook_response);
```

#### response

```javascript
{
  "Success": true,
  "Message": "Book is successfuly saved to Database",
  "Book ID": "JGETBI"
}

```

### Getting book of particular ID

```js
  GET /books/:id
```

#### Body :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user |

#### Params
| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `id`    | `string` | **Required** Book Id             |

#### Usage

javascript:

```javascript
const GetBookFromID = await fetch(
  "https://books-backend-w7z6.onrender.com/books/JGETBI",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
          Secret: credentials.Secret
    }),
  }
);
const res = await GetBookFromID.json();
console.log(res);
```

#### Response

```javascript
{
  "Success": true,
  "Book": {
    "_id": "64226ea1494ffe4100aacb28",
    "id": "JGETBI",
    "Title": "Rich Dad Poor Dad",
    "Description": "Teaches you how to manage money",
    "Author": "Rich Dad",
    "PublishedDate": "27.03.2023",
    "__v": 0
  }
}

```

### Updating the book according to id given

```js
  PUT https://books-backend-w7z6.onrender.com/books/:id
```

#### Body :
| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Title`     | `string` | **Required** Name    |
| `Author`    | `string` | **Required** Email add                 |
| `Description` | `string` | **Required** password (min length : 8) |
| `PublishedDate` | `number` | **Required** password (length : 6) |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user |

#### Params
| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `id`    | `string` | **Required** Book Id             |

#### Usage

javascript:

```javascript
const update = await fetch(
  "https://books-backend-w7z6.onrender.com/books/:id",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: credentials.Title,
      Author: credentials.Author,
      Description: credentials.Description,
      PublishedDate: credentials.PublishedDate
      Secret: credentials.Secret
    }),
  }
);
const res = await update.json();
console.log(res);
```

#### response

```javascript
{
  "Success": true,
  "Message": "Book is successfuly Updated",
  "Book details": {
    "_id": "64226ea1494ffe4100aacb28",
    "id": "JGETBI",
    "Title": "Rich Dad Poor Dad",
    "Description": "Teaches you how to manage money",
    "Author": "Rich Dad",
    "PublishedDate": "27.03.2023",
    "__v": 0
  }
}

```

### Deleting Book By Id
Deleting the book for the given id

```js
  DELETE https://books-backend-w7z6.onrender.com/books/:id
```

#### Body :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user |

#### Params
| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `id`    | `string` | **Required** Book Id             |

#### Usage

javascript:

```javascript
const deletebook = await fetch(
  "https://books-backend-w7z6.onrender.com/books/:id",
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      Secret: credentials.Secret
    }),
  }
);

const response = await deletebook.json();
console.log(response);
```

#### response

```javascript
{
  "Success": true,
  "Message": "Book with the book id JGETBI and name Rich Dad Poor Dad was deleted"
}

```

### Filtering the book according to query , number of pages and sorting as well

```js
  POST https://books-backend-w7z6.onrender.com/books/find?Title=Atomic&pages=10
```

#### Body :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Secret`    | `string` | **Required** A Secret Key that verififes the user |\

#### Queries :

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `Title`    | `string` | **Required** Title of the book |
| `Author`    | `string` | **Required** Author of the books |
| `PublishedDate`    | `string` | **Required** Book Published on a particular date |
| `Pages`    | `string` | **Required** Number of books you want to recieve |

#### Usage

javascript:

```javascript
const filteredbooks = await fetch(
  "https://books-backend-w7z6.onrender.com/books/find?Title=Atomic&pages=10",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Secret: credentials.Secret
    }),
  }
);

const response = await filteredbooks.json();
console.log(response)
```

#### response

```javascript
{
  "Success": true,
  "Books": [
    {
      "_id": "642189921d18f3fe8bb42ab1",
      "id": "CSNWQA",
      "Title": "Atomic",
      "Description": "A book to change your habits",
      "Author": "James Clear",
      "PublishedDate": "27.03.2023",
      "__v": 0
    }
  ]
}

```

## Support

For any issue or query I'll love to hear at : ayushbaliyan05@gmail.com

## Contact Me <br>


<a href="https://www.linkedin.com/in/ayush-baliyan/" target="_blank" rel="noopener noreferrer">
  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="" width="50px" height="50px">
</a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://github.com/Ayush-Baliyan-19" target="_blank" rel="noopener noreferrer">
  <img src="https://cdn-icons-png.flaticon.com/512/733/733609.png" alt="" width="50px" height="50px">
</a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="mailto://developer.authking@gmail.com" target="_blank" rel="noopener noreferrer">
  <img src="https://cdn-icons-png.flaticon.com/512/60/60543.png" alt="" width="50px" height="50px">
</a>
