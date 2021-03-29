# kaholo-plugin-aws-resource-groups-tagging
AWS Resource Groups Tagging plugin for Kaholo. Uses AWS SDK according to this [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ResourceGroupsTaggingAPI.html).

## Settings
1. Access Key ID (Vault) **Optional** - Access key ID of the default IAM user to do the actions with.
2. Secret Access Key (Vault) **Optional** - Secret access key of the default IAM user to do the actions with.

## Method: Tag Resources
Tags the specified resources with the provided tags. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ResourceGroupsTaggingAPI.html#tagResources-property)

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Region (options) **Required** - The region in which your resource is stored at.
4. Resource ARN (text) **Required** - The ARN(s) of the resource(s) to tag. You can enter multiple values by passing either an array from code or in text by seperating each ARN with new line.
5. Tags (text) **Required**  - The tag(s) to apply to the resource(s). Enter text in this format: **<TagName>=<Value>**. You can enter multiple values by passing either an object whose fields are the tags(each field key is the tag name and the field value is the tag value) or by entering text and seprating each key value pair in a new line.
