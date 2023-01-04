import {StatusBar} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function CustomStatusBar() {
  const primaryColor = Color.light[ColorVariant.primary]?.base;
  return (
    <StatusBar barStyle={'light-content'} backgroundColor={primaryColor} />
  );
}
