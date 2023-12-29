import * as yaml from 'js-yaml';
import { IComponentProps } from '../ImagePipeline';
// eslint-disable-next-line import/no-extraneous-dependencies

const componentsObject: IComponentProps[] = [
  {
    name: 'TestComponent',
    description: 'Test Component',
    schemaVersion: '1.0.0',
    parameters: {
      MyInputParameter: {
        type: 'string',
        default: 'It\'s me!',
        description: 'Test Parameter',
      },
    },
    componentDocument: {
      name: 'TestComponent',
      description: 'Test Component',
      schemaVersion: '1.0',
      phases: [{
        name: 'build',
        steps: [
          {
            name: 'hello',
            action: 'ExecuteBash',
            inputs: {
              commands: [
                'echo "Hello World {{ MyInputParameter }}"',
              ],
            },
          },
        ],
      }],
    },
  },
];

const createObject = yaml.dump(componentsObject);
console.log(createObject);