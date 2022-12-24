import {StandardIconButton} from 'src/components';
import {TextInputHolder} from './index';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from '../../../../themes';

export default function DescriptionField(props) {
  const {textContainerStyle, buttonContainerStyle, contentStyle} = props;
  const [pressDescription, setPressDescription] = useState(false);
  const onPrimary = Color.light[ColorVariant.primary]?.onBase;

  function handleShowDescriptionField() {
    setPressDescription(!pressDescription);
  }

  function renderDescriptionField() {
    return (
      <TextInputHolder
        style={styles.textHolder}
        multiline={true}
        contentStyle={contentStyle}
        selectTextOnFocus={true}
      />
    );
  }

  function renderButton() {
    return (
      <StandardIconButton
        onPressOut={handleShowDescriptionField}
        content={'Thêm mô tả'}
        name={'caretdown'}
        contentStyle={contentStyle}
        iconStyle={{color: onPrimary}}
        style={styles.button}
      />
    );
  }

  return (
    <>
      <View style={buttonContainerStyle}>{renderButton()}</View>
      {pressDescription && (
        <View style={textContainerStyle}>{renderDescriptionField()}</View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  textHolder: {
    borderWidth: 0.5,
  },
  button: {
    borderRadius: 0,
    width: 180,
    justifyContent: 'space-evenly',
  },
});
