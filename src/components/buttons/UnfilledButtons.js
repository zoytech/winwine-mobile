import {Pressable, Text, StyleSheet} from "react-native";
import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";

export default function UnfilledButtons(props) {
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
    const containerStyle = [styles.container, {borderColor: baseOutline}, {backgroundColor: baseBackground}, style];
    const textStyle = [styles.text, {color: baseText}, typography, style];
    return (
        <Pressable {...otherProps} style={containerStyle}>
            {content && <Text style={textStyle}>{content}</Text>}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    text: {
        textTransform: "uppercase",
    }
})
