import {StyleSheet, Text, View} from 'react-native';

function Title(props) {
  const {content, contentStyle} = props;
  return <Text style={contentStyle}>{content}</Text>;
}

function SubTitle(props) {
  const {contentLeft, contentRight, contentStyle} = props;
  return (
    <View style={styles.subHeading}>
      {contentLeft && <Text style={contentStyle}>{contentLeft}</Text>}
      {contentRight && <Text style={contentStyle}>{contentRight}</Text>}
    </View>
  );
}

function Headline(props) {
  const {children, style} = props;
  const containerStyle = [styles.container, style];
  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading: {
    backgroundColor: 'blue',
  },
  subHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export {Title, SubTitle};
export default Headline;
