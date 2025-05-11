# Todo-List-API
Simple REST API to help me learn the basics of Express and Typescript. Project requirements can be found at [https://roadmap.sh/projects/todo-list-api](https://roadmap.sh/projects/todo-list-api).

## Instructions
To run:
- (Optional) Create a .env file in the format of the provided `.env.example`
- Run `npm install` to install the needed dependencies
- Run `npm run dev` to start the server
- Sample CURL requests:
```
curl -X POST -H 'Content-Type: application/json' -d '{"email": "email", "password": "password"}' http://localhost:3000/register
```
```
curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiaWF0IjoxNzQ2NjcyNjA3fQ.KGGLsvDbpo22EOoTHfNFT2D_uZR1VEhyPW4_PusrYLU' -d '{"title": "Clean cat litters", "description": "The cats poop in the litter box and it needs cleaning"}' http://localhost:3000/todos
```
