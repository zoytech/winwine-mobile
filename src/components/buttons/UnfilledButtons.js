import {Pressable, Text, StyleSheet, View} from "react-native";
import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import React from "react";
import useButtonStyle, {ButtonVariant} from "./buttonStyle";
import TextItem from "../content/TextItem";
import ButtonStyle from "./buttonStyle";
import ButtonItem from "./ButtonItem";

export default function UnfilledButtons(props) {
    const {
        content,
        message,
        colorText = ColorVariant.primary,
        colorOutline = ColorVariant.outline,
        colorSurface = ColorVariant.surface,
        typography = Typography.label.large,
        children,
        style,
        ...otherProps
    } = props;

    const {base: baseText} = Color.light[colorText];
    const {base: baseOutline} = Color.light[colorOutline];
    const {base: baseBackground} = Color.light[colorSurface];

    const containerStyle = [
        {
            borderColor: baseOutline,
            borderWidth: 1,
            backgroundColor: baseBackground,
        },
        style,
    ];

    const textStyle = [
        {color: baseText},
        typography, style
    ];
    return (
        <ButtonItem
            {...otherProps}
            style={{
                button: containerStyle,
                text: textStyle,
            }}
            content={content}
            message={message}
        />
    )
}

const Contentt = "Play now"

