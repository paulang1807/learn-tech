## Working with Kubectl
- Run a pod (options similar to docker run): 
```
kubectl run --generator <template-type> <template-name> [--rm --it] --image <image-name> -- <command>
kubectl run --generator run-pod/v1 mypod --rm --it --image <image-name> -- bash
```
    - Old way (deprecated): `kubectl run <image-name-alias> --image <image-name>`
    - Creates a single pod similar to docker run which creates a single container
    
- Create a deployment: `kubectl create deployment <image-name-alias> --image <image-name>`
    - Creates the pod, the container inside the pod as well as other objects such as replica set and deployment set
    - Use the `--dry-run` flag to do a test run of the deployment without actually deploying it
        - Use the `-o yaml` option with dry run to see the output of the dry run in yaml file
        ```
        kubectl create deployment <alias> --image <image-name> --dry-run -o yaml
        ```
- Create a job: `kubectl create job <image-name-alias> --image <image-name>`
- List running pods: `kubectl get pods`
    - Use the `-w` flag to watch (wait and refresh on change)
- Get all objects: `kubectl get all`
- Scale replicas (in the below command, deploy=deployment=deployments): 
```
kubectl scale <type-of-object>/<image-name-alias> --replicas <number of replicas>
kubectl scale deploy/<image-name-alias> --replicas <number of replicas> OR
kubectl scale deployment <image-name-alias> --replicas <number of replicas>
```
- Delete deployment: `kubectl delete deployment <image-name-alias>`
    - We can use `delete` to delete multiple instances of different object types at the same time: `kubectl delete service/<service-alias1> [service/<service-alias2>...] deployment/<deployment-alias1> [deployment/<deployment-alias2>...]`
- Delete pod: `kubectl delete pod/<pod-name>`

### Get pod details
- Get pod logs: `kubectl logs deploy/<image-name-alias>`
    - Returns logs for only one pod if multiple pods are running
    - Follow and get the last/first n lines using the `follow` and `tail/head` flags respectively: `kubectl logs deploy/<image-name-alias> --follow --tail 1`
- Get logs for all pods of a particular label(alias): `kubectl logs -l run=<image-name-alias>`
    - Can pull logs for upto 5 pods at a time by default
- Get pod details (enter full pod name returned by the get pods command): `kubectl describe pod/<pod-name>`

### Working with Services
- Create a default service (ClusterIP) for existing pods: `kubectl expose deployment/<image-alias-name> --port <port-number>`
- Create a nodeport service: `kubectl expose deployment/<image-alias-name> --port <port-number> --name <service-name> --type NodePort`
- Create a LoadBalancer service (for docker desktop): `kubectl expose deployment/<image-alias-name> --port <port-number> --name <service-name> --type LoadBalancer`
    - Once a LoadBalancer service has been created, we can access the ClusterIP service directly using the cluster port
- Get services: `kubectl get service`

### Working with NameSpaces
- Get all namespaces: `kubectl get namespaces`

## Good To Know
- Services provide a stable address for connecting to pods
- The FQDN of services is in the format `<hostname>.<namespace>.svc.cluster.local`
- Types of services:
    - ClusterIP (default) - Only reachable within the cluster
    - NodePort - High port allocated on each node and is open on the node's IP
    - LoadBalancer - Mostly used in the cloud for controlling an external load balancer
    - ExternalName - Adds CNAME DNS record to CoreDNS and is used by objects in the cluster to communicate with external endpoints
- When we create a cluster service, the IP will be accessible only by the nodes themselves or other pods in the same cluster. We can just create a pod and use its bash to test this out.
- When we create a NodePort service, it creates the port in the format `<cluster-port>:<exposed-port>/<protocol>`. Here the order of the exposed and cluster ports are reversed compared to docker.
    - The exposed ports are in the range 30000 - 32767 (high range)

### Common Terms
- Node - Single server in the kubernetes cluster
- Kubelets - Kubernetes agents running on nodes
- Control Plane - Set of containers that manage the cluster
- Pod - Container(s) running on one node
- Controller - Object for creating or updating pods and other objects
- Service - Network endpoint to connect to a pod
- Namespace - Filtered group of objects in a cluster

