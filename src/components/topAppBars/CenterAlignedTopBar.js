import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components/iconButtons';

export default function CenterAlignedTopBar(props) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    trailingIcon,
    onTrailingIconPress = () => {},
    style,
    contentStyle,
    headerTitleStyle,
    children,
    ...otherProps
  } = props;

  const {base: surface, onBase: onSurface} = Color.light[ColorVariant.surface];
  const containerStyle = [styles.container, {backgroundColor: surface}, style];
  const defaultContentStyle = [
    Typography.title.large,
    {color: onSurface},
    contentStyle,
  ];

  function ImagePressable({avatar}) {
    const getPressStyle = ({pressed}) => {
      return pressed
        ? [styles.targetSize, styles.opacityPressed]
        : styles.targetSize;
    };
    return (
      <Pressable style={getPressStyle} onPress={onTrailingIconPress}>
        <Image source={avatar} style={styles.avatarIcon} />
      </Pressable>
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      {leadingIcon && (
        <View style={styles.targetSize}>
          <StandardIconButton
            name={leadingIcon}
            onPress={onLeadingIconPress}
            style={styles.icon}
          />
        </View>
      )}
      <View style={[headerTitleStyle, styles.title]}>
        <Text style={defaultContentStyle}>{content}</Text>
      </View>
      {trailingIcon && <ImagePressable avatar={trailingIcon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 16,
  },
  avatarIcon: {
    borderRadius: 15,
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  opacityPressed: {
    opacity: 0.5,
  },
});

/*
 {trailingLeftIcon && (
          <StandardIconButton
            name={trailingLeftIcon}
            style={styles.trailingIcon}
          />
        )}
        {trailingMiddleIcon && (
          <StandardIconButton
            name={trailingMiddleIcon}
            style={styles.trailingIcon}
          />
        )}
        {trailingRightIcon && (
          <StandardIconButton
            name={trailingRightIcon}
            style={styles.trailingIcon}
          />
        )}
 */
