import {Text} from 'react-native';
import textTypeStyle from './textTypeStyle';
import React from 'react';

export default function TextContent(props) {
  const {content, contentStyle} = props;
  const textStyle = [textTypeStyle.label, contentStyle];
  // const text = [onBase, contentStyle];
  return (
    <Text style={textStyle}>
      {content ? content : 'require label text here ...'}
    </Text>
  );
}

const contentttt = 'alalooa';
