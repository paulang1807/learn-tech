# Common CLI Command Usage

## RDS
- Describe available clusters: 
    ```bash
    aws rds describe-db-clusters
    ```
- Execute query on rds: 
    ```bash
    aws rds-data execute-statement --resource-arn <cluster-arn> --secret-arn <secret-arn> --sql <sql-statement>
    ```

## SAM
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html
- Build application: 
    ```bash
    sam build -t <templatefile>.yaml --parameter-overrides <Parameter1Name=Parameter1Value [,Parameter2Name=Parameter2Value],...>
    ```
    - Use `-t` flag to specify the template yaml name if there are multiple yamls in the folder
    - Use `--parameter-overrides` flag to specify parameters
    - Use `--use-container` option to run the build in a docker container. The container will be removed automatically once the build is complete

- Deploy application: 
    ```bash
    sam deploy --stack-name <CloudFormationStackName> --s3-bucket <BucketName>  --s3-prefix <S3FolderPath> --region <Region> --capabilities <capability>
    ```
    - `--capabilities` flag is mandatory and should be either **CAPABILITY_NAMED_IAM** if using IAM resources with custom names, **CAPABILITY_IAM** otherwise.
    - Use `--guided` option for providing the parameters interactively: `sam deploy --guided`

### Local Testing
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html
- One off invocation: 
    - The `FunctionToInvoke` is the lambda function name as defined in the cloudformation template
    ```bash
    sam local invoke "<FunctionToInvoke>" -e <event-json.json>
    ```
- Hosting APIs locally: 
    ```bash
    sam local start-api
    ```
    - Once the docker image loads, use curl to send a request to the api running on localhost: 
        ```bash
        curl http://127.0.0.1:3000/<api_path>
        ```
- Get Logs: 
    ```bash
    sam logs -n <FunctionToInvoke> --stack-name <CloudFormationStackName> --tail
    ```


## EC2
- Find Instance Identity 
    ```bash
    instance_identity=$(curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document/)
    ```
    - This can be used to get instance details such as account id, architecture, availability zone, image id, instance id, instance type, kernel id, private ip, ram disk id, region and version. For example to get account id:
        ```bash
        AWS_ACCOUNT_ID=$(echo ${instance_identity} | jq -r .accountId)
        ```
- Find IAM Role 
    ```bash
    iam_role=$(curl --silent http://169.254.169.254/latest/meta-data/iam/security-credentials/)
    ```

## EMR
- Check if instance is master 
    ```bash
    IS_MASTER=$(cat /mnt/var/lib/info/instance.json | grep isMaster | cut -f2 -d: | cut -f2 -d'"' | tr -d ' ')
    ```
- Get cluster id
    ```bash
    EMR_CLUSTER_ID=$(cat /mnt/var/lib/info/job-flow.json |  sed -n 's/.*"jobFlowId".*"\(.*\)"\(,\|\)$/\1/p')
    ```

## Useful Resources
- [AWS Docs (Git Repo)](https://github.com/awsdocs)