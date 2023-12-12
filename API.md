# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImagePipeline <a name="ImagePipeline" id="cdk-ami-builder.ImagePipeline"></a>

#### Initializers <a name="Initializers" id="cdk-ami-builder.ImagePipeline.Initializer"></a>

```typescript
import { ImagePipeline } from 'cdk-ami-builder'

new ImagePipeline(scope: Construct, id: string, props: ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-ami-builder.ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ami-builder.ImagePipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-ami-builder.ImagePipelineProps">ImagePipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-ami-builder.ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-ami-builder.ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-ami-builder.ImagePipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-ami-builder.ImagePipelineProps">ImagePipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ami-builder.ImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-ami-builder.ImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ami-builder.ImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-ami-builder.ImagePipeline.isConstruct"></a>

```typescript
import { ImagePipeline } from 'cdk-ami-builder'

ImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-ami-builder.ImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.ImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-ami-builder.ImagePipeline.property.imageRecipeComponents">imageRecipeComponents</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-ami-builder.ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imageRecipeComponents`<sup>Required</sup> <a name="imageRecipeComponents" id="cdk-ami-builder.ImagePipeline.property.imageRecipeComponents"></a>

```typescript
public readonly imageRecipeComponents: ComponentConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]

---


## Structs <a name="Structs" id="Structs"></a>

### ImagePipelineProps <a name="ImagePipelineProps" id="cdk-ami-builder.ImagePipelineProps"></a>

#### Initializer <a name="Initializer" id="cdk-ami-builder.ImagePipelineProps.Initializer"></a>

```typescript
import { ImagePipelineProps } from 'cdk-ami-builder'

const imagePipelineProps: ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.components">components</a></code> | <code><a href="#cdk-ami-builder.IComponentProps">IComponentProps</a>[]</code> | List of component props. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.parentImage">parentImage</a></code> | <code>string</code> | The source (parent) image that the image recipe uses as its base environment. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.subnetId">subnetId</a></code> | <code>string</code> | Subnet ID for the Infrastructure Configuration. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.additionalPolicies">additionalPolicies</a></code> | <code>aws-cdk-lib.aws_iam.ManagedPolicy[]</code> | Additional policies to add to the instance profile associated with the Instance Configurations. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.amiIdSsmAccountId">amiIdSsmAccountId</a></code> | <code>string</code> | Account ID for Parameter Store path above. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.amiIdSsmParameterName">amiIdSsmParameterName</a></code> | <code>string</code> | Parameter Store path to store latest AMI ID under. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.amiIdSsmRegion">amiIdSsmRegion</a></code> | <code>string</code> | Region for Parameter Store path above. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.distributionAccountIDs">distributionAccountIDs</a></code> | <code>string[]</code> | List of accounts to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.distributionRegions">distributionRegions</a></code> | <code>string[]</code> | List of regions to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.ebsVolumeConfigurations">ebsVolumeConfigurations</a></code> | <code><a href="#cdk-ami-builder.VolumeProps">VolumeProps</a>[]</code> | Configuration for the AMI's EBS volumes. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.email">email</a></code> | <code>string</code> | Email used to receive Image Builder Pipeline Notifications via SNS. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.enableCrossAccountDistribution">enableCrossAccountDistribution</a></code> | <code>boolean</code> | Set to true if you want to copy this AMI to other accounts using a Distribution Configuration. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.enableVulnScans">enableVulnScans</a></code> | <code>boolean</code> | Set to true if you want to enable continuous vulnerability scans through AWS Inpector. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.imageRecipeName">imageRecipeName</a></code> | <code>string</code> | Name of the Image Recipe. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.imageRecipeVersion">imageRecipeVersion</a></code> | <code>string</code> | Image recipe version (Default: 0.0.1). |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.infraConfigName">infraConfigName</a></code> | <code>string</code> | Name of the Infrastructure Configuration for Image Builder. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]). |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.Key</code> | KMS Key used to encrypt the SNS topic. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | Name of the Image Pipeline. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.platform">platform</a></code> | <code>string</code> | Platform type Linux or Windows (Default: Linux). |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.profileName">profileName</a></code> | <code>string</code> | Name of the instance profile that will be associated with the Instance Configuration. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.securityGroups">securityGroups</a></code> | <code>string[]</code> | List of security group IDs for the Infrastructure Configuration. |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.userDataScript">userDataScript</a></code> | <code>string</code> | UserData script that will override default one (if specified). |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.vulnScansRepoName">vulnScansRepoName</a></code> | <code>string</code> | Store vulnerability scans through AWS Inspector in ECR using this repo name (if option is enabled). |
| <code><a href="#cdk-ami-builder.ImagePipelineProps.property.vulnScansRepoTags">vulnScansRepoTags</a></code> | <code>string[]</code> | Store vulnerability scans through AWS Inspector in ECR using these image tags (if option is enabled). |

