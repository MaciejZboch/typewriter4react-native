import { View, StyleSheet, Text } from 'react-native';
import { Typewriter } from 'typewriter4react-native';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Typewriter
    //     text="lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet dolor dolor dolor sit ame tttt frak frak frake nn"
    //     textStyle={{ fontSize: 28 }}
    //     cursorBlinkTime={300}
    //     startDelay={4}
    //     typingDelayPerChar={200}
    //   />
    //   <View
    //     style={{
    //       width: 150,
    //       height: 150,
    //       backgroundColor: 'blue',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Text>I am some element</Text>
    //   </View>
    //   <View
    //     style={{
    //       width: 150,
    //       height: 150,
    //       backgroundColor: 'red',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Text>I am some other element</Text>
    //   </View>
    // </View>

    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '80%',
          height: '50%',
          borderColor: 'green',
          borderWidth: 1,
        }}
      >
        <Typewriter
          isActive
          textStyle={{
            fontSize: 30,
            fontFamily: 'Academy Engraved LET',
          }}
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          elementum nunc sit amet urna suscipit tempus. Aenean nisi libero,
          condimentum eget cursus eget, lobortis eget ligula. Nunc ac ex et
          ipsum efficitur maximus euismod eget nulla. Curabitur gravida arcu
          commodo arcu ultricies, quis rutrum odio pulvinar. Integer pharetra
         In laoreet sagittis leo quis elementum. Ut id
          massa blandit, auctor tortor ut, tempor dolor. In hac habitasse platea
          dictumst.`}
          reserveSpace
        />
      </View>
      <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
      <View style={{ width: 20, height: 20, backgroundColor: 'blue' }} />
      <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />
      <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
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
