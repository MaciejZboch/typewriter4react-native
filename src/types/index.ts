import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SPEED_VALUES } from '../constants';

type CursorStyle = Omit<ViewStyle, 'backgroundColor' | 'opacity'> & {
  color?: ViewStyle['backgroundColor'];
  minOpacity?: ViewStyle['opacity'];
  maxOpacity?: ViewStyle['opacity'];

  /** For text_simple cursor only. */
  fontSize?: TextStyle['fontSize'];
  /** For text_simple cursor only. */
  fontWeight?: TextStyle['fontWeight'];
};

export interface TypewriterTextProps {
  /**The text string that is to be animated.*/
  text: string;

  /**Text style.
   * Takes object of type StyleProp<TextStyle>.
   * @defaultValue {
    fontSize: DEFAULT_FONTSIZE_VALUE,
    color: 'black',
    flexWrap: 'wrap'
  }
   */
  textStyle?: StyleProp<TextStyle>;

  /**Cursor style.
   * Takes object of custom type CursorStyle.
   *  - By default its size and position are derived from the font size.
   *  - Opacity can be regulated via the parameters: minOpacity & maxOpacity.
   *
   *
   *    @defaultValue   {
   * - height: fontSize! * 0.6, // height size lowered for the cursor to not interfere with line height despite position relative
   * - width: fontSize! * 0.1,
   * - minOpacity: 0,
   * - maxOpacity: 1,
   * - transform: [
   *                    - - { translateX: fontSize! / 3 }, // place it ahead of the text
   *                    - - { scale: 1.75 }, // make it look larger to make-up for the diminished height
   *
   * ]
   * }
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
   * Sets one of the pre-determined values for 'typingDelayPerChar'.
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

  /**Determines if the cursor disappears after the whole text is displayed.
   *
   * @defaultValue true
   */
  hideCursorOnFinish?: boolean;

  /**
   * Determines if the animation should run.
   *
   * @defaultValue true;
   */
  isActive?: boolean;

  /**
   * Number of milliseconds to wait before the animation starts its run, after it is activated via 'isActive' prop.
   */
  startDelay?: number;

  /** Controls how many milliseconds the cursor stays after the whole text is displayed.
   *
   * @defaultValue 2000
   */
  cursorDisappearDelay?: number;

  /**
   * Controls how many milliseconds a single cursor blink lasts.
   *
   * @defaultValue 200
   */
  cursorBlinkTime?: number;

  /**
   * Called once typing animation finishes. Doesn't wait for the cursor to disappear.
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
   * -- Setting this property makes the component ignore the value of the 'speed' property. --
   *
   * - Determines how many milliseconds it takes to type a single character during the animation.
   * - By default its value is set via the speed property.
   *   */
  typingDelayPerChar?: number;

  /**
   * To make the typewriting effect look natural, a random additional delay (variance) is added per every character delay.
   *
   * This parameter determines its maximal value in milliseconds.
   *
   *
   * @default 100
   */
  typingDelayPerCharVariance?: number;

  /**
   * 
   * - 'view' is the default cursor - laregly customizable, based on the React Native stock View component.
   * - 'text_simple' is an alternative cursor - non-customizable but due to its simpler mechanics it may prove to be more robust. The only parameter of this cursor that can be change by passing a cursorStyle object is opacity.
   *

   * @default 'view'
   */
  cursorType?: 'view' | 'text_simple';

  /**
   * 
   * - 'view' is the default cursor - laregly customizable, based on the React Native stock View component.
   * - 'text_simple' is an alternative cursor - it offers limited customization (minOpacity, maxOpacity, fontSize, fontWeight) but due to its simpler mechanics it may prove to be more robust.
   * - If 'text_simple' is used, a custom string can be used as a cursor via passing it as 'cursorTextSimpleCustomChar' prop.
   *

   * @default 'view'
   */

  /**
   * - Replaces the string '|' with any string that is passed.
   * - It's stronly recommended to use only single character strings, to prevent visual bugs.
   *
   * @default '|'
   */
  cursorTextSimpleCustomChar?: string;

  /**
   * - If true, the cursor isn't rendered.
   *
   * @default false */
  disableCursor?: boolean;
}

export type DefaultTypewriterProps = Required<
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
    | 'cursorType'
    | 'disableCursor'
  >
>;
