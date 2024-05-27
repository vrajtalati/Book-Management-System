
# Book-Management -System

This project is a provides backend for book managemnet .

APi endpoints for testing on postman:

Register user:(POST)

http://localhost:3000/api/auth/register/user

Login user:(POST)

http://localhost:3000/api/auth/login/user

Register Seller:(POST)

http://localhost:3000/api/auth/register/seller

Login Seller:(POST)

http://localhost:3000/api/auth/login/seller

Upload Book:(POST)

http://localhost:3000/api/books/upload

Get All books:(GET)

http://localhost:3000/api/books/

Get Single Book:(GET)

http://localhost:3000/api/books/:id

Delete Book:(DELETE)

http://localhost:3000/api/books/:id




## Features

- Secure Login and Signup for user and seller .
- Seller can uplaod books using csv file.
- Seller can delete and update there book.
- User can view ll books and a single book.




## Tech Stack

**Server:** Typescript, Nodejs, Express, Prisma Orm,Multer
 
**Database:** PostgreSql

**Authentication:** Jwt 



## Run Locally

Clone the project

```bash
  git clone https://github.com/vrajtalati/Alumni_Connect.git
```

Go to the project directory

```bash
  cd Book_Management_System
```

Install dependencies

```bash
  npm i
```
envfile setup
```bash
DATABASE_URL=""
JWT_SECRET=""
PORT=3000

```

 Prisma Migration
```bash
npx prisma migrate dev --name init                        
npx prisma generate
```


Start the server

```bash
   npx tsc
   node dist/app.js
```







