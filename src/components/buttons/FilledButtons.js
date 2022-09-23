import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import useButtonStyle from "./buttonStyle";
import TextItem from "../content/TextItem";

export default function FilledButton(props) {
    const buttonStyle = useButtonStyle.big;
    const {
        content,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.label.large,
        children,
        style,
        contentStyle,
        ...otherProps
    } = props;

    const {onBase, base} = Color.light[colorVariant];
    const containerStyle = [{backgroundColor: base}, buttonStyle.buttonContainer, style];
    const textContainerStyle = [buttonStyle.textContainer]
    const textStyle = [
        typographyVariant,
        {color: onBase},
        buttonStyle.text,
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

