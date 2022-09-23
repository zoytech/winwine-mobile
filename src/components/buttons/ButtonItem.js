import React from 'react';
import {Text, StyleSheet, Pressable, View, Button} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import TextItem from "../content/TextItem";
import ButtonStyle, {ButtonVariant} from "./buttonStyle";

export default function FilledButton(props) {
    const buttonVariant = ButtonVariant.big;
    const {
        content,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.label.large,
        children,
        style,
        contentStyle,
        ...otherProps
    } = props;

    const {container: buttonType, base: textBox, onBase: text} = ButtonStyle[buttonVariant]
    const {onBase, base} = Color.light[colorVariant];
    const containerStyle = [{backgroundColor: base}, buttonType, style];
    const textContainerStyle = [textBox]
    const textStyle = [
        typographyVariant,
        {color: onBase},
        text,
        contentStyle,
    ];

    return (
        <Pressable {...otherProps} style={containerStyle}>
            {content &&
                <TextItem
                    content={content}
                    contentStyle={textStyle}
                    containerStyle={textContainerStyle}
                />
            }
        </Pressable>
    );
}

const Contentt = "Play now"

