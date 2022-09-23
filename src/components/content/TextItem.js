import {Text, View} from "react-native";
import useTextStyle from "./textStyle";

export default function TextItem(props) {
    const textStyle = useTextStyle;
    const {
        content,
        contentStyle,
        containerStyle,
        ...otherProps
    } = props;
    const container = [textStyle.textContainer, containerStyle];
    const text = [textStyle.text, contentStyle];
    return (
        <View {...otherProps} style={container}>
            {content && <Text style={text}>{content}</Text>}
        </View>
    )
}
