import { Sequelize } from "sequelize";

let connection: Sequelize | null = null;

export const getDBConnection = async () => {
  if (!connection) {
    connection = new Sequelize({
      database: process.env.DBNAME,
      host: process.env.HOST,
      username: process.env.DBUSER,
      password: process.env.PASSWORD,
      port: 5432,
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
      },
      logging: false,
    });

    connection
      .authenticate()
      .then(() => {
        console.log("Database connection Successful");
      })
      .catch((err) => {
        console.log("Failed to database connect", err);
      });
  }

  return connection;
};
