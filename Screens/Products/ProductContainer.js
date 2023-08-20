import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Box, VStack, Container, Input, Text, ScrollView } from 'native-base';
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import ProductList from './ProductList';

import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from "./CategoryFilter";

import baseURL  from "../../assets/common/baseUrl";

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [productsCtg, setProductsCtg] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(() => {
                setFocus(false);
                setActive(-1);

                // Products
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                // Categories
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                return () => {
                    setProducts([]);
                    setProductsFiltered([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState();
                };
            },
            [],
        )
    ))

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )

    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    // const changeCtg = (ctg) => {
    //     {
    //         ctg === 'all'
    //             ? [setProductsCtg(initialState), setActive(true)]
    //             : [
    //                 setProductsCtg(
    //                     products.filter((i) => i.category._id === ctg),
    //                     setActive(true)
    //                 ),
    //             ];
    //     }
    // }

    const changeCtg = (ctg) => {
        ctg === 'all'
            ? (
                setProductsCtg(initialState),
                    setActive(true)
            )
            : (
                setProductsCtg(products.filter((i) => i.category._id === ctg)),
                    setActive(true)
            );
    };


    return (
        <>
            { loading === false ? (
                <Box>
                    {/*Search Bar*/}
                    <VStack space={2} alignItems="center" mt={4}>
                        <Input
                            placeholder="Search"
                            onFocus={openList}
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
                            rightElement={<Icon
                                name="close"
                                onPress={onBlur}
                                marginRight={10}
                                color="gray"/>}
                        />
                    </VStack>

                    {focus === true ? (
                        <SearchedProduct
                            navigation={props.navigation}
                            productsFiltered={productsFiltered}
                        />
                    ) : (
                        <ScrollView>
                            <View>
                                <View style={styles.bannerContainer}>
                                    <Banner />
                                </View>
                                <View style={styles.categoryFilterContainer}>
                                    <CategoryFilter
                                        categories={categories}
                                        categoriesFilter={changeCtg}
                                        productsCtg={productsCtg}
                                        active={active}
                                        setActive={setActive}
                                    />
                                </View>
                                {productsCtg.length > 0 ? (
                                    <View style={styles.listContainer}>
                                        {productsCtg.map((item) => {
                                            return (
                                                <ProductList
                                                    navigation={props.navigation}
                                                    key = {item.name}
                                                    item = {item}
                                                />
                                            )
                                        })}
                                    </View>
                                ) : (
                                    <View>
                                        <Text>No products found</Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    )}
                </Box>
            ) : (
                // Loading
                <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                    <ActivityIndicator size="large" color="red" />
                </Container>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    bannerContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    categoryFilterContainer: {
        marginTop: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer


// <Header searchBar rounded>
// <Item>
//     <Icon name="ios-search"/>
//     <Input
//         placeholder="Search"
//         // onFocus={}
//         // onChangeText={(text) => }
//     />
// </Item>
// </Header>



{/* <View style = {[styles.center, {height: '40%'}]}>
                <Text>No products found</Text>
              </View> */}


// rightElement={<Icon
//   onPress={onBlur}
//   marginRight={3}
//   outlineColor={"black"}
//   color={"gray.400"}
//   as={<Ionicons name="ios-close"/>} />
// }