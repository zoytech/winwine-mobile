import {FilledButton, SmallButtons, UnfilledButtons} from "../buttons";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";
import {TextContent} from "../content";

export default function GameCards() {
    // const {
    //     content,
    //     colorVariant = ColorVariant.primary,
    //     typographyVariant = Typography.title.medium,
    //     ...otherProps
    // } = props;
    // const {container, onContainer} = Color.light[colorVariant];
    const content = Content;
    const containerStyle = [
        styles.container,
    ]
    const displayButtonsStyle = [styles.displayButton];

    return (
        <View style={containerStyle}>
            <TextContent
                content={Content}
                colorVariant={ColorVariant.primary}
            />
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
    "aff a f" +
    " a af" +
    " afgajfhi2u4 989j 989v8v ajfi ai iahriahijfo  jrijaiji ha h uraiha 4ui88vjrrhairarhhva H Jhc fa kan ka kaj kf kahfk akfhk kh IEU FH" +
    " AKF HJKF H KA" +
    " HAFK " +
    " AIKFJFJGJJJGJGOJJFOJFJOFWJJFJFJFJFJFJFJFJFJFJFJFJFQJOEQDDDKDKDKKDKDKDKDKDKDKDKDKDKD" +
    "DKDKDKDKDKDKDDKDK DKDKDKD" +
    "FKFFKFKFKFKFFK";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginHorizontal: 26,
        marginBottom: 84,
        marginTop: 95,
        height: "75%",
        width: "75%",
        borderRadius: 12,
    },

    displayButton: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-around",

        width: "100%",
        padding: 0,
        backgroundColor: "yellow",
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

