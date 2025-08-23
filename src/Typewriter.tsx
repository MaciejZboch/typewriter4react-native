import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { TypewriterTextProps } from './types';
import {
  DEFAULT_STYLES,
  SPEED_VALUES,
  TYPEWRITER_DEFAULT_VALUES,
} from './constants';

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
  cursorType = 'view',

  onFinish,
}: TypewriterTextProps) => {
  const flatTextStyle = StyleSheet.flatten([DEFAULT_STYLES.text, textStyle]);
  const { fontSize } = flatTextStyle;

  const cursorBlinkAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const [displayedText, setDisplayedText] = useState(!backwards ? '' : text);
  const [charIndex, setCharIndex] = useState(!backwards ? 0 : text.length);
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const cursorOpacity = useState(new Animated.Value(1))[0];

  const speedValue: number = typingDelayPerChar
    ? typingDelayPerChar
    : SPEED_VALUES[speed as keyof typeof SPEED_VALUES];

  const effectiveCharDelay =
    Math.floor(
      Math.random() *
        (speedValue - (speedValue - typingDelayPerCharVariance) + 1)
    ) +
    (speedValue - typingDelayPerCharVariance);

  //handle cursors anim start
  useEffect(() => {
    const startCursorAnimation = () => {
      const minOpacity = Number(cursorStyle?.minOpacity ?? 0);
      const maxOpacity = Number(cursorStyle?.maxOpacity ?? 1);

      cursorBlinkAnimation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: minOpacity,
            duration: cursorBlinkTime,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: maxOpacity,
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

    const effectiveCursorDisappearDelay =
      cursorType === 'view' ? cursorDisappearDelay : 0;

    const timeout = setTimeout(fadeOut, effectiveCursorDisappearDelay);
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
            // width: '100%',
            // height: '100%',
            flexDirection: 'row',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          containerStyle,
        ]}
      >
        {/* Opaque, absolute-positioned text component that isn't 
        visible but takes-up space even before the animation runs */}
        {reserveSpace && (
          <View
            style={{
              opacity: 0,
              width: '100%',
              height: reserveSpace ? '101%' : 'auto',
            }}
          >
            <Text style={[DEFAULT_STYLES.text, textStyle]}>{text}</Text>
          </View>
        )}
        {/* Animated Text Container */}
        <View
          style={{
            opacity: 1,
            position: reserveSpace ? 'absolute' : 'relative',
            width: '100%',
            height: reserveSpace ? '101%' : 'auto',
            flexShrink: 1,
          }}
        >
          <Text style={[DEFAULT_STYLES.text, textStyle]}>
            {displayedText}
            {/* cursor element */}
            {!typingFinished || hideCursorOnFinish ? (
              cursorType === 'view' ? (
                <Animated.View
                  style={[
                    {
                      height: fontSize! * 0.6, // height size lowered for the cursor to not interfere with line height despite position relative
                      width: fontSize! * 0.1,
                      transform: [
                        { translateX: fontSize! / 3 }, // place it ahead of the text
                        { scale: 1.75 }, // make it look larger to make-up for the diminished height
                      ],
                      opacity: cursorOpacity,
                      backgroundColor: cursorStyle?.color
                        ? cursorStyle.color
                        : 'black',
                    },
                    cursorStyle,
                  ]}
                />
              ) : (
                <Animated.Text
                  style={[
                    {
                      fontSize: fontSize!,
                      fontWeight: 600,
                      opacity: cursorOpacity,
                      color: cursorStyle?.color ? cursorStyle.color : 'black',
                    },
                    cursorStyle,
                  ]}
                >
                  {'|'}
                </Animated.Text>
              )
            ) : null}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Typewriter;
