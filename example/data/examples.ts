import { exampleStrings } from '../constants/exampleStrings';
import { defaultTextStyle } from '../constants/styles';
import type { ExampleSection } from '../types';

export const examples: ExampleSection[] = [
  {
    title: 'Space management 🚀',
    data: [
      {
        id: 'sp1',
        title: 'reserveSpace = true',
        description:
          "With the reserveSpace = true (which is the default setting), the typed text doesn't push the space in which it is placed.",
        typewriterProps: {
          text: exampleStrings.spaceOddity,
          textStyle: {
            ...defaultTextStyle,
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
            ...defaultTextStyle,
          },
          text: exampleStrings.spaceOddity,
          reserveSpace: false,
        },
      },
    ],
  },
  {
    title: 'Typing speed 💨',
    data: [
      {
        id: 's1',
        title: 'speed = ‘very_fast‘',
        description:
          'Speed can be set either using pre-set values via selecting one of the default options for the ‘speed‘ prop...',
        typewriterProps: {
          speed: 'very_fast',
          textStyle: {
            ...defaultTextStyle,
          },
          text: exampleStrings.speedingMotorcycle,
        },
      },
      {
        id: 's2',
        title: 'typingDelayPerChar = 25',
        description:
          '...or by explicitly setting the value of typingDelayPerChar. The higher the value, the slower subsequent letters will be typed.',
        typewriterProps: {
          typingDelayPerChar: 25,
          textStyle: {
            ...defaultTextStyle,
          },
          text: exampleStrings.speedingMotorcycle,
        },
      },
      {
        id: 's3',
        title: 'typingDelayPerCharVariance = 400',
        description:
          'An additional delay of random value is added to each individual delay to make the typing seem more realistic. The value of ‘typingDelayPerCharVariance‘ determines how large this variance is.',
        typewriterProps: {
          speed: 'slow',
          typingDelayPerCharVariance: 400,
          textStyle: {
            ...defaultTextStyle,
          },
          text: exampleStrings.speedingMotorcycle,
        },
      },
    ],
  },
  {
    title: 'Text and container customization 🎨',
    data: [
      {
        id: 'tc1',
        title:
          'textStyle = { alignText: ‘right’ } \ncontainerStyle = {\npadding: 48, \nbackgroundColor: ’#81a9ab’, \nborderRadius: 40\n}',
        description:
          'Both text and container can be customized freely using React Native’s stylesheets.',
        typewriterProps: {
          textStyle: {
            fontFamily: 'Helvetica',
            textAlign: 'right',
          },
          containerStyle: {
            padding: 48,
            backgroundColor: '#81a9ab',
            borderRadius: 40,
          },
          text: exampleStrings.unwritten,
          reserveSpace: true,
        },
      },
    ],
  },
  {
    title: 'Cursor customization 🖱️',
    data: [
      {
        id: 'cc1',
        title:
          "cursorBlinkTime: 500, \ncursorStyle: { \nwidth: 10, color: 'green', \nborderWidth: 1, borderColor: 'blue‘\n}",
        description:
          'The cursor of type ‘view‘ (default) can be customized using multiple options. Its appearance can be modified using View type stylesheets inside cursorStyle prop.',
        typewriterProps: {
          text: exampleStrings.pangrams_1,
          cursorType: 'view',
          cursorBlinkTime: 500,
          cursorStyle: {
            width: 10,
            color: 'green',
            borderWidth: 1,
            borderColor: 'blue',
          },
        },
      },
      {
        id: 'cc2',
        title: `cursorTextSimpleCustomChar = 🐈‍⬛ \ncursorType= ‘text_simple’ \nhideCursorOnFinish = false \ncursorStyle: { minOpacity: 1 }`,
        description:
          'When using ‘text_simple’ cursor, any custom character can be set as a cursor. No matter which cursor type you’re using, you can modify its opacity, using the properties ’minOpacity’ and ’maxOpacity’.',
        typewriterProps: {
          textStyle: { fontSize: 24, fontFamily: 'Roboto' },
          cursorType: 'text_simple',
          cursorStyle: { minOpacity: 1 },
          cursorTextSimpleCustomChar: '🐈‍⬛',
          hideCursorOnFinish: false,
          text: exampleStrings.pangrams_2,
        },
      },
    ],
  },
  {
    title: 'Backwards ‘typing’ 🔙',
    data: [
      {
        id: 'bt1',
        title: 'backwards = true',
        description:
          'Text can be erased with the same effect as it can be printed via setting backwards to true.',
        typewriterProps: {
          textStyle: { fontSize: 24, fontFamily: 'Roboto' },
          backwards: true,
          text: exampleStrings.somebodyThatIUsedToKnow,
        },
      },
    ],
  },
];
