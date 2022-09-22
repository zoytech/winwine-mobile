import {FilledButton, SmallButtons, UnfilledButtons} from "../buttons";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import {TextContent} from "../content";

export default function ReviewCards(props) {
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
            borderColor: borderBase
        },
    ]

    const displayButtonsStyle = [styles.displayButton, {backgroundColor: buttonBase}];
    const displayContent = [styles.displayContent];

    return (
        <View {...otherProps} style={containerStyle}>
            <View style={displayContent}>
                <TextContent
                    content={textContent}
                    colorVariant={ColorVariant.primary}
                />
            </View>

            <View style={displayButtonsStyle}>
                <FilledButton
                    colorVariant={ColorVariant.primary}
                    content={'Chơi ngay'}
                    onPress={() => {
                        alert('Enter to game screen');
                    }}
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
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginHorizontal: 26,
        // marginTop: 140,
        width: 314,
        height: 394,
        borderRadius: 12,
        borderWidth: 0.5,
        overflow: "hidden",
    },

    displayContent: {
        flex: 5,
        marginVertical: 10,
        marginHorizontal: 40,
    },

    displayButton: {
        flex: 1,

        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",

        width: "100%",
        paddingVertical: 10,
    },
    button: {}
})


