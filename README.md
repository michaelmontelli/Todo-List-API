# Todo-List-API
Simple REST API to help me learn the basics of Express and Typescript. Project requirements can be found at [https://roadmap.sh/projects/todo-list-api](https://roadmap.sh/projects/todo-list-api).

## Instructions
To run:
- (Optional) Create a .env file in the format of the provided `.env.example`
- Run `npm install` to install the needed dependencies
- Run `npm run dev` to start the server
- Sample CURL requests:
```
curl -X POST -H 'Content-Type: application/json' -d '{"email": "test@gmail.com", "password": "password"}' http://localhost:3000/register
```
```
curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek' -d '{"title": "Clean cat litters", "description": "The cats poop in the litter box and it needs cleaning"}' http://localhost:3000/todos
```
```
curl -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhZEB5YWhvby5jb20iLCJpYXQiOjE3NDY5MzAyNTF9.u1n_8okqT7iyQRJXdIyfBThZ4ODuMBEVf5XVnzmlS_o' -d '{"title": "Cut grass", "description": "The grass is long!"}' http://localhost:3000/todos/1
```

```
curl -X DELETE -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzQ2OTMzOTE4fQ.hioPEHV_1Xxew-6l_T8afeqlM5L7RZ5mKvJf4tAAwek' http://localhost:3000/todos/1
```
