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
  cursorType = TYPEWRITER_DEFAULT_VALUES.cursorType,
  cursorTextSimpleCustomChar,
  disableCursor = TYPEWRITER_DEFAULT_VALUES.disableCursor,
  pause,
  onFinish,
}: TypewriterTextProps) => {
  //constants
  const speedValue: number = typingDelayPerChar
    ? typingDelayPerChar
    : SPEED_VALUES[speed as keyof typeof SPEED_VALUES];

  const effectiveCharDelay =
    Math.floor(
      Math.random() *
        (speedValue - (speedValue - typingDelayPerCharVariance) + 1)
    ) +
    (speedValue - typingDelayPerCharVariance);

  //styles
  const flatTextStyle = StyleSheet.flatten([DEFAULT_STYLES.text, textStyle]);

  //animation refs
  const cursorBlinkAnimation = useRef<Animated.CompositeAnimation | null>(null);

  //local state
  const [displayedText, setDisplayedText] = useState(!backwards ? '' : text);
  const [charIndex, setCharIndex] = useState(!backwards ? 0 : text.length);
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);

  const minCursorOpacity = Number(cursorStyle?.minOpacity ?? 0);
  const maxCursorOpacity = Number(cursorStyle?.maxOpacity ?? 1);
  const cursorOpacity = useState(new Animated.Value(minCursorOpacity))[0];

  //handle cursors anim start
  useEffect(() => {
    const startCursorAnimation = () => {
      cursorBlinkAnimation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: maxCursorOpacity,
            duration: cursorBlinkTime,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: minCursorOpacity,
            duration: cursorBlinkTime,
            useNativeDriver: true,
          }),
        ])
      );
      cursorBlinkAnimation.current.start();
    };

    if (!typingFinished && !disableCursor && isActive) {
      startCursorAnimation();
    }
  }, [isActive, typingFinished, disableCursor]);

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
  }, [typingFinished, hideCursorOnFinish]);

  //handle delay
  useEffect(() => {
    if (!startDelay) {
      setIsWaiting(false);
      return;
    }
    // only activate the timer when the component isActive
    if (isActive) {
      setIsWaiting(true);
      const delayTimeout = setTimeout(() => {
        setIsWaiting(false);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startDelay, isActive]);

  //handle typing anim
  useEffect(() => {
    if (
      // if backwardsMode is off and there is still text to print and there is no pause
      (!backwards &&
        isActive &&
        !isWaiting &&
        charIndex < text.length &&
        !pause) || // same as above but for backwardsMode
      (backwards && isActive && !isWaiting && charIndex > 0 && !pause)
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
  }, [charIndex, isActive, isWaiting, backwards, pause]);

  return (
    <View>
      {/* container 1 */}
      <View
        style={[
          {
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
            {!disableCursor && (
              <>
                {!typingFinished || !hideCursorOnFinish ? (
                  cursorType === 'view' ? (
                    <Animated.View
                      style={[
                        {
                          height: flatTextStyle.fontSize! * 0.6, // height size lowered for the cursor to not interfere with line height despite position relative
                          width: flatTextStyle.fontSize! * 0.1,
                          transform: [
                            { translateX: flatTextStyle.fontSize! / 3 }, // place it ahead of the text
                            { scale: 1.75 }, // make it look larger to make-up for the diminished height
                          ],
                          opacity: cursorOpacity,
                          backgroundColor: cursorStyle?.color
                            ? cursorStyle.color
                            : textStyle
                              ? flatTextStyle.color
                              : 'black',
                        },
                        cursorStyle,
                      ]}
                    />
                  ) : (
                    <Animated.Text
                      style={[
                        {
                          fontSize: flatTextStyle.fontSize!,
                          fontWeight: 600,
                          opacity: cursorOpacity,
                          color: cursorStyle?.color
                            ? cursorStyle.color
                            : 'black',
                        },
                        cursorStyle,
                      ]}
                    >
                      {cursorTextSimpleCustomChar ?? '|'}
                    </Animated.Text>
                  )
                ) : null}
              </>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Typewriter;
