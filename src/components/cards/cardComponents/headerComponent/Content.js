import {StyleSheet, View} from 'react-native';
import {TextContent} from '../../../content';

function Heading(props) {
  const {content, contentStyle} = props;
  const contentStyles = [contentStyle.heading, contentStyle];
  return <TextContent content={content} contentStyle={contentStyles} />;
}

function SubHeading(props) {
  const {contentLeft, contentRight, contentStyle} = props;
  const contentStyles = [contentStyle.heading, contentStyle];
  return (
    <View style={styles.subHeading}>
      {contentLeft && (
        <TextContent content={contentLeft} contentStyle={contentStyles} />
      )}
      {contentRight && (
        <TextContent content={contentRight} contentStyle={contentStyles} />
      )}
    </View>
  );
}

function Content(props) {
  const {children, style} = props;
  const containerStyle = [styles.container, style];
  console.log('inside content', children);
  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 4,
  },
  heading: {},
  subHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export {Heading, SubHeading};
export default Content;
