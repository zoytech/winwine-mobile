import {StyleSheet, View} from 'react-native';

export default function Action(props) {
  const {children, style} = props;
  const containerStyle = [style, styles.horizontalDisplay];
  console.log(style);
  return (
    // <View style={style}>
    //   <View style={styles.horizontalDisplay}>{children}</View>
    // </View>
    <View style={containerStyle}>{children}</View>
  );
}

const styles = StyleSheet.create({
  horizontalDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  verticalDisplay: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
});
