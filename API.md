# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImagePipeline <a name="ImagePipeline" id="@layerborn/cdk-image-pipeline.ImagePipeline"></a>

#### Initializers <a name="Initializers" id="@layerborn/cdk-image-pipeline.ImagePipeline.Initializer"></a>

```typescript
import { ImagePipeline } from '@layerborn/cdk-image-pipeline'

new ImagePipeline(scope: Construct, id: string, props: ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.props">props</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@layerborn/cdk-image-pipeline.ImagePipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@layerborn/cdk-image-pipeline.ImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@layerborn/cdk-image-pipeline.ImagePipeline.isConstruct"></a>

```typescript
import { ImagePipeline } from '@layerborn/cdk-image-pipeline'

ImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@layerborn/cdk-image-pipeline.ImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents">imageRecipeComponents</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@layerborn/cdk-image-pipeline.ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imageRecipeComponents`<sup>Required</sup> <a name="imageRecipeComponents" id="@layerborn/cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents"></a>

```typescript
public readonly imageRecipeComponents: ComponentConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]

---


## Structs <a name="Structs" id="Structs"></a>

### ImagePipelineProps <a name="ImagePipelineProps" id="@layerborn/cdk-image-pipeline.ImagePipelineProps"></a>

#### Initializer <a name="Initializer" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.Initializer"></a>

```typescript
import { ImagePipelineProps } from '@layerborn/cdk-image-pipeline'

const imagePipelineProps: ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.components">components</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps">IComponentProps</a>[]</code> | List of component props. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.parentImage">parentImage</a></code> | <code>string</code> | The source (parent) image that the image recipe uses as its base environment. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc</code> | Vpc to use for the Image Builder Pipeline. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies">additionalPolicies</a></code> | <code>aws-cdk-lib.aws_iam.ManagedPolicy[]</code> | Additional policies to add to the instance profile associated with the Instance Configurations. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmAccountId">amiIdSsmAccountId</a></code> | <code>string</code> | Account ID for Parameter Store path above. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmParameterName">amiIdSsmParameterName</a></code> | <code>string</code> | Parameter Store path to store latest AMI ID under. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmRegion">amiIdSsmRegion</a></code> | <code>string</code> | Region for Parameter Store path above. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.distributionAccountIDs">distributionAccountIDs</a></code> | <code>string[]</code> | List of accounts to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.distributionRegions">distributionRegions</a></code> | <code>string[]</code> | List of regions to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfigurations">ebsVolumeConfigurations</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.VolumeProps">VolumeProps</a>[]</code> | Subnet ID for the Infrastructure Configuration. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.email">email</a></code> | <code>string</code> | Email used to receive Image Builder Pipeline Notifications via SNS. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.enableCrossAccountDistribution">enableCrossAccountDistribution</a></code> | <code>boolean</code> | Set to true if you want to copy this AMI to other accounts using a Distribution Configuration. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.enableVulnScans">enableVulnScans</a></code> | <code>boolean</code> | Set to true if you want to enable continuous vulnerability scans through AWS Inpector. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.imageRecipeName">imageRecipeName</a></code> | <code>string</code> | Name of the Image Recipe. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion">imageRecipeVersion</a></code> | <code>string</code> | Image recipe version (Default: 0.0.1). |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.infraConfigName">infraConfigName</a></code> | <code>string</code> | Name of the Infrastructure Configuration for Image Builder. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]). |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | KMS Key used to encrypt the SNS topic. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | Name of the Image Pipeline. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.platform">platform</a></code> | <code>string</code> | Platform type Linux or Windows (Default: Linux). |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.profileName">profileName</a></code> | <code>string</code> | Name of the instance profile that will be associated with the Instance Configuration. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.securityGroupIds">securityGroupIds</a></code> | <code>string[]</code> | List of security group IDs for the Infrastructure Configuration. |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.userDataScript">userDataScript</a></code> | <code>string</code> | UserData script that will override default one (if specified). |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoName">vulnScansRepoName</a></code> | <code>string</code> | Store vulnerability scans through AWS Inspector in ECR using this repo name (if option is enabled). |
| <code><a href="#@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoTags">vulnScansRepoTags</a></code> | <code>string[]</code> | Store vulnerability scans through AWS Inspector in ECR using these image tags (if option is enabled). |

