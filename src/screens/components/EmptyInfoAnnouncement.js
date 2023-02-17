import {StyleSheet, Text, View} from 'react-native';
import {FilledButton} from 'src/components';
import {Color, ColorVariant, Typography} from 'src/themes';
import {WIDTH} from 'src/constants';

export default function EmptyInfoAnnouncement(props) {
  const {title, subTitle, buttonContent, style, onPress = () => {}} = props;
  const {base: backgroundColor, onBase: onBackgroundColor} =
    Color.light[ColorVariant.background];
  const containerStyle = [
    styles.container,
    {backgroundColor: backgroundColor},
    style,
  ];
  const contentStyle = [{color: onBackgroundColor}];

  return (
    <View style={containerStyle}>
      <View style={styles.announcement}>
        <Text style={[Typography.title.large, contentStyle]}>{title}</Text>
      </View>
      {subTitle && (
        <View style={styles.subTitle}>
          <Text style={[Typography.body.medium, contentStyle]}>{subTitle}</Text>
        </View>
      )}
      <View style={styles.action}>
        {buttonContent && buttonContent !== '' && (
          <FilledButton
            content={buttonContent}
            style={styles.button}
            contentStyle={[Typography.label.large, styles.textButton]}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH.SCREEN,
    aspectRatio: 7 / 16,
    alignItems: 'center',
    paddingVertical: 200,
  },
  announcement: {
    width: '100%',
    alignItems: 'center',
  },
  subTitle: {
    width: '100%',
    paddingTop: 16,
  },
  action: {
    width: '100%',
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 45,
  },
  textButton: {
    textTransform: 'uppercase',
  },
});
