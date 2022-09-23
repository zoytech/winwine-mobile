import {FilledButton, SmallButtons, UnfilledButtons} from "../buttons";
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
                <SmallButtons
                    colorVariant={ColorVariant.primary}
                    content={'Play'}
                    onPress={() => {
                        alert('Chuyển qua lá tiếp theo');
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        width: 147,
        height: 197,
        borderRadius: 12,
        overflow: "hidden",
    },

    displayContent: {
        flex: 6,

    },
    displayHeader: {
        flex: 3,
    },

    displayButton: {
        flex: 2,
        margin: 6,
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

//ratio: height/width of preview card = 1.34


