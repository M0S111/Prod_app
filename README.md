# A practice repository

This is a very simple project with API endpoints which perform CRUD operations on products table in a Postgres DB.

Prerequisites:
- Node.js
- npm
- Docker

First run `npm install` to install dependencies.

A Docker container with Postgres is required. Install Docker & run a `postgres:latest` image, then run:

`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
