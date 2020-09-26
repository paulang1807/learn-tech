## Common CLI Command Usage

### SAM 
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html
- Build application: `sam build -t <templatefile>.yaml --parameter-overrides <Parameter1Name=Parameter1Value [,Parameter2Name=Parameter2Value],...>`
    - Use `-t` flag to specify the template yaml name if there are multiple yamls in the folder
    - Use `--parameter-overrides` flag to specify parameters
    - Use `--use-container` option to run the build in a docker container. The container will be removed automatically once the build is complete
- Deploy application: `sam deploy --stack-name <CloudFormationStackName> --s3-bucket <BucketName> --region <Region> --capabilities <capability>`
    - `--capabilities` flag is mandatory and should be either `CAPABILITY_NAMED_IAM` if using IAM resources with custom names, `CAPABILITY_IAM` otherwise.
    - Use `--guided` option for providing the parameters interactively: `sam deploy --guided`

#### Local Testing 
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html
- One off invocation: `sam local invoke "<FunctionToInvoke>" -e <event-json.json>`
    - The `FunctionToInvoke` is the lambda function name as defined in the cloudformation template
- Hosting APIs locally: `sam local start-api`
    - Once the docker image loads, use curl to send a request to the api running on localhost: `curl http://127.0.0.1:3000/<api_path>`
- Get Logs: `sam logs -n <FunctionToInvoke> --stack-name <CloudFormationStackName> --tail`