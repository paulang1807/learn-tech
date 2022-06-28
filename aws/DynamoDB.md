## Cross Account Copy from Account A to Account B

### Step 1: Create Role in Account A
Create a role in **Account A** to allow DynamoDB access from **Account B**. Attach relevant policies (such as the managed policy `AmazonDynamoDBFullAccess`) allowing DynamoDB access.

Trust policy for the role:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<Account B account number>:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {}
        }
    ]
}
```

### Step 2: Create Role in Account B
We will use Glue jobs to copy the DynamoDB table. Create role in Account with relevant access for the Glue job. Sample policies may include the managed policies `AWSGlueServiceRole`, `AmazonDynamoDBFullAccess` and `AmazonS3FullAccess`.

### Step 3: Attach Cross Account Access Policy
Attach the following policy to the role created above:
```json
{
    "Version": "2012-10-17",
    "Statement": {
        "Effect": "Allow",
        "Action": "sts:AssumeRole",
        "Resource": "ARN of Role created in Step 1"
    }
}
```

### Step 4: Create DynamoDB table in Account B
Create a DynamboDB table in Account B with the same partition and sort key as the table in Account A

### Step 4: Create and Run Glue Job
Create a Glue Job with the script [here](https://github.com/paulang1807/code-snippets/blob/master/aws/glue_job_cross_account_dynamo_copy.py). Execute the job to copy the data from the table in Account A to the one in Account B.