import {StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import useTextStyle, {TextContentVariant} from "./textStyle";
import TextItem from "./TextItem";
import TextContent from "./textStyle";

export default function GameScript(props) {
    const textVariant = TextContentVariant.paragraph;
    const {
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.title.medium,
        style,
        contentStyle,
        children,
        ...otherProps
    } = props;
    const {base, onBase} = TextContent[textVariant];
    const content = Content;
    const {onContainer} = Color.light[colorVariant];

    const containerStyle = [base, style];
    const textStyle = [typographyVariant, {color: onContainer}, onBase, style];

    return (
        <TextItem
            {...otherProps}
            containerStyle={containerStyle}
            contentStyle={textStyle}
            content={content}
        />
    )
}

const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào? a a/n" + "aff a ffkfaaf" + "kalfkl laklf " + "afkaj aj" + "afjk " + "ajfkjk jafjljl";


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
