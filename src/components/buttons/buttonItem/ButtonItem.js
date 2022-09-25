import {Pressable} from 'react-native';
import React from 'react';
import ButtonStyle, {ButtonVariant} from './buttonStyle';
import TextItem from '../../content/TextItem';

export default function ButtonItem(props) {
  const buttonVariant = ButtonVariant.big;
  const {style, content, message, ...otherProps} = props;
  const {shape, textArea, text} = ButtonStyle[buttonVariant];
  const containerStyle = [shape, style.button, style];
  const textContainerStyle = [textArea, style.textArea];
  const textStyle = [text, style.text];
  return (
    <Pressable
      {...otherProps}
      style={containerStyle}
      onPress={() => {
        alert(JSON.stringify(message));
      }}>
      {content && (
        <TextItem
          content={content}
          contentStyle={textStyle}
          containerStyle={textContainerStyle}
        />
      )}
    </Pressable>
  );
}


