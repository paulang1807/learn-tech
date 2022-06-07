## Lambda Proxy Integration

### References
- [AWS Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)

### Steps
- Create a [Lambda Node JS function](https://github.com/paulang1807/code-snippets/blob/master/aws/lambda/NodeJs.md) using the [sample index.js code](https://github.com/paulang1807/code-snippets/blob/master/aws/lambda/api_gateway_proxy_integration_index.js)
- Follow steps mentioned under `Create a "Hello, World!" API` and `Deploy and test the API` sections of the [AWS Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)
- Test the api 
  - In the browser using the invoke url and resource name
    - Test Url Format: `<InvokeUrl>/<ResourceName>`
    - Invoke url is located under `API -> Stages -> <Stage Name>` section of the `Amazon API Gateway` service.
    - Invoke url format: `https://<API_ID>.execute-api.us-east-1.amazonaws.com/<STAGE_NAME>`
  - Using curl: `curl https://<API_ID>.execute-api.us-east-1.amazonaws.com/<STAGE_NAME>/<ResourceName>`