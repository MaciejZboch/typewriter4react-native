import {
  type ColorValue,
  type DimensionValue,
  View,
  type ViewStyle,
} from 'react-native';
import { ColorValues } from '../constants/colors';

interface DividerLineProps {
  width: DimensionValue;
  weight?: number;
  className?: string;
  viewStyle?: ViewStyle;
  color?: ColorValue;
}
const DividerLine = ({ width, weight, viewStyle, color }: DividerLineProps) => {
  return (
    <View
      style={[
        viewStyle,
        {
          width: '100%',
          height: 0.5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <View
        style={{
          borderWidth: weight ?? 1,
          borderColor: color ?? ColorValues.gray,
          width: width,
          height: 1,
        }}
      ></View>
    </View>
  );
};
export default DividerLine;
