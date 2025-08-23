import { StyleSheet } from 'react-native';
import type { DefaultTypewriterProps } from '../types';

export const SPEED_VALUES = {
  slow: 150,
  medium: 125,
  fast: 100,
  very_fast: 75,
  fastest: 55,
} as const;

const DEFAULT_FONTSIZE_VALUE = 20;
export const DEFAULT_STYLES = StyleSheet.create({
  text: {
    fontSize: DEFAULT_FONTSIZE_VALUE,
    color: 'black',
    flexWrap: 'wrap',
  },
});

export const TYPEWRITER_DEFAULT_VALUES: DefaultTypewriterProps = {
  text: '',
  textStyle: DEFAULT_STYLES.text,
  speed: 'fast',
  hideCursorOnFinish: true,
  isActive: true,
  cursorDisappearDelay: 2000, // default: cursor disappears after 2 seconds
  cursorBlinkTime: 200,
  reserveSpace: true,
  backwards: false,
  typingDelayPerCharVariance: 100,
  disableCursor: false,
};
