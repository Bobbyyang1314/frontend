import React, { useState } from "react";
import {Image, StyleSheet} from "react-native";
import { Text, View } from "native-base";

const CartItem = (props) => {
    const data = props.item.item;
    const [quantity, setQuantity] = useState(props.item.quantity);

    return (
        <View style={[styles.ListItem, {key: Math.random()}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                    <Image
                        source={{
                            uri: data.product.image
                                ? data.product.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                        }}
                        style={{width: 50, height: 50}}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.leftContainer}>
                    <Text>{data.product.name}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text>$ {data.product.price}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    leftContainer: {
        marginRight: 'auto',
    },
    rightContainer:{
        marginLeft: 'auto',
    },
    bottomContainer: {
        flexDirection: 'row',
        // position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    ListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: "flex-start"
    },
    body: {
        // body 样式
        margin: 10,
        alignItems: "center",
        flexDirection: "row",

    },
});

export default CartItem;