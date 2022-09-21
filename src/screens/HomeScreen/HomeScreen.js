import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {FilledButton, TextContent, UnfilledButtons, GameCards} from '../../components';

import {ColorVariant} from '../../themes/color';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <GameCards/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,


    },
});

// const Content = "Bạn đã bao giờ yêu cùng lúc hai người chưa? Lúc đó câu chuyện diễn tiến thế nào?";

