import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';
import useButtonStyle from "./buttonStyle";

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
            <View style={textContainerStyle}>
                {Contentt && <Text style={textStyle}>{Contentt}</Text>}
                {children}
            </View>
        </Pressable>
    );
}

const Contentt = "Play now"

