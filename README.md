# Assignment 2 of COMP 3533
  A React app to view theater plays and a Node.js and MongoDB server to provide the API backend. Running everything in docker containers.

## Get Started
  Clone the repository using git.

### Backend
  Navigate to node_app.
  To start MongoDB and the Node.js server in docker containers, run start_dockers.sh.
  This will build and run a docker container for MongoDB and Node.js.
  To configure the ports and IP addresses, see node_app/.env, node_app/docker-compose.yml, node_app/Dockerfile-mongodb, and node_app/Dockerfile-nodejs.

### Frontend
  Navigate to react_app.
  Run start_docker_dev.sh during development or `npm start` to run it without a docker container.
  Run start_docker_prod.sh to run the production version.
