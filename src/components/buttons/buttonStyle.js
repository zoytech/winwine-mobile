import {StyleSheet} from "react-native";
import React from "react";
import useTextStyle from "../content/textStyle";

const text = useTextStyle.text;
const textContainer = useTextStyle.textContainer;
const ButtonVariant = {
    big: 'big',
    small: 'small',
}


const useButtonStyle = {
    [ButtonVariant.big]: {
        buttonContainer: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            // maxWidth: "auto",
            // maxHeight: 'auto',
            borderRadius: 20,

            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            ...textContainer,
            alignSelf: 'center'
        },
        text: {
            ...text,
            textTransform: 'uppercase'
        },
    },
    [ButtonVariant.small]: {
        buttonContainer: {
            // maxWidth: 135,
            // maxHeight: 35,

            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 10,


            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            ...textContainer,
            alignSelf: 'center'
        },
        text: {
            ...text,
            textTransform: 'uppercase'
        },
    },


}


export default useButtonStyle;


