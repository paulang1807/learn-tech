## Installation 
sudo pip install docker-compose

### Installation on Amazon Linux 2
```
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod 775 /usr/local/bin/docker-compose
docker-compose version
```

## Start, Stop and Investigate
- Starting containers using docker compose: `docker-compose up -d`
    - The standard file name is `docker-compose.yml` but other file names can also be used with the flag `-f`
        - `-f` can be used multiple times in the same command to specify multiple files. The files will be used in the order specified.
        - We can use the config option to combine the specs from multiple docker-compose files: `docker-compose -f docker-compose.yml -f docker-compose2.yml config > docker-compose-final.yml`
- Stopping containers that were started using docker compose: `docker-compose down`
    - Use  `--rmi local` to remove any images that are built as a part of the docker compose process. The `image` tag should not have been specified in the docker-compose file for the `rmi` to work: `docker-compose down --rmi local`
        - Using `--rmi all` will remove all images used in the project.
    - Use `-v` to remove the volumes that were created in the project: `docker-compose down -v`
- List containers: `docker-compose ps`
- Get container logs: `docker-compose logs`
    - Above will show logs for all the containers in docker compose. Specify the container name to view the log for a specific container: `docker-compose logs <container_name>`

## Building and Execution
- To rebuild an image: `docker-compose build` or `docker-compose up --build`

## Good To Know
- The containers, volumes and networks are prefixed with the directory name where the dockerfile is
- We can override the configurations specified in the docker-compose file by using a `docker-compose.override.yml` file. `docker-compose up` will overlay this file on top of the `docker-compose.yml`. The configurations specified in the override file will take precedence.