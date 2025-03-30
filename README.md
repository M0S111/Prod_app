# A practice repository

This is a very simple project with API endpoints which perform CRUD operations on products table in a Postgres DB.

## Prerequisites
- Node.js
- npm
- Docker

## Dependencies

First run `npm install` in the root directory to install dependencies.

## Postgres Container

Then build the container with:

`docker build -t my-postgres-image .`

followed by:

`docker run -d -p 5432:5432 --name my-postgres my-postgres-image`

## Environment Variables

Craete a `.env` file in the root of the project, setting the following variables:

```
DB_USER=postgres
DB_DATABASE=store_db
DB_HOST=localhost
PORT=8080
JWT_SECRET=a random string of at least 32 chars
```

## Migrating & Seeding Models

Now run:

`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`

## Run Server

Finally run the start script in the root directory:

`npm start`