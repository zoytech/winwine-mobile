import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {CenterAlignedTopBar} from 'src/components';

export default function HeaderShowByScroll(props) {
  const {
    navigation,
    content,
    icon,
    onTrailingIconPress = () => {},
    style,
    contentStyle,
    iconStyle,
    children,
    ...otherProps
  } = props;
  const [headerShown, setHeaderShown] = useState(false);
  const translation = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        const topAppBarProps = {
          transform: [{translateY: translation}],
        };
        return (
          <CenterAlignedTopBar
            {...otherProps}
            content={content}
            headerTitleStyle={styles.headerTitle}
            trailingIcon={icon}
            onTrailingIconPress={onTrailingIconPress}
            style={topAppBarProps}
            onScroll={headerShown}
          />
        );
      },
    });
  }, [navigation]);

  function handleScrolling(event) {
    console.log('event: ', event);
    const scrolling = event.nativeEvent.contentOffset.y;
    if (scrolling < 100) {
      setHeaderShown(true);
    } else {
      setHeaderShown(false);
    }
  }

  const onScrollProps = {
    onScroll: event => handleScrolling(event),
    scrollEventThrottle: 16,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        {...onScrollProps}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.light[ColorVariant.background].base,
  },
  contentContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sectionHeader: {
    justifyContent: 'flex-start',
  },
  headerTitle: {
    justifyContent: 'flex-start',
  },
});
