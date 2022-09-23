import {Image, View, StyleSheet} from "react-native";

export default function ImageContent(props) {
    const {
        containerStyle,
    } = props;
    const container = [styles.container, containerStyle]
    const imageStyle = [styles.image]
    return (
        <View style={container}>
            <Image
                style={imageStyle}
                source={require('../../assets/images/preview-package/member1.jpg')}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: 'nowrap',
        alignItems: 'center',
        backgroundColor: 'coral',
    },
    image: {
        // resizeMode: 'contain',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: 1,
    }
})
