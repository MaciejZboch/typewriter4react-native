import { View, Text, TouchableOpacity } from 'react-native';
import { Typewriter, type TypewriterTextProps } from 'typewriter4react-native';
import { ColorValues } from '../constants/colors';

const ExampleBox = ({
  title,
  description,
  isActive,
  typewriterProps,
  onButtonPress,
}: {
  title: string;
  description?: string;
  isActive: boolean;
  typewriterProps: TypewriterTextProps;
  onButtonPress: () => void;
}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'left',
            justifyContent: 'flex-start',
            width: '100%',
            paddingVertical: 12,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          borderTopWidth: 0.2,
          borderBottomWidth: 0.2,
          paddingTop: 2,
          paddingBottom: 16,
        }}
      >
        <View style={{ position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: typewriterProps.reserveSpace ? '40%' : '33%',
              height: 40,
              zIndex: 20,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: !isActive ? 1 : 0,
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 300,
                paddingHorizontal: '20%',
                color: ColorValues.offBlack,
              }}
            >
              To see the effect, press the button below.
            </Text>
          </View>
          <View
            style={{
              opacity: isActive ? 1 : 0,
              width: '100%',
              paddingVertical: 24,
            }}
          >
            <Typewriter isActive={isActive} {...typewriterProps} />
          </View>
        </View>
      </View>
      {/* Description */}
      {description && (
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              width: '100%',
              fontSize: 14,
              color: ColorValues.gray,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        </View>
      )}
      {/* Button */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: !isActive
              ? ColorValues.orange
              : ColorValues.lighGray,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
          }}
          onPress={() => {
            onButtonPress();
          }}
          disabled={isActive}
        >
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: 'white',
            }}
          >
            {!isActive ? 'Try it!' : 'See results above :)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExampleBox;
