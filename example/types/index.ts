import type { ReactNode } from 'react';
import type { TypewriterTextProps } from 'typewriter4react-native';
import type { exampleScreens } from '../data/exampleScreens';

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

export type ExampleScreenTitle = (typeof exampleScreens)[number]['title'];

export type ExampleScreen = {
  title: ExampleScreenTitle;
  icon: string;
  screen: ReactNode;
};
