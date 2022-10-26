import {Animated} from 'react-native';
import {useEffect, useRef} from 'react';
import {SPLASH_TIME} from 'src/constants';

export default function FadeInView(props) {
  const {style, children, ...otherProps} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SPLASH_TIME,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const fadeAnimStyle = [style, {opacity: fadeAnim}];
  return (
    <Animated.View {...otherProps} style={fadeAnimStyle}>
      {children}
    </Animated.View>
  );
}
