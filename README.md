# Personal Library Microservice - User Documentation
#### Overview:
  - [Description](#description)
  - [Api End Points](#api-end-points)
  - [Visit Site](https://obn-personal-library.onrender.com/)

## Description
Welcome to My Personal Library, your one-stop shop for effective book management and lively discussions. A user-friendly interface allows you to easily add, discover, and discuss your books. All in one spot, you may enjoy well-organized libraries and important talks about your favorite books.

![image](https://github.com/obedNuertey1/personal_Library_project/assets/101027384/b970c245-2aab-4f31-9e5e-7c55a9ab36a2)

## Api End Points
* You can send a POST request to `/api/books` with title as part of the form data to add a book. The returned response will be an object with the title and a unique _id as keys. If title is not included in the request, the returned response should be the string missing required field title.
* You can send a GET request to `/api/books` and receive a JSON response representing all the books. The JSON response will be an array of objects with each object (book) containing title, _id, and commentcount properties.
* You can send a GET request to `/api/books/{_id}` to retrieve a single object of a book containing the properties title, _id, and a comments array (empty array if no comments present). If no book is found, return the string no book exists.
* You can send a POST request containing comment as the form body data to `/api/books/{_id}` to add a comment to a book. The returned response will be the books object similar to GET `/api/books/{_id}` request in an earlier test. If comment is not included in the request, return the string missing required field comment. If no book is found, return the string no book exists.
* You can send a DELETE request to `/api/books/{_id}` to delete a book from the collection. The returned response will be the string delete successful if successful. If no book is found, return the string no book exists.
* You can send a DELETE request to `/api/books` to delete all books in the database. The returned response will be the string complete delete successful if successful.
