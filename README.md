# Authentication System (Back-End)

This app is written in [Nodejs](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) with the [Nestjs framework](https://nestjs.com/). I provided documentation for the APIs using [Swagger](https://swagger.io/).
The database is [MongoDB](https://www.mongodb.com/) which is created and run using [docker-compose](https://docs.docker.com/compose/).
For sending verification code to users, I used [SendGrid](https://sendgrid.com/) provider.
For deployment I used [PM2](https://pm2.keymetrics.io/) which is a daemon process manager that will help you manage and keep your application online.

This project includes 3 microservices.
* The Main server is responsible for handling signup and verifying email and login APIs.
* The Mail server is responsible for sending emails.
* The Logger server which is responsible for logging the request and response.

These Microservices are communicating with each other through [AMQP](https://www.amqp.org/) protocol using [RabbitMQ](https://www.rabbitmq.com/) Message broker.


## How to run the application

* First clone the repository
* `cd jabama_test/`
* Run `docker-compose up -d --build`

Now the application is up and running on port 80.

## API Documentation

Just Open the `/api` path (<http://localhost/api>) on your browser to see the swageer UI.