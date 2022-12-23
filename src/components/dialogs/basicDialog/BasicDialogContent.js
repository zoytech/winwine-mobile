import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';
import {Divider, FilledButton, TextButton} from 'src/components';

export default function BasicDialogContent(props) {
  const {
    icon,
    headline,
    supportingText,
    mainAction,
    subAction,
    hasDivider,
    onMainActionPress,
    onSubActionPress,
    style,
    contentStyle,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const secondaryColor = Color.light[ColorVariant.secondary]?.base;
  const onSurfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const containerStyle = [
    styles.container,
    {
      backgroundColor: surface,
      alignItems: icon && 'center',
    },
    style,
  ];
  const headlineStyle = [{color: onSurface}, Typography.headline.small];
  const supportingTextStyle = [
    {color: onSurfaceVarColor},
    Typography.body.large,
  ];
  const actionStyle = [styles.action, {justifyContent: 'flex-end'}];

  const iconProps = {
    name: icon,
    size: 24,
    color: secondaryColor,
  };

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={styles.icon}>{icon && <Icon {...iconProps} />}</View>
      <View style={styles.headline}>
        {headline && <Text style={headlineStyle}>{headline}</Text>}
      </View>
      <View style={styles.supportingText}>
        {supportingText && (
          <Text style={supportingTextStyle}>{supportingText}</Text>
        )}
      </View>
      <View>{hasDivider && <Divider style={styles.divider} />}</View>
      <View style={actionStyle}>
        <TextButton
          content={subAction}
          style={styles.button}
          onPress={onSubActionPress}
        />
        <FilledButton
          content={mainAction}
          style={styles.button}
          onPress={onMainActionPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    width: 312,
    padding: 24,
    flexDirection: 'column',
  },
  icon: {
    paddingBottom: 16,
  },
  headline: {},
  supportingText: {
    paddingTop: 16,
  },
  divider: {
    borderWidth: 1,
  },
  action: {
    width: '100%',
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 6,
  },
});
