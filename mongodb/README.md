# Local Setup with docker

## Docker Setup
- `docker pull mongo`
- `docker run -d --name <container_name> -p 27017 -e MONGO_INITDB_ROOT_USERNAME=<user_name> -e MONGO_INITDB_ROOT_PASSWORD=<password> mongo`
- Run `docker ps -a` and check the values in the 'PORTS' columns to get the ip and port to be used for local connection (default is 0.0.0.0:32768)

## Connection String
`mongodb://<user_name>:<password>@0.0.0.0:32768/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`