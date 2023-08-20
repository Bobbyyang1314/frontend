import React, { useState, useCallback } from "react";
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image} from "react-native";
import {Input, VStack} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";

import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Toast from "react-native-toast-message";



const { height, width } = Dimensions.get("window");

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>

            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader} numberOfLines={1}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.boldHeader}>Price</Text>
            </View>
        </View>
    )
}


const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                console.log(typeof (AsyncStorage.getItem("jwt")))
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })
                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            }, [],
        )
    )

    const searchProduct = (text) => {
        if (text === "") {
            setProductFilter(productList);
        } else {
            let list = []
            productList.map((item) => {
                if (item.name.toLowerCase().startsWith(text.toLowerCase())) {
                    list.push(item);
                }
            });
            setProductFilter(list)
        }

        console.log(productList)
    }

    const deleteProduct = (id) => {

        {
            id === null ? console.log("A") : console.log("B")
        }
        console.log(`${baseURL}products/${id}`) // Log the value of id to the console
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id);
                setProductFilter(products);
            })
            .catch((error) => {
                console.log(error); // Log the error for debugging purposes

                // Display a user-friendly error message using a toast or alert
                // For example, using Toast:
                Toast.show({
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again later",
                });
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white"/>
                    <Text style={styles.buttonText}>Orders</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Products</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>
            </View>
            <View>
                <VStack space={2} alignItems="center" mt={4}>
                    <Input
                        placeholder="Search"
                        onChangeText={(text) => searchProduct(text)}
                        variant="filled"
                        width="100%"
                        borderRadius="10"
                        py="1"
                        px="2"
                        InputLeftElement={
                            <Icon
                                name="search"
                                marginLeft={10}
                                color="gray" />
                        }
                    />
                </VStack>
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: "row",
        padding: 5,
        backgroundColor: "gainsboro"
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    boldHeader: {
        fontWeight: "bold"
    },
    spinner: {
        height: height / 2,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white',
        fontWeight: "bold"
    }
})

export default Products;