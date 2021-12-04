# Build the docker container
sudo docker build -t comp4513_asg1:dev .

# Run the docker container
sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true comp4513_asg1:dev
