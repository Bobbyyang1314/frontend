import React from "react"
import { StyleSheet, Image, SafeAreaView } from "react-native"


const Header = () => {
    return(
        // Set on the area cannot touch.
        <SafeAreaView style={styles.header}>
            <Image
                // Changed to E-shop_Application\easy-shop\assets\e-shop-logo-temp.png
                source={require("../assets/e-shop-logo-temp.png")}
                resizeMode="contain"
                // Icon image location
                style={{ height: 50, marginTop: 50}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 80 // Todo: Delete
    }
})

export default Header;