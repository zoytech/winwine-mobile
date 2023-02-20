import {StyleSheet} from 'react-native';
import {StandardIconToggle} from 'src/components';
import {useState} from 'react';

export default function ActionItem(props) {
  const {
    content,
    name,
    selectedName,
    size,
    style,
    iconStyle,
    contentStyle,
    ...otherProps
  } = props;

  const containerStyle = [styles.container, style];
  const iconProps = {
    style: [styles.iconStyle, iconStyle],
    size: 30,
  };

  return (
    <StandardIconToggle
      {...otherProps}
      style={containerStyle}
      content={content}
      name={name}
      selectedName={selectedName}
      iconStyle={iconProps}
      contentStyle={contentStyle}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 0,
  },
  iconStyle: {
    paddingLeft: 16,
    paddingRight: 24,
  },
});
