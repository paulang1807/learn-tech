## Useful Commands
- Get details on docker installation : `docker info`
- Login to docker (writes session id to ~/.docker/config.json): `docker login`

### Working with Images
- Show all images I own: `docker images`
- Pull Images: `docker pull <image_name>`
- Tag an image: `docker image tag <source_image[:tag]> <target_image[:tag]>`
- Push images to repository: `docker image push <image_name[:tagname]>`
- Find docker images that are not serving any purpose and are just consuming disk space: `docker images -f dangling=true`

### Running and Stopping Containers
- Show all running containers: `docker container ps` or `docker container ls`
    - Show all containers including ones that are stopped: `docker ps -a`
- Run container (downloads the image of the container if it doesn’t exist) : `docker container run <container_name>` 
    - Use `-it` flag to open container terminal in interactive mode
    - Use `--rm` flag to remove the container on exit
    - Use `-v` flag to specify the volume to be mounted
        ```
        docker container run -it --rm -v /<share_path_in_local>:/<share_name_in_container> <image_name>:<tagname> bash
        ```
    - Use `-d` or `--detach` flag to run it in the background (detached mode)
    - Use `-p <local_port>:<container_port>` or `--publish` flag to specify port
    - Use `--net=host` to specify local host as the network
    - Use `--name` flag to give the container a name
        ```
        docker container run -d --net=host nginx
        docker container run -d --name myredis -p 6379:6379 redis
        ```
    - Use `-e` or `--env` flag to pass environment variables
    - Use `--net` flag to specify the network to connect to
    - Use `--network-alias` to set a dns alias
- Run bash shell when starting a new container: `docker container run -it --name nginx nginx bash`
    - For Alpine distribution, use sh first and then install bash in the container: `docker container run -it alpine sh`
- Start an existing container (which is in exited status): `docker container start <container id or name>`
- Stop services or containers; `docker container stop <container_id>`

### Connecting and Disconnecting to/from Containers
- Temporarily disconnect from a container: `Ctrl-P` `Ctrl-Q`
- Reconnect to the container: `docker attach <container name>`
- Run command in existing container: `docker container exec -it <container_id or name> <bash>`
- Run bash in a container in exited status (should have started using the bash option): `docker container start -ai <container_name>`

#### Get container details
- Checking logs in a container: `docker container logs <container_id>`
    Get the top few lines of the log: `docker container top <container_id>`
- Get configuration details: `docker container inspect <container name>`
    - Get container ip: `docker container inspect --format '{{ .NetworkSettings.IPAddress }}' <container_name>`
- Get details on usage, memory etc. for all active containers: `docker container stats`
- Get details on which host ports are forwarding traffic to the container: `docker container port <container_name>`
- Get history of the changes that happened in the image: `docker history <image_name>`

### Removing Containers and Images
- Remove the docker container if it was not invoked with the `--rm` command: `docker rm <container id or name>`
    - Force remove the container that is running: `docker rm -f <container id or name>`
    - Can remove multiple containers at the same time by specifying multiple ids
    - Do not need to specify the entire container id; the first three or four characters that can be used to identify the container uniquely can be used
- Remove an image: `docker rmi <imageid>`
- Remove all containers (Nuclear option that will destroy all containers). Good for cases when you have several stray containers and you are sure you don't want to keep any of them: `docker rm -f $(docker ps -aq)`

### Docker Networks
- List all networks: `docker network ls`
- Get network details: `docker network inspect <network_name>`
- Create a network: `docker network create --driver`
- Attach a network to a container: `docker network connect <network_id> <container_id>`
- Detach a network from a container: `docker network disconnect`

## Good To Know
- In mac, docker images are located in : `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2`
- Sometimes you may get permission denied when running docker commands. To get around this add the current user to the docker group:
`sudo usermod -a -G docker <username>`
- To set up command line help (shell completion), follow the links in this url - https://docs.docker.com/docker-for-mac/#install-shell-completion