---

##### `components`<sup>Required</sup> <a name="components" id="cdk-ami-builder.ImagePipelineProps.property.components"></a>

```typescript
public readonly components: IComponentProps[];
```

- *Type:* <a href="#cdk-ami-builder.IComponentProps">IComponentProps</a>[]

List of component props.

---

##### `parentImage`<sup>Required</sup> <a name="parentImage" id="cdk-ami-builder.ImagePipelineProps.property.parentImage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* string

The source (parent) image that the image recipe uses as its base environment.

The value can be the parent image ARN or an Image Builder AMI ID

---

##### `subnetId`<sup>Required</sup> <a name="subnetId" id="cdk-ami-builder.ImagePipelineProps.property.subnetId"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* string

Subnet ID for the Infrastructure Configuration.

---

##### `additionalPolicies`<sup>Optional</sup> <a name="additionalPolicies" id="cdk-ami-builder.ImagePipelineProps.property.additionalPolicies"></a>

```typescript
public readonly additionalPolicies: ManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.ManagedPolicy[]

Additional policies to add to the instance profile associated with the Instance Configurations.

---

##### `amiIdSsmAccountId`<sup>Optional</sup> <a name="amiIdSsmAccountId" id="cdk-ami-builder.ImagePipelineProps.property.amiIdSsmAccountId"></a>

```typescript
public readonly amiIdSsmAccountId: string;
```

- *Type:* string

Account ID for Parameter Store path above.

---

##### `amiIdSsmParameterName`<sup>Optional</sup> <a name="amiIdSsmParameterName" id="cdk-ami-builder.ImagePipelineProps.property.amiIdSsmParameterName"></a>

```typescript
public readonly amiIdSsmParameterName: string;
```

- *Type:* string

Parameter Store path to store latest AMI ID under.

---

##### `amiIdSsmRegion`<sup>Optional</sup> <a name="amiIdSsmRegion" id="cdk-ami-builder.ImagePipelineProps.property.amiIdSsmRegion"></a>

```typescript
public readonly amiIdSsmRegion: string;
```

- *Type:* string

Region for Parameter Store path above.

---

##### `distributionAccountIDs`<sup>Optional</sup> <a name="distributionAccountIDs" id="cdk-ami-builder.ImagePipelineProps.property.distributionAccountIDs"></a>

```typescript
public readonly distributionAccountIDs: string[];
```

- *Type:* string[]

List of accounts to copy this AMI to, if the option to do so is enabled.

---

##### `distributionRegions`<sup>Optional</sup> <a name="distributionRegions" id="cdk-ami-builder.ImagePipelineProps.property.distributionRegions"></a>

```typescript
public readonly distributionRegions: string[];
```

- *Type:* string[]

List of regions to copy this AMI to, if the option to do so is enabled.

---

##### `ebsVolumeConfigurations`<sup>Optional</sup> <a name="ebsVolumeConfigurations" id="cdk-ami-builder.ImagePipelineProps.property.ebsVolumeConfigurations"></a>

```typescript
public readonly ebsVolumeConfigurations: VolumeProps[];
```

- *Type:* <a href="#cdk-ami-builder.VolumeProps">VolumeProps</a>[]

Configuration for the AMI's EBS volumes.

---

##### `email`<sup>Optional</sup> <a name="email" id="cdk-ami-builder.ImagePipelineProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

Email used to receive Image Builder Pipeline Notifications via SNS.

---

##### `enableCrossAccountDistribution`<sup>Optional</sup> <a name="enableCrossAccountDistribution" id="cdk-ami-builder.ImagePipelineProps.property.enableCrossAccountDistribution"></a>

```typescript
public readonly enableCrossAccountDistribution: boolean;
```

- *Type:* boolean

Set to true if you want to copy this AMI to other accounts using a Distribution Configuration.

---

##### `enableVulnScans`<sup>Optional</sup> <a name="enableVulnScans" id="cdk-ami-builder.ImagePipelineProps.property.enableVulnScans"></a>

```typescript
public readonly enableVulnScans: boolean;
```

- *Type:* boolean

Set to true if you want to enable continuous vulnerability scans through AWS Inpector.

---

##### `imageRecipeName`<sup>Optional</sup> <a name="imageRecipeName" id="cdk-ami-builder.ImagePipelineProps.property.imageRecipeName"></a>

```typescript
public readonly imageRecipeName: string;
```

- *Type:* string

Name of the Image Recipe.

---

##### `imageRecipeVersion`<sup>Optional</sup> <a name="imageRecipeVersion" id="cdk-ami-builder.ImagePipelineProps.property.imageRecipeVersion"></a>

```typescript
public readonly imageRecipeVersion: string;
```

- *Type:* string

Image recipe version (Default: 0.0.1).

---

##### `infraConfigName`<sup>Optional</sup> <a name="infraConfigName" id="cdk-ami-builder.ImagePipelineProps.property.infraConfigName"></a>

```typescript
public readonly infraConfigName: string;
```

- *Type:* string

Name of the Infrastructure Configuration for Image Builder.

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="cdk-ami-builder.ImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]).

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-ami-builder.ImagePipelineProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: Key;
```

