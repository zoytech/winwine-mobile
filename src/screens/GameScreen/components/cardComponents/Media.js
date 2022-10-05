import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function Media(props) {
  const {source, style} = props;
  const containerStyle = [styles.container, style];
  return (
    <TouchableOpacity style={containerStyle}>
      {source && <Image source={source} style={styles.image} />}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1,
  },
});
