import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';
import {TextButton} from '../buttons';
import {Divider} from '../divider';

export function BasicDialog(props) {
  const {
    icon,
    headline,
    supportingText,
    leftButton,
    rightButton,
    hasDivider,
    style,
    contentStyle,
    children,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const secondaryColor = Color.light[ColorVariant.surface]?.base;
  const onSurfaceVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;
  const containerStyle = [
    styles.container,
    {
      backgroundColor: 'yellow',
      justifyContent: icon && 'center',
    },
    style,
  ];
  const headlineStyle = [{color: onSurface}, Typography.headline.small];
  const supportingTextStyle = [
    {color: onSurfaceVarColor},
    Typography.body.medium,
  ];

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
      <View style={styles.action}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    minWidth: 280,
    maxWidth: 560,
    padding: 24,
  },
  icon: {
    backgroundColor: 'gold',
  },
  headline: {
    paddingTop: 16,
    backgroundColor: 'coral',
  },
  supportingText: {
    paddingTop: 16,
    backgroundColor: 'green',
  },
  divider: {
    borderWidth: 1,
  },
  action: {
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  button: {
    paddingLeft: 8,
  },
  scrim: {},
});
