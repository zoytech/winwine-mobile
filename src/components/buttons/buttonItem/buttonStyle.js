import React from "react";
import TextContent, {TextContentVariant} from "../../content/textStyle";
import {ColorVariant} from "../../../themes/color";

const textContentVariant = TextContentVariant.short;
const {base, onBase} = TextContent[textContentVariant]
// const ButtonVariant = {
//     big: 'big',
//     small: 'small',
// }
//
//
// const ButtonStyle = {
//     [ButtonVariant.big]: {
//         shape: {
//             minWidth: 110,
//             minHeight: 40,
//             paddingVertical: 5,
//             paddingHorizontal: 5,
//             borderRadius: 20,
//
//             display: "flex",
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         textArea: {
//             ...base,
//             alignSelf: 'center'
//         },
//         text: {
//             ...onBase,
//             textTransform: 'uppercase'
//         },
//     },
//     [ButtonVariant.small]: {
//         shape: {
//             borderRadius: 20,
//             paddingVertical: 4,
//             paddingHorizontal: 10,
//
//             display: "flex",
//             justifyContent: 'center',
//             alignItems: 'center',
//
//             minWidth: 80,
//             minHeight: 30,
//         },
//         textArea: {
//             ...base,
//             alignSelf: 'center'
//         },
//         text: {
//             ...onBase,
//             textTransform: 'uppercase'
//         },
//     },
//
//
// }
const colorPrimary = ColorVariant.primary;


const ButtonVariant = {
    text: 'text',
    outlined: 'outlined',
    filled: 'filled',
    elevated: 'elevated',
    tonal: 'tonal',
}

const PropertyVariant = {
    shadow: 'shadow',
    opacity: 'opacity',
    outlineColor: 'outlineColor',
    background: 'background',
    labelText: 'labelText',
}

const Property = {
    light: {
        [PropertyVariant.shadow]: {
            light1: {
//                 box-shadow: 0px 1px 3px 1px #00000026;
//                  box-shadow: 0px 1px 2px 0px #0000004D;
            },
            light2: {
                // box-shadow: 0px 2px 6px 2px #00000026;
                // box-shadow: 0px 1px 2px 0px #0000004D;
            }
        },
        [PropertyVariant.labelText]: {
            size: {
                small: '',
                medium: '',
                large: ''
            },
            color: {
                primary: '',
                onPrimary: '',
            }
        },
        [PropertyVariant.outlineColor]: {
            borderColor: {
                primary: '',
                outline: '',
            },
            borderWidth: 1,

        },
        [PropertyVariant.background]: {
            backgroundColor: {
                primary: ''
            }
        },
        [PropertyVariant.opacity]: {
            light1: '0.05',
            light2: '0.08',
            light3: '0.12',
        },

    }

}


const Text = {
    textArea: {
        ...base,
        alignSelf: 'center'
    },
    text: {
        ...onBase,
        textTransform: 'uppercase'
    },
}
const Outlined = {
    ...Border
}

const Filled = {
    ...
}
const Elevated = {}
const Tonal = {}
const ButtonVariant = {
    text: {
        ...Text
    },
    outlined: {
        shape: {},
        ...TextStyle,
    }

}
export default ButtonStyle;
export {ButtonVariant}


