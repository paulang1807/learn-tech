## General Swarm Commands
- Initialize Swarm (Single Node): `docker swarm init`
- Leave the swarm: `docker swarm leave -f`
- List available nodes: `docker node ls`

### Working with Services
- List services: `docker service ls`
- Create services (similar to containers): `docker service create <image_name> [<command>]`
    -- Use the `--replicas <number of replicas>` to specify the number of replicas when creating the service: `docker service create --replicas <number of replicas> <image_name> [<command>]`
        - Use the `--mount` option to mount volumes: `--mount type=volume,source=<volume_name>,target=<target_path>`
- Use `--update` option to update services: 
    - Scale up services (add nodes to a running service): `docker service update <service_name or id> --replicas <number of replicas>`
        - Use `scale` to scale replicas for multiple services at the same time: `docker service scale <service1>=<num-of-replicas> <service2>=<num-of-replicas>`
    - Update image: `docker service update --image <image_name:tag> <service_name>`
    - Add environment variables and remove and add ports at the same time: `docker service update --env-add <variable_name>:<value> --publish-rm <port-to-remove> --publish-add <port-to-add>:<container_port>`
- Remove a service (removes all nodes as well): `docker service rm <service_name>`
- Use the `--driver` or `-d` flag to create a swarm wide bridge network: `docker network create --driver overlay <network_name>`
- View logs for a service: `docker service logs <service_name>`

### Working with Nodes
- Advertise swarm service on an IP address (Mainly for cloud usage. Use an IP that will be accessible by other machines in the cluster): `docker swarm init --advertise-addr <ip_addtess>`
- Promote a worker node to manager status: `docker node update --role manager <worker_node_name>`
- View all nodes of a service: `docker service ps <service_name>`
    - To view the services running on a specific node: `docker node ps <node_name>`
- Re-balance load on the nodes (completely replaces the tasks on the nodes): `docker service update --force <service_name>`

### Swarm Secrets
- Create secrets
    - From file: `docker secret create <secret_name> <file_containing_secret>`
    - From CLI (- at the end tells the command to read from stdin): `echo "secret_value" | docker secret create <secret_name> -`
- List secrets: `docker secret ls`
- Use `--secret <secret_name>` with the service create command to pass the secret to the service
    - Use environment variables (`-e`) to tell the service where to find the secrets
- Use `docker service update --secret-rm` to remove the secret

### Swarm Stacks
- Deploy stacks (similar to service create): `docker stack deploy -c <file_name> <stack_name>`
- List stacks: `docker stack ls`
- List tasks in stack: `docker stack ps <stack_name>`
- List services in stack: `docker stack services <stack_name>`
- Remove a stack: `docker stack rm`

## Good To Know
- High level Swarm hierarchy: Services -> Tasks -> Containers
- Use `docker info` to check if Swarm is active
- When using swarm commands for automation, use `--detach true` option. Otherwise the UI waits synchronously while service tasks are deployed/updated.
- For the swarm nodes to be able to communicate with each other in AWS, create a security group with the inbound rules specified in https://www.bretfisher.com/docker-swarm-firewall-ports/ and attach the group to the ec2 instances.
- On running the swarm init command on the leader node, it provides a *swarm join* command that can be run on other instances to add them as workers. In order to add the instances as managers, run `docker swarm join-token manager` on the leader to generate the join command for managers and then use it from the desired instances to add them as managers.
- A service can be attached to multiple networks at the same time (use `--network` multiple times)
- The swarm mode **Routing Mesh** in the overlay networking driver is a built in stateless layer 3 (TCP) load balancer. 
- The version in the swarm stack files should be 3 or higher.
- Swarm secrets support strings or binary content upto 500 kb in size. These are stored under `/run/secrets/`
- Swarm stacks don't have a separate update option. If we run `stack deploy` on an existing stack, it updates the stack.