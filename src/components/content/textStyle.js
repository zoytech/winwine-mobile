import {Text, View} from "react-native";

const TextContentVariant = {
    short: 'short',
    paragraph: 'paragraph',
}

const TextContent = {
    [TextContentVariant.short]: {
        base: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'coral',
        },
        onBase: {
            fontWeight: 'bold',
        }
    },
    [TextContentVariant.paragraph]: {
        base: {
            display: 'flex',
            marginHorizontal: 27,
            // backgroundColor: 'coral',
        },
        onBase: {
            fontWeight: 'normal',
            textAlign: 'center',
            textAlignVertical: 'center',
            lineHeight: 30,
            letterSpacing: 0.25,

        }
    }

}
export {TextContentVariant};
export default TextContent;


/* supporting-text */

//
// width: 328px;
// height: 220px;
//
// /* M3/body/medium */
//
// font-family: 'Poppins';
// font-style: normal;
// font-weight: 600;
// font-size: 14px;
// line-height: 20px;
// /* or 143% */
//
// letter-spacing: 0.25px;
//
// /* M3/sys/light/on-surface-variant */
//
// color: #4A4643;
//
//
// /* Inside auto layout */
//
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;
