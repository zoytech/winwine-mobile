import {Image, View, StyleSheet} from "react-native";

export default function ImageContent() {
    const containerStyle = [styles.container]
    const imageStyle = [styles.image]
    return (
        <View style={containerStyle}>
            <Image
                style={imageStyle}
                source={require('../../assets/images/preview-package/member1.jpg')}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 170,
        left: 0,
        top: 0,
        borderRadius: 12,

    },
    image: {
        // resizeMode: "contain",
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }
})
