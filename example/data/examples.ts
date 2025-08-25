import type { ExampleSection } from '../types';

export const examples: ExampleSection[] = [
  {
    title: 'Space management',
    data: [
      {
        id: 'sp1',
        title: 'reserveSpace = true',
        description:
          "With the reserveSpace = true, the typed text doesn't push the space in which it is placed.",
        typewriterProps: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nunc sit amet urna suscipit tempus.',
          textStyle: {
            fontSize: 24,
            fontFamily: 'Roboto',
          },
          reserveSpace: true,
        },
      },
      {
        id: 'sp2',
        title: 'reserveSpace = false',
        description:
          "With the reserveSpace = false, the typed text does not push the space in which it is placed while it's being typed.",
        typewriterProps: {
          textStyle: {
            fontSize: 24,
            fontFamily: 'Roboto',
          },
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nunc sit amet urna suscipit tempus.`,
          reserveSpace: false,
        },
      },
    ],
  },
];