---

##### `components`<sup>Required</sup> <a name="components" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.components"></a>

```typescript
public readonly components: IComponentProps[];
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.IComponentProps">IComponentProps</a>[]

List of component props.

---

##### `parentImage`<sup>Required</sup> <a name="parentImage" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.parentImage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* string

The source (parent) image that the image recipe uses as its base environment.

The value can be the parent image ARN or an Image Builder AMI ID

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vpc"></a>

```typescript
public readonly vpc: Vpc;
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc

Vpc to use for the Image Builder Pipeline.

---

##### `additionalPolicies`<sup>Optional</sup> <a name="additionalPolicies" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies"></a>

```typescript
public readonly additionalPolicies: ManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.ManagedPolicy[]

Additional policies to add to the instance profile associated with the Instance Configurations.

---

##### `amiIdSsmAccountId`<sup>Optional</sup> <a name="amiIdSsmAccountId" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmAccountId"></a>

```typescript
public readonly amiIdSsmAccountId: string;
```

- *Type:* string

Account ID for Parameter Store path above.

---

##### `amiIdSsmParameterName`<sup>Optional</sup> <a name="amiIdSsmParameterName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmParameterName"></a>

```typescript
public readonly amiIdSsmParameterName: string;
```

- *Type:* string

Parameter Store path to store latest AMI ID under.

---

##### `amiIdSsmRegion`<sup>Optional</sup> <a name="amiIdSsmRegion" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmRegion"></a>

```typescript
public readonly amiIdSsmRegion: string;
```

- *Type:* string

Region for Parameter Store path above.

---

##### `distributionAccountIDs`<sup>Optional</sup> <a name="distributionAccountIDs" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.distributionAccountIDs"></a>

```typescript
public readonly distributionAccountIDs: string[];
```

- *Type:* string[]

List of accounts to copy this AMI to, if the option to do so is enabled.

---

##### `distributionRegions`<sup>Optional</sup> <a name="distributionRegions" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.distributionRegions"></a>

```typescript
public readonly distributionRegions: string[];
```

- *Type:* string[]

List of regions to copy this AMI to, if the option to do so is enabled.

---

##### `ebsVolumeConfigurations`<sup>Optional</sup> <a name="ebsVolumeConfigurations" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfigurations"></a>

```typescript
public readonly ebsVolumeConfigurations: VolumeProps[];
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.VolumeProps">VolumeProps</a>[]

Subnet ID for the Infrastructure Configuration.

---

##### `email`<sup>Optional</sup> <a name="email" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

Email used to receive Image Builder Pipeline Notifications via SNS.

---

##### `enableCrossAccountDistribution`<sup>Optional</sup> <a name="enableCrossAccountDistribution" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.enableCrossAccountDistribution"></a>

```typescript
public readonly enableCrossAccountDistribution: boolean;
```

- *Type:* boolean

Set to true if you want to copy this AMI to other accounts using a Distribution Configuration.

---

##### `enableVulnScans`<sup>Optional</sup> <a name="enableVulnScans" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.enableVulnScans"></a>

```typescript
public readonly enableVulnScans: boolean;
```

- *Type:* boolean

Set to true if you want to enable continuous vulnerability scans through AWS Inpector.

---

##### `imageRecipeName`<sup>Optional</sup> <a name="imageRecipeName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.imageRecipeName"></a>

```typescript
public readonly imageRecipeName: string;
```

- *Type:* string

Name of the Image Recipe.

---

##### `imageRecipeVersion`<sup>Optional</sup> <a name="imageRecipeVersion" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion"></a>

```typescript
public readonly imageRecipeVersion: string;
```

- *Type:* string

Image recipe version (Default: 0.0.1).

---

##### `infraConfigName`<sup>Optional</sup> <a name="infraConfigName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.infraConfigName"></a>