- *Type:* aws-cdk-lib.aws_kms.Key

KMS Key used to encrypt the SNS topic.

Enter an existing KMS Key in your target account/region.

---

##### `pipelineName`<sup>Optional</sup> <a name="pipelineName" id="cdk-ami-builder.ImagePipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string

Name of the Image Pipeline.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="cdk-ami-builder.ImagePipelineProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Platform type Linux or Windows (Default: Linux).

---

##### `profileName`<sup>Optional</sup> <a name="profileName" id="cdk-ami-builder.ImagePipelineProps.property.profileName"></a>

```typescript
public readonly profileName: string;
```

- *Type:* string

Name of the instance profile that will be associated with the Instance Configuration.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-ami-builder.ImagePipelineProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: string[];
```

- *Type:* string[]

List of security group IDs for the Infrastructure Configuration.

---

##### `userDataScript`<sup>Optional</sup> <a name="userDataScript" id="cdk-ami-builder.ImagePipelineProps.property.userDataScript"></a>

```typescript
public readonly userDataScript: string;
```

- *Type:* string
- *Default:* none

UserData script that will override default one (if specified).

---

##### `vulnScansRepoName`<sup>Optional</sup> <a name="vulnScansRepoName" id="cdk-ami-builder.ImagePipelineProps.property.vulnScansRepoName"></a>

```typescript
public readonly vulnScansRepoName: string;
```

- *Type:* string

Store vulnerability scans through AWS Inspector in ECR using this repo name (if option is enabled).

---

##### `vulnScansRepoTags`<sup>Optional</sup> <a name="vulnScansRepoTags" id="cdk-ami-builder.ImagePipelineProps.property.vulnScansRepoTags"></a>

```typescript
public readonly vulnScansRepoTags: string[];
```

- *Type:* string[]

Store vulnerability scans through AWS Inspector in ECR using these image tags (if option is enabled).

---

### VolumeProps <a name="VolumeProps" id="cdk-ami-builder.VolumeProps"></a>

#### Initializer <a name="Initializer" id="cdk-ami-builder.VolumeProps.Initializer"></a>

```typescript
import { VolumeProps } from 'cdk-ami-builder'

