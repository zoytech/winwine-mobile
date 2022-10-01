import {View, StyleSheet} from 'react-native';
import {ParagraphContent, TextContent} from '../../content';

export default function SupportingText(props) {
  const {description, descriptionStyle, labelText, labelTextStyle, style} =
    props;
  const containerStyle = [styles.container, style];
  return (
    <View style={containerStyle}>
      {description && (
        <ParagraphContent
          content={description}
          contentStyle={descriptionStyle}
        />
      )}
      {labelText && (
        <TextContent content={labelText} contentStyle={labelTextStyle} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
