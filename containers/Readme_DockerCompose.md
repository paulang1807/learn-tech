## Installation 
sudo pip install docker-compose

## Start, Stop and Investigate
- Starting containers using docker compose: `docker-compose up -d`
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
- The standard file name is `docker-compose.yml` but other file names can also be used with the flag `-f`
- The containers, volumes and networks are prefixed with the directory name where the dockerfile is