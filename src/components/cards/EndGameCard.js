import {FilledButton, UnfilledButtons} from "../buttons";
import {StyleSheet, View} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color} from "../../themes";
import {TextContent} from "../content";

export default function EndGameCard(props) {
    const {
        colorSurfaceVariant = ColorVariant.surfaceVariant,
        ...otherProps
    } = props;
    const textContent = Content;
    const {base: cardBase} = Color.light[colorSurfaceVariant]
    const containerStyle = [
        styles.container,
        {backgroundColor: cardBase},
    ]

    const displayButtonsStyle = [styles.displayButton];
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
                    content={'Kế tiếp'}
                    onPress={() => {
                        alert('Chuyển qua lá tiếp theo');
                    }}
                />
                <UnfilledButtons
                    colorVariant={ColorVariant.primary}
                    colorOutline={ColorVariant.outline}
                    colorSurface={ColorVariant.surface}
                    content={'Lá trước'}
                    onPress={() => {
                        alert('Xem lại lá trước đó')
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
        marginBottom: 84,
        marginTop: 95,

        width: 274,
        height: 450,
        borderRadius: 12,
        overflow: "hidden",

        //ratio: 1.64 width, height of card
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
        padding: 0,

    },
})

// backgroundCard: {
//     background: "linear-gradient(0deg, rgba(108, 92, 71, 0.05), rgba(108, 92, 71, 0.05)), #FFFBFF",
// },
// elevationLight: {
//     boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
//     borderRadius: 12,
// },
// flex: "none",
// order: 1,
// flexGrow: 0,


//        width: Dimensions.get('window').width,

