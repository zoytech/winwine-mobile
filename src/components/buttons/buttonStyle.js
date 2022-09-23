import {StyleSheet} from "react-native";
import React from "react";
import useTextStyle, {TextContentVariant} from "../content/textStyle";
import TextContent from "../content/textStyle";

const textContentVariant = TextContentVariant.short;
const {base, onBase} = TextContent[textContentVariant]
const ButtonVariant = {
    big: 'big',
    small: 'small',
}


const ButtonStyle = {
    [ButtonVariant.big]: {
        container: {
            minWidth: 110,
            minHeight: 40,
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 20,

            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
        base: {
            ...base,
            alignSelf: 'center'
        },
        onBase: {
            ...onBase,
            textTransform: 'uppercase'
        },
    },
    [ButtonVariant.small]: {
        container: {
            // maxWidth: 135,
            // maxHeight: 35,

            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 10,


            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',

            minWidth: 80,
            minHeight: 30,
        },
        base: {
            ...base,
            alignSelf: 'center'
        },
        onBase: {
            ...onBase,
            textTransform: 'uppercase'
        },
    },


}


export default ButtonStyle;
export {ButtonVariant}


