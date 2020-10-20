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
    - Use `--network-alias` to set a dns alias (Container name is used as dns alias by default)
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
- We can use docker machine and virtual box to start multiple machines locally.
- Start linux instances: `docker-machine create <machine_name>`
    - Connect to the instance: `docker-machine ssh <machine_name>` or `docker-machine env <machine_name>`
- Remove a machine: `docker-machine rm <machine_name>`

### Docker Contexts
- Traditional way using **DOCKER_HOST** environment variable: `DOCKER_HOST="tcp://<host_name>:<port>" docker ps`
    - Example based on playwithdocker.com: `DOCKER_HOST="tcp://ip172-18-0-33-btm21t2osm4g00eblm00@direct.labs.play-with-docker.com:2375" docker ps`
- Using Docker Contexts:
    - Save the remote host into a context: `docker context create <context-name> --docker "host=<host_name>:<port>`
        - Use host names from the ssh config file: `docker context create <context-name> --docker "host=ssh://<hostname-in-ssh-config>:<port>`
    - List docker contexts: `docker context ls`
    - Use a context (switch to docker in another host): `docker context use <context-name>`
        - Use `-c` or `--context` to specify a context directly in a docker command: `docker -c <context-name> <docker_command>`
    - Loop through all contexts: `for c in ``docker context ls -q``; do docker -c $c ps; done`
        - Here `-q`is used for quiet execution

### Health Checks
```
docker run  --health-cmd=<command-for-health-check> --health-interval=<interval> --health-retries=<retries> --health-timeout=<timeout> --health-start-period=<start-period> <image>
docker run  --health-cmd="curl -f localhost:9000/health || exit 1" --health-interval=5s --health-retries=3 --health-timeout=3s --health-start-period=10s nginx:3.2
```

### Docker Registry
- Pull the registry image: `docker pull registry`
- Run registry image: `docker container run -d -p 5000:5000 --name registry registry`
- Tag existing image and push to registry:
    ```
    docker tag <image_name> 127.0.0.1:5000/<image_name>
    docker push 127.0.0.1:5000/<image_name>
    ```
- Pull image from registry: `docker pull 127.0.0.1:5000/<image_name>`

#### Running Secure Registry with basic Authentication
- Reference: https://training.play-with-docker.com/linux-registry-part2/
- Generate SSL certificate and configure it to run a secure docker registry:
    - Generate cert
        ```
        mkdir -p certs 
        openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key -x509 -days 365 -out certs/domain.crt
        ```
    - To get the docker daemon to trust the certificate, copy the domain.crt file:
        ```
        mkdir /etc/docker/certs.d
        mkdir /etc/docker/certs.d/127.0.0.1:5000 
        cp $(pwd)/certs/domain.crt /etc/docker/certs.d/127.0.0.1:5000/ca.crt
        ```
    - Restart the docker daemon (/dev/null part is to avoid the output logs from docker daemon):
        ```
        pkill dockerd
        dockerd > /dev/null 2>&1 &
        ```
- Use htpasswd to generate file with username and encrypted password (refer htpasswd --help for details of the options used):
    ```
    mkdir auth
    htpasswd -Bbn <username> <password> > auth/htpasswd
    ```
    - A file htpasswd will be created with an entry in the form `<username>:<encrypted_password>`
- Run registry container with authentication:
    ```
    mkdir registry-data
    docker run -d -p 5000:5000 --name registry \
    --restart unless-stopped \
    -v $(pwd)/registry-data:/var/lib/registry \
    -v $(pwd)/certs:/certs \
    -v $(pwd)/auth:/auth \
    -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
    -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
    -e REGISTRY_AUTH=htpasswd \
    -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
    -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
    registry
    ```
    - Options used in the above command:
        - **--restart unless-stopped** - restart the container when it exits, unless it has been explicitly stopped. When the host restarts, Docker will start the registry container, so it’s always available
        - **-v $pwd\certs:c:\certs** - mount the local certs folder into the container, so the registry server can access the certificate and key files
        - **-e REGISTRY_HTTP_TLS_CERTIFICATE** - specify the location of the SSL certificate file
        - **-e REGISTRY_HTTP_TLS_KEY** - specify the location of the SSL key file
        - **-v $(pwd)/auth:/auth** - mount the local auth folder into the container, so the registry server can access htpasswd file;
        - **-e REGISTRY_AUTH=htpasswd** - use the registry’s htpasswd authentication method
        - **-e REGISTRY_AUTH_HTPASSWD_REALM='Registry Realm'** - specify the authentication realm
        - **-e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd** - specify the location of the htpasswd file
- Push the desired image to the registry (the image will need to be tagged with the localhost first):
    ```
    docker tag <image_name> 127.0.0.1:5000/<image_name>
    docker push 127.0.0.1:5000/<image_name>
    ```
    - We can view the available images in the registry by using the url: `http://localhost:5000/v2/_catalog`
- Whenever we want to pull our pushed images from the registry, 
    - we can start the authenticated registry container first (as shown above) and then pull the image OR
    - login to the registry first: `docker login 127.0.0.1:5000` and then pull the image
        ```
        docker pull 127.0.0.1:5000/<image_name>
        ```
- To use docker registry in Swarm, just use `docker service create` instead of `docker run`.

## Good To Know
- In mac, docker images are located in : `~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/Docker.qcow2`
- Sometimes you may get permission denied when running docker commands. To get around this add the current user to the docker group:
`sudo usermod -a -G docker <username>`
- To set up command line help (shell completion), follow the links in this url - https://docs.docker.com/docker-for-mac/#install-shell-completion
- In order to create a private docker image, create a private repo in docker hub first and then upload the image OR use docker registry.
- Whe using images, it is better to specify the version rather than just using 'latest'. This is because the version represented by latest may change depending on whatever the most current version is and may introduce compatibility or other issues with the rest of the infrastructure.
- In order to help keep the containers secure, most software based images don't run as root user. They will have a master process running as the root user and all the worker processes running as some user.
    - Most of the language based images (node, python etc.) have code in dockerfile to create a user (sample below from a node dockerfile) 
    ```
    RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node
    ```
    - It is the responsibility of the user to use that user for running the containers by including: `USER <username>`
        - After switching user it is a good idea to include `--chown=<username>:<username>` option in the `COPY`, `mkdir` and similar commands to change the owner to the same user to avoid any permission issues when running programs in the container.
        - Sample dockerfile - https://github.com/BretFisher/dockercon19/blob/master/1.Dockerfile
- Docker security best practices - https://github.com/BretFisher/ama/issues/17