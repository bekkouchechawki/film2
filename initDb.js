import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

const dbName = 'moviesdb';
const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${dbName}.movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    releaseYear INT,
    status ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE'
  )
`;

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }

  connection.query(createDbQuery, (err) => {
    if (err) {
      console.error('Error creating database: ', err);
      return;
    }
    console.log(`Database ${dbName} created or successfully checked`);

    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table: ', err);
        return;
      }
      console.log(`Table 'movies' created or successfully checked`);

      // Ajout des requêtes d'insertion
      const insertQuery1 = `
        INSERT INTO ${dbName}.movies (title, director, releaseYear, status)
        VALUES ('Movie 1', 'Director 1', 2021, 'AVAILABLE')
      `;

      const insertQuery2 = `
        INSERT INTO ${dbName}.movies (title, director, releaseYear, status)
        VALUES ('Movie 2', 'Director 2', 2022, 'UNAVAILABLE')
      `;

      connection.query(insertQuery1, (err) => {
        if (err) {
          console.error('Error inserting data for Movie 1: ', err);
          return;
        }
        console.log('Data inserted for Movie 1');

        connection.query(insertQuery2, (err) => {
          if (err) {
            console.error('Error inserting data for Movie 2: ', err);
            return;
          }
          console.log('Data inserted for Movie 2');

          // Fermeture de la connexion une fois les insertions terminées
          connection.end();
        });
      });
    });
  });
});
