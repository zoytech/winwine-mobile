import {Text, View, StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import textStyle from "./textStyle";
import useTextStyle from "./textStyle";
import TextItem from "./TextItem";

export default function GameScript(props) {
    const basicTextStyle = useTextStyle;
    const {
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.title.medium,
        style,
        contentStyle,
        children,
        ...otherProps
    } = props;
    const content = Content;
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
        <View>
            {content &&
                <TextItem
                    {...otherProps}
                    containerStyle={containerStyle}
                    contentStyle={textStyle}
                    content={content}
                />
            }
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    text: {
        fontWeight: 'normal'
    },

});
const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào? a a/n" +
    "aff a ffkfaaf" +
    "kalfkl laklf " +
    "afkaj aj" +
    "afjk " +
    "ajfkjk jafjljl";


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
