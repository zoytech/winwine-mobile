import {Pressable, Text, StyleSheet, View} from "react-native";
import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import React from "react";
import useButtonStyle, {ButtonVariant} from "./buttonStyle";
import TextItem from "../content/TextItem";
import ButtonStyle from "./buttonStyle";

export default function UnfilledButtons(props) {
    const buttonVariant = ButtonVariant.big;
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
    const {container: buttonType, base: textBox, onBase: text} = ButtonStyle[buttonVariant]


    const {base: baseText} = Color.light[colorText];
    const {base: baseOutline} = Color.light[colorOutline];
    const {base: baseBackground} = Color.light[colorSurface];

    const containerStyle = [
        buttonType,
        {
            borderColor: baseOutline,
            borderWidth: 1,
            backgroundColor: baseBackground,
        },
        style,
    ];
    const textContainerStyle = [
        textBox,
    ]
    const textStyle = [
        text,
        {color: baseText},
        typography, style
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
    )
}

const Contentt = "Play now"

