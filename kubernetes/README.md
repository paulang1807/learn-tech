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
    - Use `-l` flag to look for pods matching certain label(s): `kubectl get pods -l app=nginx`
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
    - View details on everything running in the background as well: `kubectl get all --all-namespaces`

### Declarative Kubernetes (using yaml files)
- Create or update resources in a file: `kubectl apply -f <file.yaml>`
    - Create or update from a whole directory: `kubectl apply -f <dir_name>/`
    - Create or update from a url: `kubectl apply -f <https://domain.com/file.yml>`
        - Check the contents of the file: `curl -L <https://domain.com/file.yml>`
    - Use `-l` flag to apply only for sections matching certain label(s): `kubectl apply -f <file.yaml> -l app=nginx`
    - Dry run where the process checks against the specs on the server to find out about existing resources: `kubectl apply -f <file.yaml> --server-dry-run`
        - Just tells us whether there is a change in the specs without actually showing the differences.
        - Use `-diff` to view the actual differences: `kubectl diff -f <file.yaml>`
- Get resource details to be used in the service specs: `kubectl api-resources`
- Get api-version: `kubectl api-version`
- Get list of all keys supported by each KIND: `kubectl explain <NAME> --recursive`
    - NAME in the above command is the NAME corresponding to the desired KIND in the api-resources resultset
    - For KIND 'Service': `kubectl explain services --recursive`
- Get more details on the specs: `kubectl explain <NAME>.spec`
    - Provides description and supported types
- Get details on a specific key of the spec: `kubectl explain <NAME>.spec.<KEY>`
    - For getting details for the key 'type' for 'services': `kubectl explain services.spec.type`
    - Provides values for the 'kind' and 'apiVersion' as well although the versions may be old/deprecated. Use api-version for the latest versions.
- Get details for sub-specs (specs for keys of other specs): 
    ```
    kubectl explain <NAME>.spec.<KEY>.spec.<KEY>
    kubectl explain deployments.spec.strategy.type.spec
    kubectl explain pods.spec.volumes.persistentVolumeClaim
    ```

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
- CSI (Container Storage Interface) plugins can be used to connect to third party storage 
- Kubectl Context (cluster, authentication/user, namespace) is defined in the **~/.kube/config** file by default
    - Use `kubectl config get-contexts` command to get the formatted output of the file
    - Use `kubectl config set*` to set defaults for these contexts

### Common Terms
- Node - Single server in the kubernetes cluster
- Kubelets - Kubernetes agents running on nodes
- Control Plane - Set of containers that manage the cluster
- Pod - Container(s) running on one node
- Controller - Object for creating or updating pods and other objects
- Service - Network endpoint to connect to a pod
- Namespace - Filtered group of objects in a cluster

