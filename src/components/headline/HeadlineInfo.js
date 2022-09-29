import TextContent from '../content/TextContent';
import {StyleSheet, View} from 'react-native';

function Header(props) {
  const {content, contentStyle} = props;
  return <TextContent content={content} contentStyle={contentStyle} />;
}

function SubHeader(props) {
  const {contentLeft, contentRight, contentStyle} = props;
  return (
    <View style={styles.horizontalLayout}>
      {contentLeft && (
        <TextContent content={contentLeft} contentStyle={contentStyle} />
      )}
      {contentRight && (
        <TextContent content={contentRight} contentStyle={contentStyle} />
      )}
    </View>
  );
}

function HeadlineInfo(props) {
  const {children} = props;
  const textStyle = [styles.text];
  return <View style={textStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  text: {
    flex: 4,
    backgroundColor: 'coral',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 4,
  },
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    width: '100%',
  },
});

export default HeadlineInfo;
export {Header, SubHeader};
