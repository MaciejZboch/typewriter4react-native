import { useEffect, useState } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { Typewriter } from 'typewriter4react-native';

const { width, height } = Dimensions.get('window');

export default function AfricaExampleScreen() {
  const [currentTypewriterNum, setCurrentTypewriterNum] = useState(0);
  const [stars] = useState(() =>
    Array.from({ length: 25 }, () => ({
      left: Math.random() * width,
      top: new Animated.Value(Math.random() * height),
      size: Math.random() * 3 + 2,
      opacity: new Animated.Value(Math.random()),
      speed: 10000 + Math.random() * 8000, // ms per fall
    }))
  );

  useEffect(() => {
    stars.forEach((star) => {
      // ⭐ Twinkle (opacity animation can use native driver)
      const twinkle = () => {
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 1,
            duration: 1500 + Math.random() * 2000,
            useNativeDriver: false, // ✅ opacity is supported
          }),
          Animated.timing(star.opacity, {
            toValue: 0.2,
            duration: 1500 + Math.random() * 2000,
            useNativeDriver: false,
          }),
        ]).start(twinkle);
      };
      twinkle();

      const move = () => {
        star.top.setValue(0);
        Animated.timing(star.top, {
          toValue: height,
          duration: star.speed,
          useNativeDriver: false,
        }).start(move);
      };
      move();
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#090B3B' }}>
      {/* Animated stars */}
      {stars.map((star, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: 'white',
            left: star.left,
            top: star.top,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Typewriter Text */}
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Typewriter
          isActive={currentTypewriterNum === 0}
          speed="slow"
          containerStyle={{ width: 250 }}
          textStyle={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: '600',
            color: '#ffffff',
            textShadowColor: 'rgba(255,255,255,0.7)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 6,
            letterSpacing: 1,
          }}
          text="I hear the drums echoing tonight"
          onFinish={() => setCurrentTypewriterNum(1)}
        />
        <Typewriter
          startDelay={1000}
          containerStyle={{ width: 300, marginVertical: 40 }}
          isActive={currentTypewriterNum === 1}
          textStyle={{
            textAlign: 'justify',
            fontSize: 16,
            fontWeight: '500',
            color: '#a3d5ff',
            textShadowColor: 'rgba(163, 213, 255, 0.8)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 8,
            fontStyle: 'italic',
          }}
          text="but she hears only whispers of some quiet"
          onFinish={() => setCurrentTypewriterNum(2)}
        />
        <Typewriter
          isActive={currentTypewriterNum === 2}
          containerStyle={{ width: 300, marginVertical: 20 }}
          textStyle={{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: '700',
            color: '#ffd1ff',
            textShadowColor: 'rgba(255, 209, 255, 0.8)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            letterSpacing: 2,
          }}
          text="conversaaaation"
          onFinish={() => setCurrentTypewriterNum(3)}
        />
        <Typewriter
          isActive={currentTypewriterNum === 3}
          containerStyle={{ width: 300, marginVertical: 20 }}
          startDelay={4000}
          textStyle={{
            textAlign: 'left',
            fontSize: 30,
            fontWeight: '700',
            color: '#ffd1ff',
            textShadowColor: 'rgba(255, 209, 255, 0.8)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            letterSpacing: 2,
          }}
          text="(bam da da da dum"
          onFinish={() => setCurrentTypewriterNum(4)}
        />
        <Typewriter
          isActive={currentTypewriterNum === 4}
          containerStyle={{ width: 300, marginVertical: 30 }}
          textStyle={{
            textAlign: 'right',
            fontSize: 30,
            fontWeight: '700',
            color: '#ffd1ff',
            textShadowColor: 'rgba(255, 209, 255, 0.8)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            letterSpacing: 2,
          }}
          text="da dam)"
        />
      </View>
    </View>
  );
}
