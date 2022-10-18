import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

export default function PressableImage(props) {
  const {content, uri, style, children, ...otherProps} = props;

  function getContainerStyle({pressed}) {
    return [styles.container, {opacity: pressed ? 0.7 : 1}, style];
  }

  return (
    <Pressable {...otherProps} style={getContainerStyle}>
      <Image source={{uri: uri}} style={styles.media} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
});
