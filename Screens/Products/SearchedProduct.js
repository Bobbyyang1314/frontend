import React from "react";
import {StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import { View, Image, Text } from 'native-base';

const { width } = Dimensions.get("window");

const SearchedProduct = (props) => {

    const { productsFiltered } = props;

    return (
        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Product Detail', {item: item})
                        }}
                        key={item._id}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image alt={"search-image"}
                               source={{
                                   uri: item.image
                                       ? item.image
                                       : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                               }}
                               style={{ width: 50, height: 50 }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text>{item.name}</Text>
                            <Text note color={"gray.300"}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={{ alignItems: 'center'}}>
                    <Text>No products match the selected criteria.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SearchedProduct;