import {StyleSheet, View} from 'react-native';
import {TextContent} from '../../content';

function Title(props) {
  const {content, contentStyle} = props;
  return <TextContent content={content} contentStyle={contentStyle.heading} />;
}

function SubTitle(props) {
  const {contentLeft, contentRight, contentStyle} = props;
  return (
    <View style={styles.subHeading}>
      {contentLeft && (
        <TextContent content={contentLeft} contentStyle={contentStyle} />
      )}
      {contentRight && (
        <TextContent content={contentRight} contentStyle={contentStyle} />
      )}
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
