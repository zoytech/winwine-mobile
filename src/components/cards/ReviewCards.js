import {FilledButton, SmallButtons, UnfilledButtons} from "../buttons";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import {GameScript} from "../content";
import useCardStyle from "./cardStyles";

export default function ReviewCards(props) {
    const cardStyle = useCardStyle.gameCard;
    const {button, container, headline, content} = cardStyle;
    const {
        colorSurfaceVariant = ColorVariant.surfaceVariant,
        colorSurface = ColorVariant.surface,
        colorBorder = ColorVariant.outline,
        ...otherProps
    } = props;
    const textContent = Content;
    const {base: contentBase} = Color.light[colorSurfaceVariant];
    const {base: buttonBase} = Color.light[colorSurface];
    const {base: borderBase} = Color.light[colorBorder];
    const containerStyle = [
        styles.container,
        {
            backgroundColor: contentBase,
            borderColor: borderBase,
        },
        container
    ]

    const displayButtonsStyle = [{backgroundColor: buttonBase}, button];
    const displayContent = [content];

    return (
        <View {...otherProps} style={containerStyle}>
            <View style={displayContent}>
                <GameScript
                    content={textContent}
                    colorVariant={ColorVariant.primary}
                />
            </View>

            <View style={displayButtonsStyle}>
                <FilledButton
                    colorVariant={ColorVariant.primary}
                    content={'Chơi ngay'}
                    message={'Enter to game screen'}
                />
            </View>
        </View>
    )
}

const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào? a a/n" +
    "aff a ffkfaaf" +
    "kalfkl laklf " +
    "afkaj aj" +
    "afjk " +
    "ajfkjk jafjljl";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 23,
        marginTop: 140,
        width: 314,
        height: 386,
    },
})


