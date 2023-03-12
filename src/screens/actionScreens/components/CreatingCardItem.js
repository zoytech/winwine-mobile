import {StyleSheet, Text, View} from 'react-native';
import {FilledCard} from 'src/components';

export default function CreatingCardItem(props) {
  const {
    content,
    id,
    style,
    contentStyle,
    contentContainerStyle,
    upperStyle,
    RemoveButtonComponent,
    ...otherProps
  } = props;

  return (
    <FilledCard style={[styles.container, style]}>
      <View style={[styles.buttonAndIdContainer, upperStyle]}>
        <Text style={contentStyle}>{id}</Text>
        {RemoveButtonComponent}
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        <Text {...otherProps} style={contentStyle}>
          {content}
        </Text>
      </View>
    </FilledCard>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonAndIdContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 8,
  },
  contentStyle: {},
});
