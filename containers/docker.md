## Useful Commands
### General
- Get details on docker installation : `docker info`
- Show all images I own: `docker images`
- Pull Images: `docker pull <image_name>`
- Push images to repository:
    ```
    docker tag <local-image:tagname> <new-repo:tagname>
    docker push <new-repo:tagname>
    ```
    Example:
    ```
    docker tag paulang/ubuntubase:v1 paulang1807/testrepo:ubuntu-v1
    docker push paulang1807/testrepo:ubuntu-v1
    ```
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
- Start an existing container (which is in exited status): `docker container start <container id or name>`
- Stop services or containers; `docker container stop <container_id>`

### Connecting and Disconnecting to/from Containers
- Temporarily disconnect from a container: `Ctrl-P` `Ctrl-Q`
- Reconnect to the container: `docker attach <container name>`
- Run bash shell in a container (ssh into a running container): `docker exec -it c<ontainer_id or name> bash`
- Checking logs in a container: `docker container logs <container_id>`
    Get the top few lines of the log: `docker container top <container_id>`

### Removing Containers and Images
- Remove the docker container if it was not invoked with the `--rm` command: `docker rm <container id or name>`
    - Force remove the container that is running: `docker rm -f <container id or name>`
    - Can remove multiple containers at the same time by specifying multiple ids
    - Do not need to specify the entire container id; the first three or four characters that can be used to identify the container uniquely can be used
- Remove an image: `docker rmi <imageid>`
- Remove all containers (Nuclear option that will destroy all containers). Good for cases when you have several stray containers and you are sure you don't want to keep any of them: `docker rm -f $(docker ps -aq)`

## Good To Know
- In mac, docker images are located in : `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2`
- Sometimes you may get permission denied when running docker commands. To get around this add the current user to the docker group:
`sudo usermod -a -G docker <username>`