const volumeProps: VolumeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.VolumeProps.property.deviceName">deviceName</a></code> | <code>string</code> | Name of the volume. |
| <code><a href="#cdk-ami-builder.VolumeProps.property.ebs">ebs</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty</code> | EBS Block Store Parameters. |

---

##### `deviceName`<sup>Required</sup> <a name="deviceName" id="cdk-ami-builder.VolumeProps.property.deviceName"></a>

```typescript
public readonly deviceName: string;
```

- *Type:* string

Name of the volume.

---

##### `ebs`<sup>Required</sup> <a name="ebs" id="cdk-ami-builder.VolumeProps.property.ebs"></a>

```typescript
public readonly ebs: EbsInstanceBlockDeviceSpecificationProperty;
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty

EBS Block Store Parameters.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IBuildCommands <a name="IBuildCommands" id="cdk-ami-builder.IBuildCommands"></a>

- *Implemented By:* <a href="#cdk-ami-builder.IBuildCommands">IBuildCommands</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.IBuildCommands.property.commands">commands</a></code> | <code>string[]</code> | *No description.* |

---

##### `commands`<sup>Required</sup> <a name="commands" id="cdk-ami-builder.IBuildCommands.property.commands"></a>

```typescript
public readonly commands: string[];
```

- *Type:* string[]

---

### IComponentData <a name="IComponentData" id="cdk-ami-builder.IComponentData"></a>

- *Implemented By:* <a href="#cdk-ami-builder.IComponentData">IComponentData</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.IComponentData.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentData.property.phases">phases</a></code> | <code><a href="#cdk-ami-builder.IPhaseCommands">IPhaseCommands</a></code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentData.property.schemaVersion">schemaVersion</a></code> | <code>string</code> | *No description.* |

---

##### `description`<sup>Required</sup> <a name="description" id="cdk-ami-builder.IComponentData.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `phases`<sup>Required</sup> <a name="phases" id="cdk-ami-builder.IComponentData.property.phases"></a>

```typescript
public readonly phases: IPhaseCommands;
```

- *Type:* <a href="#cdk-ami-builder.IPhaseCommands">IPhaseCommands</a>

---

##### `schemaVersion`<sup>Required</sup> <a name="schemaVersion" id="cdk-ami-builder.IComponentData.property.schemaVersion"></a>

```typescript
public readonly schemaVersion: string;
```

- *Type:* string

---

### IComponentProps <a name="IComponentProps" id="cdk-ami-builder.IComponentProps"></a>

- *Implemented By:* <a href="#cdk-ami-builder.IComponentProps">IComponentProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.IComponentProps.property.data">data</a></code> | <code><a href="#cdk-ami-builder.IComponentData">IComponentData</a></code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentProps.property.version">version</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ami-builder.IComponentProps.property.platform">platform</a></code> | <code>string</code> | *No description.* |

---

##### `data`<sup>Required</sup> <a name="data" id="cdk-ami-builder.IComponentProps.property.data"></a>

```typescript
public readonly data: IComponentData;
```

- *Type:* <a href="#cdk-ami-builder.IComponentData">IComponentData</a>

---

##### `description`<sup>Required</sup> <a name="description" id="cdk-ami-builder.IComponentProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-ami-builder.IComponentProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `version`<sup>Required</sup> <a name="version" id="cdk-ami-builder.IComponentProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

---

##### `platform`<sup>Optional</sup> <a name="platform" id="cdk-ami-builder.IComponentProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

---

### IPhaseCommands <a name="IPhaseCommands" id="cdk-ami-builder.IPhaseCommands"></a>

- *Implemented By:* <a href="#cdk-ami-builder.IPhaseCommands">IPhaseCommands</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ami-builder.IPhaseCommands.property.buildCommands">buildCommands</a></code> | <code><a href="#cdk-ami-builder.IBuildCommands">IBuildCommands</a></code> | *No description.* |

---

##### `buildCommands`<sup>Required</sup> <a name="buildCommands" id="cdk-ami-builder.IPhaseCommands.property.buildCommands"></a>

```typescript
public readonly buildCommands: IBuildCommands;
```

- *Type:* <a href="#cdk-ami-builder.IBuildCommands">IBuildCommands</a>

---

