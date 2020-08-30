## Installation
- For Linux (https://get.docker.com/): `curl -fsSL https://get.docker.com -o get-docker.sh`

### Installation on Amazon Linux 2
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html
- Update the installed packages and package cache on your instance: `sudo yum update -y`
- Install the most recent Docker Community Edition package: `sudo amazon-linux-extras install docker`
- Start the Docker service: `sudo service docker start`
- Add the user to the docker group so you can execute Docker commands without using sudo: `sudo usermod -a -G docker <user_name>`
- Log out and log back in again to pick up the new docker group permissions.

## Useful Commands
- Get details on docker installation : `docker info`
- Login to docker (writes session id to ~/.docker/config.json): `docker login`
- See space usage: `docker system df`

### Working with Images
- Show all images I own: `docker images`
- Pull Images: `docker pull <image_name>`
- Tag an image (image name should be prefixed by docker account name if we want to publish them): `docker image tag <source_image[:tag]> <target_image[:tag]>`
- Push images to repository: `docker image push <account_name/image_name[:tagname]>`
- Find docker images that are not serving any purpose and are just consuming disk space: `docker images -f dangling=true`

### Running and Stopping Containers
- Show all running containers: `docker container ps` or `docker container ls`
    - Show all containers including ones that are stopped: `docker ps -a`
- Run container (downloads the image of the container if it doesn’t exist) : `docker container run <container_name>` 
    - Use `-it` flag to open container terminal in interactive mode
    - Use `--rm` flag to remove the container on exit
    - Use `-d` or `--detach` flag to run it in the background (detached mode)
    - Use `-p <local_port>:<container_port>` or `--publish` flag to specify port
    - Use `--name` flag to give the container a name
    - Use `-e` or `--env` flag to pass environment variables
    - Use `--network` flag to specify the network to connect to
        - Use `--net=host` to specify host network
    - Use `--network-alias` to set a dns alias
    - Use `-v <[volume_name]:/<path_in_container>` flag to specify a volume
        - Specify a path instead of volume name to the left of the colon for creating bind volumes: `-v /<share_path_in_host>:/<path_in_container>`
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
    - Use the `-f` flag to follow the logs (keep the log stream open)
    - Get info on the services running: `docker container top <container_id>`
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
- Clean up just the dangling images: `docker image prune`
- Remove all containers (Nuclear option that will destroy all containers). Good for cases when you have several stray containers and you are sure you don't want to keep any of them: `docker rm -f $(docker ps -aq)`
- Remove all images not being used: `docker system prune -a`
- Clean up everything: `docker system prune`

### Docker Networks
- List all networks: `docker network ls`
- Create a network: `docker network create [--driver] <network_name>`
- Get network details: `docker network inspect <network_name>`
- Attach a network to a container: `docker network connect <network_id> <container_id>`
- Detach a network from a container: `docker network disconnect`
- Remove a network: `docker network rm <network_name>`
- Remove all unused networks: `docker network prune`

### Docker Volumes
- Cleanup unused volumes: `docker volume prune`
- List all volumes: `docker volume ls`
- Inspect a volume: `docker volume inspect <volume_name>`
- Create a volume: `docker volume create <volume_name>`

### Docker Machine
- We can use docker machine and virtual box to start multiple machines.
- Start linux instances: `docker-machine create <machine_name>`
    - Connect to the instance: `docker-machine ssh <machine_name>` or `docker-machine env <machine_name>`
- Remove a machine: `docker-machine rm <machine_name>`

### Health Checks
```
docker run  --health-cmd=<command-for-health-check> --health-interval=<interval> --health-retries=<retries> --health-timeout=<timeout> --health-start-period=<start-period> <image>
docker run  --health-cmd="curl -f localhost:9000/health || exit 1" --health-interval=5s --health-retries=3 --health-timeout=3s --health-start-period=10s nginx:3.2
```

## Good To Know
- In mac, docker images are located in : `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2`
- Sometimes you may get permission denied when running docker commands. To get around this add the current user to the docker group:
`sudo usermod -a -G docker <username>`
- To set up command line help (shell completion), follow the links in this url - https://docs.docker.com/docker-for-mac/#install-shell-completion
- In order to create a private docker image, create a private repo in docker hub first and then upload the image.