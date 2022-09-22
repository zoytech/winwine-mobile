import {FilledButton, UnfilledButtons} from "../buttons";
import {StyleSheet, View} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color} from "../../themes";
import {ImageContent, TextContent} from "../content";
import {PreviewInfo} from "../headers";

export default function GamePackages(props) {
    const {
        colorSurfaceVariant = ColorVariant.surfaceVariant,
        colorPrimaryVariant = ColorVariant.primary,
        colorOutlineVariant = ColorVariant.outline,

        ...otherProps
    } = props;
    const textContent = Content;
    const {base: cardBase} = Color.light[colorSurfaceVariant]
    const containerStyle = [
        styles.container,
        {backgroundColor: cardBase},
    ]

    const displayButtonsStyle = [styles.displayButton];
    const contentStyle = [styles.displayContent];
    const headerStyle = [styles.displayHeader];
    const buttonStyle = [styles.displayButton];

    return (
        <View {...otherProps} style={containerStyle}>
            <View style={contentStyle}>
                <ImageContent/>
            </View>
            <View style={headerStyle}>
                <PreviewInfo/>
            </View>

            <View style={buttonStyle}>
                <FilledButton
                    colorVariant={ColorVariant.primary}
                    content={'Kế tiếp'}
                    onPress={() => {
                        alert('Chuyển qua lá tiếp theo');
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
        width: 197,
        height: 147,
        borderRadius: 12,
        overflow: "hidden",

        //ratio: 1.64 width, height of card
    },

    displayContent: {
        flex: 3,

    },
    displayHeader: {
        flex: 2,
    },

    displayButton: {
        flex: 1,

        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",

        // width: "100%",
        // padding: 0,

    },
})

//ratio: height/width of preview card = 1.34


