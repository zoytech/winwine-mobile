import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
    FilledButton,
    GameScript,
    UnfilledButtons,
    GameCards,
    ReviewCards,
    HeadlineInfo,
    SmallButtons, GamePackages, EndGameCard
} from '../../components';

import {ColorVariant} from '../../themes/color';
import {Color} from "../../themes";
import PreviewInfo from "../../components/headers/PreviewInfo";

export default function HomeScreen() {
    const {base} = Color.light[ColorVariant.surface];
    const screenStyle = [styles.container, {backgroundColor: base}];
    // const labelSelectionStyle = [styles.labelSelection]
    // const title1Style = [styles.title1]
    // const stackCardsRowStyle = [styles.stackCardsRow]
    // const title2Style = [styles.title2]
    // const screenView = [styles.screenView]
    // const stackCardsColumnStyle = [styles.stackCardsScroll]

    return (
        <SafeAreaView style={screenStyle}>
            {/*<View style={screenView}>*/}
            {/*    <View style={labelSelectionStyle}></View>*/}
            {/*    <View style={title1Style}></View>*/}
            {/*    <View style={stackCardsRowStyle}></View>*/}
            {/*    <View style={title2Style}></View>*/}
            {/*</View>*/}
            {/*<ScrollView style={stackCardsColumnStyle}>*/}
            {/*</ScrollView>*/}
            <EndGameCard/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    // screenView: {
    //     display: 'flex',
    //     flex: 1
    // },
    // labelSelection: {
    //     flex: 2,
    //     backgroundColor: 'blue',
    // },
    // title1: {
    //     flex: 1,
    //     backgroundColor: 'deeppink',
    //
    // },
    // stackCardsRow: {
    //     flex: 4,
    //     backgroundColor: 'chocolate',
    //
    // },
    // title2: {
    //     flex: 1,
    //     backgroundColor: 'green',
    //
    //
    // },
    // stackCardsScroll: {
    //     flex: 1,
    //     backgroundColor: 'black',
    //
    // }
});


// const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";

