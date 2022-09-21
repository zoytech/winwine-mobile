import {Text, View, StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";

export default function TextContent(props) {
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
    const containerStyle = [styles.container, style];
    const textStyle = [
        typographyVariant,
        {color: onContainer},
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
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 8,
        width: 360,
        height: 252,

        // flex: "none",
        // order: 1,
        // alignSelf: "stretch",
        // flexGrow: 0,
    },
    text: {
        flex: 1,
        flexWrap: "wrap",
        width: 328,
        height: 220,
        lineHeight: 20,
        letterSpacing: 0.25,
        //
        // flex: "none",
        // order: 1,
        // alignSelf: "stretch",
        // flexGrow: 0,
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
