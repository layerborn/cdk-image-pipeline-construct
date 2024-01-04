import { awscdk } from 'projen';


const projenDep = 'projen@^0.77.5';
const cdkVersion = '2.85.0';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jayson Rawlins',
  authorAddress: 'jayson.rawlins@layerborn.io',
  packageName: '@layerborn/cdk-image-pipeline',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  license: 'Apache-2.0',
  jsiiVersion: '~5.0.0',
  name: 'cdk-image-pipeline',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/layerborn/cdk-image-pipeline-construct.git',
  deps: [
    projenDep,
    'cdk-iam-floyd',
    '@layerborn/cdk-aspect-git-tagger',
    `aws-cdk-lib@${cdkVersion}`,
    '@types/node@^18',
    '@matthewbonig/state-machine',
  ],
  devDeps: [
    `aws-cdk@${cdkVersion}`,
    `aws-cdk-lib@${cdkVersion}`,
    '@types/aws-lambda',
    '@types/node@^18',
  ],

  bundledDeps: [
    '@aws-sdk/client-sqs',
    '@aws-sdk/client-ec2',
    '@aws-sdk/client-sns',
    '@aws-sdk/client-ecs',
    '@aws-sdk/client-s3',
    '@aws-sdk/client-secrets-manager',
    '@aws-sdk/client-sfn',
    '@types/node@^18',
    '@types/js-yaml',
    'js-yaml',
  ],
  tsconfigDev: {
    include: [
      'src/**/*.ts',
      'test/**/*.ts',
    ],
    compilerOptions: {
      lib: ['es2019'],
    },
  },
  gitignore: [
    'cdk.out',
    'cdk.out/*',
    'assets',
  ],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});


project.synth();