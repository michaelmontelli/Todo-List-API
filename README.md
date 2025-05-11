# Todo-List-API
Simple REST API to help me learn the basics of Express and Typescript. Project requirements can be found at [https://roadmap.sh/projects/todo-list-api](https://roadmap.sh/projects/todo-list-api).

## Instructions
To run:
- (Optional) Create a .env file in the format of the provided `.env.example`
- Run `npm install` to install the needed dependencies
- Run `npm run dev` to start the server
- Sample CURL requests:
    - Register email
```
curl -X POST 'http://localhost:3000/register' -H 'Content-Type: application/json' -d '{"email": "test@gmail.com", "password": "password"}'
```
    - Create todo item
```
curl -X POST 'http://localhost:3000/todos' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek' -d '{"title": "Clean cat litters", "description": "The cats poop in the litter box and it needs cleaning"}'
```
    - Update todo item
```
curl -X PUT 'http://localhost:3000/todos/1' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek' -d '{"title": "Cut grass", "description": "The grass is long!"}'
```
    - Delete todo item
```
curl -X DELETE 'http://localhost:3000/todos/1' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek'
```
    - Get todo items with pagination
```
curl -X GET 'http://localhost:3000/todos?page=1&limit=1' -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek'
```