```typescript
public readonly infraConfigName: string;
```

- *Type:* string

Name of the Infrastructure Configuration for Image Builder.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]).

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key

KMS Key used to encrypt the SNS topic.

Enter an existing KMS Key in your target account/region.

---

##### `pipelineName`<sup>Optional</sup> <a name="pipelineName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string

Name of the Image Pipeline.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Platform type Linux or Windows (Default: Linux).

---

##### `profileName`<sup>Optional</sup> <a name="profileName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.profileName"></a>

```typescript
public readonly profileName: string;
```

- *Type:* string

Name of the instance profile that will be associated with the Instance Configuration.

---

##### `securityGroupIds`<sup>Optional</sup> <a name="securityGroupIds" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.securityGroupIds"></a>

```typescript
public readonly securityGroupIds: string[];
```

- *Type:* string[]

List of security group IDs for the Infrastructure Configuration.

---

##### `userDataScript`<sup>Optional</sup> <a name="userDataScript" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.userDataScript"></a>

```typescript
public readonly userDataScript: string;
```

- *Type:* string
- *Default:* none

UserData script that will override default one (if specified).

---

##### `vulnScansRepoName`<sup>Optional</sup> <a name="vulnScansRepoName" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoName"></a>

```typescript
public readonly vulnScansRepoName: string;
```

- *Type:* string

Store vulnerability scans through AWS Inspector in ECR using this repo name (if option is enabled).

---

##### `vulnScansRepoTags`<sup>Optional</sup> <a name="vulnScansRepoTags" id="@layerborn/cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoTags"></a>

```typescript
public readonly vulnScansRepoTags: string[];
```

- *Type:* string[]

Store vulnerability scans through AWS Inspector in ECR using these image tags (if option is enabled).

---

### VolumeProps <a name="VolumeProps" id="@layerborn/cdk-image-pipeline.VolumeProps"></a>

#### Initializer <a name="Initializer" id="@layerborn/cdk-image-pipeline.VolumeProps.Initializer"></a>

```typescript
import { VolumeProps } from '@layerborn/cdk-image-pipeline'

const volumeProps: VolumeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.VolumeProps.property.deviceName">deviceName</a></code> | <code>string</code> | Name of the volume. |
| <code><a href="#@layerborn/cdk-image-pipeline.VolumeProps.property.ebs">ebs</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty</code> | EBS Block Store Parameters. |

---

##### `deviceName`<sup>Required</sup> <a name="deviceName" id="@layerborn/cdk-image-pipeline.VolumeProps.property.deviceName"></a>

```typescript
public readonly deviceName: string;
```

- *Type:* string

Name of the volume.

---

##### `ebs`<sup>Required</sup> <a name="ebs" id="@layerborn/cdk-image-pipeline.VolumeProps.property.ebs"></a>

```typescript
public readonly ebs: EbsInstanceBlockDeviceSpecificationProperty;
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty

EBS Block Store Parameters.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IActionCommands <a name="IActionCommands" id="@layerborn/cdk-image-pipeline.IActionCommands"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IActionCommands">IActionCommands</a>

Build commands for the component.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IActionCommands.property.commands">commands</a></code> | <code>string[]</code> | *No description.* |

---

##### `commands`<sup>Required</sup> <a name="commands" id="@layerborn/cdk-image-pipeline.IActionCommands.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

---

### IComponentDocument <a name="IComponentDocument" id="@layerborn/cdk-image-pipeline.IComponentDocument"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IComponentDocument">IComponentDocument</a>

Component data.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentDocument.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentDocument.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentDocument.property.phases">phases</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.IPhases">IPhases</a>[]</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentDocument.property.schemaVersion">schemaVersion</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="@layerborn/cdk-image-pipeline.IComponentDocument.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@layerborn/cdk-image-pipeline.IComponentDocument.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `phases`<sup>Required</sup> <a name="phases" id="@layerborn/cdk-image-pipeline.IComponentDocument.property.phases"></a>

