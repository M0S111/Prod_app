import Sequelize, { DataTypes } from "sequelize";

const sequelizeNoDb = new Sequelize(
  {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    //dialectOptions: {
    //    ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false},
    port: 5432
  }
);


// const databaseName = process.env.DB_DATABASE;

// async function createDatabase() {
//   try {
//     await sequelizeNoDb.authenticate();
//     console.log('Connected to the database server.');

//     const databaseExists = await sequelizeNoDb.query(
//       `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'` // PostgreSQL specific query
//     );

//     if (databaseExists[0].length === 0) {
//       console.log(`Database "${databaseName}" does not exist. Creating...`);
//       await sequelizeNoDb.query(`CREATE DATABASE "${databaseName}"`);
//       console.log(`Database "${databaseName}" created successfully.`);
//     } else {
//       console.log(`Database "${databaseName}" already exists.`);
//     }
//   } catch (error) {
//     console.error('Error creating or checking database:', error);
//   }// finally {
//   //  await sequelizeNoDb.close(); // Close the connection to the server (without the specific DB)
//   //}
// }

// createDatabase();

const User = sequelizeNoDb.define('User', {

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { tableName: 'users' });

const Product = sequelizeNoDb.define('Product', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, { tableName: 'products' });

sequelizeNoDb
  .sync()
  .then(() => {
    console.log('Database Synced');
  }).catch((err) => {
    console.error('Database Sync Error:', err)
  });

export { User, Product };