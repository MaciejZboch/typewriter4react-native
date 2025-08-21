import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

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

const SPEED_VALUES = {
  slow: 150,
  medium: 125,
  fast: 100,
  very_fast: 75,
  fastest: 55,
};
const DEFAULT_FONTSIZE_VALUE = 20;

const DEFAULT_STYLES = StyleSheet.create({
  text: {
    fontSize: DEFAULT_FONTSIZE_VALUE,
    lineHeight: DEFAULT_FONTSIZE_VALUE * 1.2,
    color: 'black',
  },
});

const TYPEWRITER_DEFAULT_VALUES: DefaultTypewriterProps = {
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
};

const Typewriter = ({
  text = TYPEWRITER_DEFAULT_VALUES.text,
  textStyle,
  cursorStyle,
  containerStyle,
  speed = TYPEWRITER_DEFAULT_VALUES.speed,
  hideCursorOnFinish = TYPEWRITER_DEFAULT_VALUES.hideCursorOnFinish,
  isActive = TYPEWRITER_DEFAULT_VALUES.isActive,
  startDelay,
  cursorDisappearDelay = TYPEWRITER_DEFAULT_VALUES.cursorDisappearDelay,
  cursorBlinkTime = TYPEWRITER_DEFAULT_VALUES.cursorBlinkTime,
  reserveSpace = TYPEWRITER_DEFAULT_VALUES.reserveSpace,
  backwards = TYPEWRITER_DEFAULT_VALUES.backwards,
  typingDelayPerChar,
  typingDelayPerCharVariance = TYPEWRITER_DEFAULT_VALUES.typingDelayPerCharVariance,

  onFinish,
}: TypewriterTextProps) => {
  const flatTextStyle = StyleSheet.flatten([DEFAULT_STYLES.text, textStyle]);
  const { fontSize, lineHeight } = flatTextStyle;
  const textColor = flatTextStyle.color;

  const cursorBlinkAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const [displayedText, setDisplayedText] = useState(!backwards ? '' : text);
  const [charIndex, setCharIndex] = useState(!backwards ? 0 : text.length);
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const cursorOpacity = useState(new Animated.Value(1))[0];

  const speedValue = typingDelayPerChar
    ? typingDelayPerChar
    : SPEED_VALUES[speed];

  const effectiveCharDelay =
    Math.floor(
      Math.random() *
        (speedValue - (speedValue - typingDelayPerCharVariance) + 1)
    ) +
    (speedValue - typingDelayPerCharVariance);

  //handle cursors anim start
  useEffect(() => {
    const startCursorAnimation = () => {
      cursorBlinkAnimation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: cursorBlinkTime,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: cursorBlinkTime,
            useNativeDriver: true,
          }),
        ])
      );
      cursorBlinkAnimation.current.start();
    };

    if (!typingFinished) {
      startCursorAnimation();
    }
  }, [typingFinished]);

  //handle cursor anim stop
  useEffect(() => {
    if (!(typingFinished && hideCursorOnFinish)) {
      return;
    }

    const fadeOut = () => {
      if (cursorBlinkAnimation.current) {
        cursorBlinkAnimation.current.stop();
      }
      Animated.timing(cursorOpacity, {
        toValue: 0,
        duration: cursorBlinkTime,
        useNativeDriver: true,
      }).start();
    };

    const timeout = setTimeout(fadeOut, cursorDisappearDelay);
    return () => clearTimeout(timeout); // Clean up if unmounts
  }, [typingFinished]);

  //handle delay
  useEffect(() => {
    if (!startDelay) {
      return;
    }

    setIsWaiting(true);
    const delayTimeout = setTimeout(() => {
      setIsWaiting(false);
    }, startDelay);
    return () => clearTimeout(delayTimeout);
  }, [startDelay]);

  //handle typing anim
  useEffect(() => {
    if (
      (!backwards && isActive && !isWaiting && charIndex < text.length) ||
      (backwards && isActive && !isWaiting && charIndex > 0)
    ) {
      const typingTimeout = setTimeout(() => {
        if (!backwards) {
          setDisplayedText(text.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else if (backwards) {
          setDisplayedText(text.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }
      }, effectiveCharDelay);

      return () => clearTimeout(typingTimeout);
    } else if (
      (!backwards && charIndex === text.length && !typingFinished) ||
      (backwards && charIndex === 0 && !typingFinished)
    ) {
      setTypingFinished(true);
      if (onFinish) {
        onFinish();
      }
    }
    return;
  }, [charIndex, isActive, isWaiting, backwards]);

  return (
    <View>
      {/* container 1 */}
      <View
        style={[
          {
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          },
          containerStyle,
        ]}
      >
        {/* Opaque, absolute-positioned text component that isn't 
        visible but takes-up space even before the animation runs */}
        {reserveSpace && (
          <View style={{ opacity: 0 }}>
            <Text style={[DEFAULT_STYLES.text, textStyle]}>{text}</Text>
          </View>
        )}
        {/* Animated Text Container */}
        <View
          style={{
            opacity: 1,
            position: reserveSpace ? 'absolute' : 'relative',
            width: '100%',
            height: reserveSpace ? '105%' : 'auto',
          }}
        >
          <Text style={[DEFAULT_STYLES.text, textStyle]}>
            {displayedText}
            {/* cursor element */}
            {!typingFinished || hideCursorOnFinish ? (
              <Animated.View
                style={[
                  {
                    width: fontSize! / 4,
                    height: fontSize,
                    transform: [{ translateX: fontSize! / 3 }],
                    marginBottom:
                      lineHeight! * 2.25 * lineHeight! - lineHeight!,
                    opacity: cursorOpacity,
                    backgroundColor: cursorStyle?.color
                      ? cursorStyle.color
                      : textColor,
                  },
                  cursorStyle,
                ]}
              />
            ) : null}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Typewriter;
