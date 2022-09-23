import {Color, Typography} from "../../themes";
import {Pressable, Text, StyleSheet, View} from "react-native";
import {ColorVariant} from "../../themes/color";
import useButtonStyle from "./buttonStyle";

export default function SmallButtons(props) {
    const buttonStyle = useButtonStyle.small;
    const {
        content,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.body.medium,
        children,
        style,
        contentStyle,
        ...otherProps
    } = props;
    const {onBase, base} = Color.light[colorVariant];
    const containerStyle = [
        buttonStyle.buttonContainer,
        {backgroundColor: base},
        style
    ];
    const textContainerStyle = [buttonStyle.textContainer]
    const textStyle = [
        buttonStyle.text,
        typographyVariant,
        contentStyle,
        {color: onBase}
    ]

    return (
        <Pressable {...otherProps} style={containerStyle}>
            <View style={textContainerStyle}>
                {Contentt && <Text style={textStyle}>{Contentt}</Text>}
                {children}
            </View>
        </Pressable>
    )
}

const Contentt = 'Play';
