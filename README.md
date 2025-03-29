# A practice repository

This is a very simple project with API endpoints which perform CRUD operations on products table in a Postgres DB.

Prerequisites:
- Node.js
- npm
- Docker

First run `npm install` to install dependencies.

Then build the container with:

`docker build -t my-postgres-image .`

followed by:

`docker run -d -p 5432:5432 --name my-postgres my-postgres-image`

Now run:

`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`