import {Text, View, StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import textStyle from "./textStyle";
import useTextStyle from "./textStyle";

export default function TextContent(props) {
    const basicTextStyle = useTextStyle;
    const {
        content,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.title.medium,
        style,
        contentStyle,
        children,
        ...otherProps
    } = props;
    const {onContainer} = Color.light[colorVariant];
    const containerStyle = [styles.container, basicTextStyle.textContainer, style];
    const textStyle = [
        typographyVariant,
        {color: onContainer},
        basicTextStyle.text,
        styles.text,
        style,
    ];

    return (
        <View {...otherProps} style={containerStyle}>
            {content && <Text style={textStyle}>{content}</Text>}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    text: {
        fontWeight: 'normal'
    },

})


/* supporting-text */

//
// width: 328px;
// height: 220px;
//
// /* M3/body/medium */
//
// font-family: 'Poppins';
// font-style: normal;
// font-weight: 600;
// font-size: 14px;
// line-height: 20px;
// /* or 143% */
//
// letter-spacing: 0.25px;
//
// /* M3/sys/light/on-surface-variant */
//
// color: #4A4643;
//
//
// /* Inside auto layout */
//
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;
