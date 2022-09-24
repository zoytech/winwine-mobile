import {FilledButton, UnfilledButtons} from "../buttons";
import {StyleSheet, View} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color} from "../../themes";
import {GameScript} from "../content";
import {HeadlineInfo} from "../headers";
import useCardStyle from "./cardStyles";


export default function GameCards(props) {
    const cardStyle = useCardStyle.gameCard;
    const {
        colorSurfaceVariant = ColorVariant.surfaceVariant,
        ...otherProps
    } = props;
    const {base: cardBase} = Color.light[colorSurfaceVariant];
    const {button, container, content, headline} = cardStyle;
    const containerStyle = [
        {backgroundColor: cardBase},
        container
    ];
    // const displayHeadline = [styles.displayHeadline];
    const displayButtonsStyle = [button];
    const displayContent = [content];

    return (
        <View {...otherProps} style={containerStyle}>
            <View style={displayContent}>
                <GameScript
                    colorVariant={ColorVariant.primary}
                />
            </View>
            <View style={displayButtonsStyle}>
                <FilledButton
                    colorVariant={ColorVariant.primary}
                    content={'Kế tiếp'}
                    message={'Chuyen qua la tiep theo'}
                />
                <UnfilledButtons
                    colorVariant={ColorVariant.primary}
                    colorOutline={ColorVariant.outline}
                    colorSurface={ColorVariant.surface}
                    content={'Lá trước'}
                    message={'Xem lại lá trước đó'}
                />


            </View>
        </View>
    )
}


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

