import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jayson Rawlins',
  authorAddress: 'jayson.rawlins@layerborn.io',
  cdkVersion: '2.41.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-ami-builder',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/layerborn/cdk-ami-builder-construct.git',
  deps: [
    'cdk-iam-floyd',
    '@layerborn/cdk-aspect-git-tagger',
    '@aws-cdk/aws-lambda-python-alpha@2.41.0-alpha.0',
    'aws-cdk-lib@^2.41.0',


  ],
  devDeps: [
    'aws-cdk',
    'aws-cdk-lib',
  ],

  bundledDeps: [
    '@aws-sdk/client-sqs',
    '@aws-sdk/client-ec2',
    '@aws-sdk/client-sns',
    '@aws-sdk/client-ecs',
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
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();