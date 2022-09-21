import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {ColorVariant} from 'src/themes/color';
import {Color} from 'src/themes';
import {Typography} from '../../themes';

export default function FilledButton(props) {
    const {
        content,
        colorVariant = ColorVariant.primary,
        typographyVariant = Typography.label.large,
        children,
        style,
        contentStyle,
        ...otherProps
    } = props;

    const {onBase, base} = Color.light[colorVariant];
    const containerStyle = [styles.container, {backgroundColor: base}, style];
    const textStyle = [
        styles.text,
        typographyVariant,
        {color: onBase},
        contentStyle,
    ];

    return (
        <Pressable {...otherProps} style={containerStyle}>
            {content && <Text style={textStyle}>{content}</Text>}
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    text: {},
});
