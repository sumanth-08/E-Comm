## About E-Comm

A RESTful API for an e-commerce platform using Node.js (Express.js) and PostgreSQL. The API should support user authentication, product management with categories and image upload, shopping cart, and order processing. Additionally, it should allow filtering of products by categories, price range, and name. The API should also provide Swagger API documentation and automated testing.

## Local Development

### Requirements

To run locally, you will need

- Node.js(v18 or above)
- Postgres SQL Database

## Developer QuickStart

1. Fork this repo to your Github account

After forking the repository, clone it to your local device by using the following command:

```
git clone https://github.com/<your-username>/E-Comm.git
```

2. Run `npm i` in the root directory

3. Set up your `.env` file using the recommendations in the `.env.example` file.

4. Set the following environment variables:

- DBNAME
- HOST
- DBUSER
- PASSWORD
- CLOUDINARY_CLOUD_NAME
- CLOUD_API_KEY
- CLOUD_SECRET

5. Create Database with psql with following command:

```
CREATE DATABASE <databasename>;
CREATE USER <username> WITH PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE "<databasename>" to <username>;
ALTER USER <username> WITH SUPERUSER;
```

6. Run `npm run dev` or `npx nodemon` in the root directory to start.

7. Register the user with  `/api/auth/signup` endpoint.

This will create the user with role by default as user (role = 2) and if you want to make it admin (role = 1), update the user role by using the following command

```
UPDATE accounts SET role=1 WHERE email='<your-email-id>';
```

### Swagger API Documnet
- Run the following URL by replacing the `server-port` of server in the browser to get access the Swagger UI
```
http://localhost:<server-port>>/api-docs
```

### Issues
Create any issues [here](https://github.com/sumanth-08/E-Comm/issues)

