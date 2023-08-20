import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

const { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            // Change the path of images
            "/Users/bobby/Desktop/Ecommerce_App/easy-shop/assets/images.png",
            "/Users/bobby/Desktop/Ecommerce_App/easy-shop/assets/PngItem_4336622.png",
            "/Users/bobby/Desktop/Ecommerce_App/easy-shop/assets/Swimming-Pool-PNG-File-Download-Free.png",
            "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
            "/Users/bobby/Desktop/Ecommerce_App/easy-shop/assets/PngItem_822459.png",
        ]);

        return () => {
            setBannerData([]);
        };
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="contain"
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    swiper: {
        width: width,
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0
    },
    imageBanner: {
        height: width / 2,
        width: width - 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
});

export default Banner;