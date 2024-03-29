# Content
- [Cross Account Copy from Account A to Account B](#cross-account-copy-from-account-a-to-account-b)
- [Fine Grained access using Cognito Groups](#fine-grained-access-using-cognito-groups)

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

## Fine Grained Access Using Cognito Groups
Ref: https://aws.amazon.com/blogs/mobile/building-fine-grained-authorization-using-amazon-cognito-user-pools-groups/
### Pre-Requisites
1. DynamoDB table
2. Cognito User Pool
3. Cognito Identity Pool
  - The Authentication provider should be configured to use the Cognito User Pool

### Step 1: Create IAM Roles
Create IAM Roles for defining the DynamoDB table access levels:
- The role(s) should have a trust policy similar to [this](https://github.com/paulang1807/code-snippets/blob/master/aws/iam/cognito_group_trust_policy.json)
- The role(s) should have a policy similar to [this](https://github.com/paulang1807/code-snippets/blob/master/aws/iam/cognito_group_role_base.json) for providing relevant access to mobileanalytics, mobiletargeting, cognito-sync and cognito-identity
- The role(s) should also have a policy similar to [this](https://github.com/paulang1807/code-snippets/blob/master/aws/iam/cognito_group_dynamodb_edit.json) for edit access or [this](https://github.com/paulang1807/code-snippets/blob/master/aws/iam/cognito_group_dynamodb_read.json) for read only access.

### Step 2: Add Roles to Cognito Groups
- Create separate groups in the Cognito User Pool corresponding to the unique values of the partition key in the DynamoDB table.
    - Specify the role arn for each group based on the roles created in Step 1
    - Set the desired precedence for the groups
- Assign the read only role to the autogenerated group in cognito which will have all the users who sign in using the Cognito authentication

### Step 3: Add users to the Cognito Groups
- Use the code chunk [here](https://github.com/paulang1807/code-snippets/blob/master/aws/cognito_user_list.py) to get the attributes for the cognito users.
- Use the code chunk below to filter the output dataframe from the above code and add users to the cognito groups:
    ```python

    # Filter Dataframe
    # Here, user_list is the list of user ids to be added to the group
    df_group = df2[df2.user_id.isin(user_list)]

    # add users to group
    for index, row in df_group.iterrows():
        print(row['cognito_username'])
        response = client.admin_add_user_to_group(
            UserPoolId=<USER_POOL_ID>,
            Username=row['cognito_username'],
            GroupName=<group_name>
        )
    ```