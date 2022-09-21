import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FilledButton, TextContent, UnfilledButtons} from '../../components';

import {ColorVariant} from '../../themes/color';
import GameCards from "../../components/cards/GameCards";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/*<TextContent*/}
            {/*    content="Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?"*/}
            {/*    colorVariant={ColorVariant.primary}*/}
            {/*/>*/}
            <GameCards/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});

const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";

