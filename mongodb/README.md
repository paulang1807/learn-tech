# Local Setup with docker

## Docker Setup
- `docker pull mongo`
- `docker run -d --name <container_name> -p 27017 -e MONGO_INITDB_ROOT_USERNAME=<user_name> -e MONGO_INITDB_ROOT_PASSWORD=<password> mongo`
    - Run `docker ps -a` and check the values in the 'PORTS' columns to get the ip and port to be used for local connection (default is 0.0.0.0:32768)
- In order to persist the data locally so that it is accessible across container restarts and creations, create a docker volume and use it for mounting the database
    - `docker volume create <volume_name>`
    - `docker run -d --name <container_name> -p 27017 -e MONGO_INITDB_ROOT_USERNAME=<user_name> -e MONGO_INITDB_ROOT_PASSWORD=<password> -v <volume_name>:/data/db mongo`
## Connection Strings
- For local connection:
    - From compass: `mongodb://<user_name>:<password>@0.0.0.0:32768/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`
    - From node: `mongodb://<user_name>:<password>@0.0.0.0:32768/<database_to_connect>>?authSource=<database_name_for_auth>&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`
- For connecting to cloud: `mongodb+srv://<user_name>:<password>@<cluster_name>.pqac7.mongodb.net/<database_name>?retryWrites=true&w=majority`

## Backup and restore database (see details [here](https://github.com/paulang1807/learn-tech/tree/master/docker#backing-up-docker-volumes))
- `docker run --rm --volumes-from local_mongodb  -v /Documents/docker_mongo/bkp:/backup ubuntu bash -c "cd /data/db && tar cvf /backup/local_mongodb.tar ."`
- `docker run --rm -v docker_mongo_local_mongodb:/recover -v /Documents/docker_mongo/bkp:/backup ubuntu bash -c "cd /recover && tar xvf /backup/local_mongodb.tar"`
    - Make sure you use the correct volume name for recovery. For example, if we specify 'local_mongodb' as the volume name in the docker compose file, the volume that is actually created is 'docker_mongo_local_mongodb'. 


# Useful Resources
- [Documentation](https://www.mongodb.com/docs/)