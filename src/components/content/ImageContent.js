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
        display: "flex",
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: 1,
    }
})
