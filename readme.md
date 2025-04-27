## What was the objective of this project?

1. Learning how to deploy code to EC2 through a CD pipeline
2. How to make a RDS database and connect it to EC2
3. Setting up a local development server quickly for all OS platforms

## What did I do in this project?

1. Learned how to deploy NodeJS backend to an EC2 server through GitHub actions and docker.
2. Learned how to create a RDS database and how to connect to it from a server hosted on EC2.
3. Put together a way for other developers to quickly set up a local development server so that others can quickly start working on the backend APIs. I used docker and docker compose to make sure it can be set up on all OS platforms, whether it's MacOS, Linux or Windows.
4. Learned about GitHub self-hosted runners and how to use them.

## Challenges I faced and how I solved them

1. Deploying code to AWS EC2 through a CD pipeline

- I planned to deploy the code to EC2 whenever some commits are pushed to the main branch.
- So, I decided to use Docker to package the application, push the image to docker hub, pull this image in my EC2 instance and simply spin a container to run the server. All this has to happen in the same workflow.
- Packaging the application and pushing the image to docker hub was quite straight forward. The challenge was in pulling the image and spinning off a container and running the server in that container.
- So, in order to pull the latest docker image and start a container, I had to create a GitHub self-hosted runner, host it on my EC2 instance, connect it with my GitHub repo and run the docker commands on this self-hosted runner.
- All the work related to this self-hosted runner was completely new for me and figuring all this out and putting it together took some time and effort.

2. Connecting EC2 to the RDS database

- I had never worked with RDS databases and I had no idea how to create them, connect to them and handle them. And as expected, I had a hard time connecting to the database.
- The problem I was facing was that in order to connect to the database, I had to use parameters like database host, port, username, password and database name. While all the other parameters were known, I didn’t have a database name because when I created a database in AWS ap-south-1 region, there was no option to enter a database name. As a result, I was not able to connect to the database in this region. So, after reading AWS documentation and blogs for hours, I randomly saw a picture on a blog which indicated the change in the AWS region. So, I switched to the us-east-1 region, and there it had an option to specify the database name. I created a database in that region, made it publicly accessible, configured inbound and outbound rules and I was able to connect to the database.

3. Providing database credentials to the server running inside the container on EC2

- Backend needs credentials like database host, port, username, password and database name to connect to the database.
- It was quite easy in the local development setup to do it, but I had to do some research on how to do it with a live server.
- While some blogs suggested putting these credentials in the docker image and pushing it to docker hub, I didn't feel it’s quite safe and I decided to dynamically inject these credentials in the docker container while running it. I stored these credentials in GitHub secrets and provided these to the container while executing docker run command as environment variables.

## Setting up a local development server

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env.local` file in the root directory. The environment variables are not shared publicly for security reasons.
4. Make sure you have docker installed on your machine.
5. Run `docker-compose -f docker-compose.local.yml up --build` to start the server.
