import { View, StyleSheet, Text } from 'react-native';
import { Typewriter } from 'typewriter4react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Typewriter
        text="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet dolor dolor dolor sit ame tttt frak frak frake nn"
        // textStyle={{ fontSize: 28 }}
        cursorBlinkTime={300}
        startDelay={4}
        typingDelayPerChar={200}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>I am some element</Text>
      </View>
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>I am some other element</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
