# Get into docker container
  docker ps
  docker exec -it <container id> mongosh

# Create Databases in MongoDB
  use asg2
  db.createCollection('plays')
  db.createCollection('users')
  db.createUser({user:'comp4513',pwd:'PASSWORD HERE',roles:['readWrite']})


# Import Data
  install mongodb-tools
