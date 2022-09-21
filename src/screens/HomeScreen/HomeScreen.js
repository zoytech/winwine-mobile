import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {FilledButton, SmallButtons, UnfilledButtons} from '../../components';

import {ColorVariant} from '../../themes/color';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <FilledButton
                colorVariant={ColorVariant.primary}
                content={'test'}
                onPress={() => {
                    alert('Test');
                }}
            />
            <SmallButtons
                colorVariant={ColorVariant.primary}
                content={'Chơi ngay'}
                onPress={() => {
                    alert('Navigate to challenge packages')
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
