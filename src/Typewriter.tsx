import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  type ColorValue,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

type CursorStyle = { color: ColorValue };

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

interface TypewriterTextProps {
  text: string;
  className?: string;
  textStyle?: StyleProp<TextStyle>;
  cursorStyle?: CursorStyle;
  containerStyle?: StyleProp<ViewStyle>;
  speed?: keyof typeof SPEED_VALUES;
  hideCursorOnFinish?: boolean;
  showOverflow?: boolean;
  isActive?: boolean;
  delayMs?: number;
  cursorDisappearDelay?: number; // New: Controls how long cursor stays after text finishes
  cursorBlinkTime?: number;
  onFinish?: () => void;
  reserveSpace?: boolean;
  backwards?: boolean;
  typingDelayVariance?: number;
}

const Typewriter = ({
  text = '',
  textStyle,
  cursorStyle,
  containerStyle,
  speed = 'fast',
  hideCursorOnFinish = true,
  isActive = true,
  delayMs,
  cursorDisappearDelay = 2000, // default: cursor disappears after 2 seconds
  cursorBlinkTime = 200,
  reserveSpace = true, // title it "mode" maybe?
  backwards = false,
  typingDelayVariance = 100,

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

  const typingSpeed =
    Math.floor(
      Math.random() *
        (SPEED_VALUES[speed] - (SPEED_VALUES[speed] - typingDelayVariance) + 1)
    ) +
    (SPEED_VALUES[speed] - typingDelayVariance);

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

  //hamdle cursor anim stop
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
    if (!delayMs) {
      return;
    }

    setIsWaiting(true);
    const delayTimeout = setTimeout(() => {
      setIsWaiting(false);
    }, delayMs);
    return () => clearTimeout(delayTimeout);
  }, [delayMs]);

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
      }, typingSpeed);

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
                style={{
                  width: fontSize! / 4,
                  height: fontSize,
                  transform: [{ translateX: fontSize! / 3 }],
                  marginBottom: lineHeight! * 2.25 * lineHeight! - lineHeight!,
                  opacity: cursorOpacity,
                  backgroundColor: cursorStyle?.color
                    ? cursorStyle.color
                    : textColor,
                }}
              />
            ) : null}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Typewriter;
