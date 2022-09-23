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
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'coral',
        },
        onBase: {
            fontWeight: 'normal',
            textAlign: 'center', textAlignVertical: 'center',
        }
    }

}
export {TextContentVariant};
export default TextContent;
