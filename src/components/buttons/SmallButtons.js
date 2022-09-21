import {Color, Typography} from "../../themes";
import {Pressable, Text, StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";

export default function SmallButtons(props) {
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
    const containerStyle = [styles.container, {backgroundColor: base}, style];
    const textStyle = [
        styles.text,
        typographyVariant,
        contentStyle,
        {color: onBase}
    ]

    return (
        <Pressable {...otherProps} style={containerStyle}>
            {content && <Text style={textStyle}>{content}</Text>}
            {children}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: 46,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    text: {}
})
