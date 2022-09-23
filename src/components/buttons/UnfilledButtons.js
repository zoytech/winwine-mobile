import {Pressable, Text, StyleSheet, View} from "react-native";
import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import React from "react";
import useButtonStyle from "./buttonStyle";

export default function UnfilledButtons(props) {
    const buttonStyle = useButtonStyle.big;
    const {
        colorText = ColorVariant.primary,
        colorOutline = ColorVariant.outline,
        colorSurface = ColorVariant.surface,
        typography = Typography.label.large,
        children,
        content,
        contentStyle,
        style,
        ...otherProps
    } = props;

    const {base: baseText} = Color.light[colorText];
    const {base: baseOutline} = Color.light[colorOutline];
    const {base: baseBackground} = Color.light[colorSurface];

    const containerStyle = [
        buttonStyle.buttonContainer,
        {
            borderColor: baseOutline,
            borderWidth: 1,
            backgroundColor: baseBackground,
        },
        style,
    ];
    const textContainerStyle = [
        buttonStyle.textContainer,
    ]
    const textStyle = [
        buttonStyle.text,
        {color: baseText},
        typography, style
    ];
    return (
        <Pressable {...otherProps} style={containerStyle}>
            <View style={textContainerStyle}>
                {Contentt && <Text style={textStyle}>{Contentt}</Text>}
                {children}
            </View>
        </Pressable>
    )
}

const Contentt = "Play now"

