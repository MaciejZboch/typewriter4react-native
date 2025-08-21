import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

type CursorStyle = Omit<ViewStyle, 'backgroundColor' | 'opacity'> & {
  /** Replacement for backgroundColor */
  color?: ViewStyle['backgroundColor'];
};

interface TypewriterTextProps {
  /**The text string that is to be displayed.*/
  text: string;

  /**Text style.
   * Takes object of type StyleProp<TextStyle>.
   * @defaultValue {fontSize: 20, lineHeight: 24, color: 'black'}
   */
  textStyle?: StyleProp<TextStyle>;

  /**Cursor style.
   * Takes object of custom type CursorStyle.
   *  - By default, width and height are derived from the font size, and vertical positioning is adjusted relative to the line height.
   *  - Opacity cannot be edited for it is controlled by the animation algorithm.
   *    @defaultValue {width: fontSize / 4, height: fontSize, color: fontColor, marginBottom: lineHeight! * 2.25 * lineHeight! - lineHeight!}
   */
  cursorStyle?: CursorStyle;

  /**Container style.
   * - Takes object of type StyleProp<ViewStyle>.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**Typing speed.
   *
   * -- This property is ignored if typingDelayPerChar is used. --
   *
   * Sets one of the pre-determined values for typingDelayPerChar.
   *
   * Available options:
   *   - 'slow'
   *   - 'medium'
   *   - 'fast'
   *   - 'very_fast'
   *   - 'fastest'
   *
   * @defaultValue 'fast'
   */
  speed?: keyof typeof SPEED_VALUES;

  /**Determines whether the cursor disappears after the whole text is displayed.
   *
   * @defaultValue true
   */
  hideCursorOnFinish?: boolean;

  /**
   * Determines whether the animation should run.
   *
   * @defaultValue true;
   */
  isActive?: boolean;

  /**
   * Number of milliseconds to wait before the animation starts its run, after it is activated via isActive prop.
   */
  startDelay?: number;

  /** Controls how many milliseconds cursor stays after the whole text is displayed. */
  cursorDisappearDelay?: number;

  /**
   * Controls how many milliseconds a single cursor blink lasts.
   *
   * @defaultValue 200
   */
  cursorBlinkTime?: number;

  /**
   * Called once typing animation finishes. Doesn't wait for cursor disappearance.
   */
  onFinish?: () => void;

  /**
   * Reserves space for the text to be displayed before it is displayed.
   *
   * @defaultValue true
   */
  reserveSpace?: boolean;

  /**
   * If true, the animation reveals text in reverse (text starts fully visible and is erased character by character).
   */
  backwards?: boolean;

  /**
   * -- Setting this property makes the component ignore the value of the property speed. --
   *
   * - Determines how many milliseconds it takes to type a single character during the animation.
   * - By default its value is set via the speed property.
   *   */
  typingDelayPerChar?: number;

  /**
   * To make the typwriting effect look natural a random additional delay (variance) is added per every character delay.
   *
   * This parameter determines its maximal value in milliseconds.
   *
   *
   * @default 100
   */
  typingDelayPerCharVariance?: number;
}

type DefaultTypewriterProps = Required<
  Pick<
    TypewriterTextProps,
    | 'text'
    | 'textStyle'
    | 'speed'
    | 'hideCursorOnFinish'
    | 'isActive'
    | 'cursorDisappearDelay'
    | 'cursorBlinkTime'
    | 'reserveSpace'
    | 'backwards'
    | 'typingDelayPerCharVariance'
  >
>;
