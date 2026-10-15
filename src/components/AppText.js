import { Platform, Text } from 'react-native';

export default function AppText(props) {
  const fontFamily = Platform.select({ ios: 'Avenir Next', android: 'sans-serif', default: 'Aptos, Segoe UI, sans-serif' });
  return <Text {...props} style={[{ fontFamily }, props.style]} />;
}
