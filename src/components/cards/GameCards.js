import {FilledButton, SmallButtons, UnfilledButtons} from "../buttons";
import {Text, View, StyleSheet} from "react-native";
import {ColorVariant} from "../../themes/color";
import React from "react";
import {Color, Typography} from "../../themes";

export default function GameCards(props) {
    // const {
    //     content,
    //     colorVariant = ColorVariant.primary,
    //     typographyVariant = Typography.title.medium,
    //     ...otherProps
    // } = props;
    // const {container, onContainer} = Color.light[colorVariant];
    const containerStyle = [
        styles.container,
    ]

    return (
        <View style={containerStyle}>
            <View>
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

const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        width: 360,
        height: 480,
        backgroundCard: {
            background: "linear-gradient(0deg, rgba(108, 92, 71, 0.05), rgba(108, 92, 71, 0.05)), #FFFBFF",
        },
        elevationLight: {
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
            borderRadius: 12,
        },
        flex: "none",
        order: 1,
        flexGrow: 0,
    }
})