```typescript
public readonly phases: IPhases[];
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.IPhases">IPhases</a>[]

---

##### `schemaVersion`<sup>Required</sup> <a name="schemaVersion" id="@layerborn/cdk-image-pipeline.IComponentDocument.property.schemaVersion"></a>

```typescript
public readonly schemaVersion: string;
```

- *Type:* string

---

### IComponentProps <a name="IComponentProps" id="@layerborn/cdk-image-pipeline.IComponentProps"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IComponentProps">IComponentProps</a>

Component props.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.componentDocument">componentDocument</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.IComponentDocument">IComponentDocument</a></code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.schemaVersion">schemaVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.parameters">parameters</a></code> | <code>{[ key: string ]: <a href="#@layerborn/cdk-image-pipeline.IInputParameter">IInputParameter</a>}</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IComponentProps.property.platform">platform</a></code> | <code>string</code> | *No description.* |

---

##### `componentDocument`<sup>Required</sup> <a name="componentDocument" id="@layerborn/cdk-image-pipeline.IComponentProps.property.componentDocument"></a>

```typescript
public readonly componentDocument: IComponentDocument;
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.IComponentDocument">IComponentDocument</a>

---

##### `description`<sup>Required</sup> <a name="description" id="@layerborn/cdk-image-pipeline.IComponentProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@layerborn/cdk-image-pipeline.IComponentProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `schemaVersion`<sup>Required</sup> <a name="schemaVersion" id="@layerborn/cdk-image-pipeline.IComponentProps.property.schemaVersion"></a>

```typescript
public readonly schemaVersion: string;
```

- *Type:* string

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@layerborn/cdk-image-pipeline.IComponentProps.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: IInputParameter};
```

- *Type:* {[ key: string ]: <a href="#@layerborn/cdk-image-pipeline.IInputParameter">IInputParameter</a>}

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@layerborn/cdk-image-pipeline.IComponentProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

---

### IInputParameter <a name="IInputParameter" id="@layerborn/cdk-image-pipeline.IInputParameter"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IInputParameter">IInputParameter</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IInputParameter.property.default">default</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IInputParameter.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IInputParameter.property.type">type</a></code> | <code>string</code> | *No description.* |

---

##### `default`<sup>Required</sup> <a name="default" id="@layerborn/cdk-image-pipeline.IInputParameter.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="@layerborn/cdk-image-pipeline.IInputParameter.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="@layerborn/cdk-image-pipeline.IInputParameter.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

### IPhases <a name="IPhases" id="@layerborn/cdk-image-pipeline.IPhases"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IPhases">IPhases</a>

Phases for the component.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IPhases.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IPhases.property.steps">steps</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.IStepCommands">IStepCommands</a>[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@layerborn/cdk-image-pipeline.IPhases.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `steps`<sup>Required</sup> <a name="steps" id="@layerborn/cdk-image-pipeline.IPhases.property.steps"></a>

```typescript
public readonly steps: IStepCommands[];
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.IStepCommands">IStepCommands</a>[]

---

### IStepCommands <a name="IStepCommands" id="@layerborn/cdk-image-pipeline.IStepCommands"></a>

- *Implemented By:* <a href="#@layerborn/cdk-image-pipeline.IStepCommands">IStepCommands</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@layerborn/cdk-image-pipeline.IStepCommands.property.action">action</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IStepCommands.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@layerborn/cdk-image-pipeline.IStepCommands.property.inputs">inputs</a></code> | <code><a href="#@layerborn/cdk-image-pipeline.IActionCommands">IActionCommands</a></code> | *No description.* |

---

##### `action`<sup>Required</sup> <a name="action" id="@layerborn/cdk-image-pipeline.IStepCommands.property.action"></a>

```typescript
public readonly action: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="@layerborn/cdk-image-pipeline.IStepCommands.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `inputs`<sup>Optional</sup> <a name="inputs" id="@layerborn/cdk-image-pipeline.IStepCommands.property.inputs"></a>

```typescript
public readonly inputs: IActionCommands;
```

- *Type:* <a href="#@layerborn/cdk-image-pipeline.IActionCommands">IActionCommands</a>

---

