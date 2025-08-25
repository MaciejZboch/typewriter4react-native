import type { TypewriterTextProps } from 'typewriter4react-native';

export type ExampleType = {
  id: string;
  title: string;
  description: string;
  typewriterProps: TypewriterTextProps;
};

export type ExampleSection = {
  title: string;
  data: ExampleType[];
};
