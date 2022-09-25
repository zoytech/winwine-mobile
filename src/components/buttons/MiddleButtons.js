import {Color, Typography} from "../../themes";
import {ColorVariant} from "../../themes/color";
import ButtonItem from "./buttonItem/ButtonItem";
import {StyleSheet} from "react-native";

export default function SmallButtons(props) {
    const {
        content,
        message,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.body.medium,
        children,
        style,
        contentStyle,
        ...otherProps
    } = props;

    const {onBase, base} = Color.light[colorVariant];

    const containerStyle = [
        styles.shape,
        {backgroundColor: base},
        style
    ];
    const textStyle = [
        typographyVariant,
        contentStyle,
        {color: onBase}
    ]

    return (
        <ButtonItem
            {...otherProps}
            content={content}
            style={{
                text: textStyle,
                button: containerStyle,
            }}
            message={message}
        />
    )
}

const styles = StyleSheet.create({
    shape: {
        paddingVertical: 4,
        paddingHorizontal: 10,

        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',

        minWidth: 80,
        minHeight: 30,
    }
})

const Contentt = 'Play';
