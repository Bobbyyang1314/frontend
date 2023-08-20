import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import {Picker} from '@react-native-picker/picker';
import {Box, Select} from "native-base";

import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";


const ProductForm = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {

        if(!props.route.params) {
            console.log("A")
            setItem(null);
        } else {
            console.log("B")
            console.log(JSON.stringify(props.route.params.item.category))
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category);
            setCountInStock(props.route.params.item.countInStock.toString());
        }

        // Set authentic
        console.log("XHao")
        console.log(item)

        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
                console.log("token", res)
            })
            .catch((error) => console.log(error))



        // Categories

        axios
            .get(`${baseURL}categories`)
            .then((res) => {
                //console.log(res.data)
                setCategories(res.data)})
            .catch((error) => alert("Error to load categories"));


        // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work")
                }
            }
        })();

        return () => {
            setCategories([])
        }
    }, []);


    // https://docs.expo.dev/versions/latest/sdk/imagepicker/
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log("sss", result.assets[0].uri)
        if (!result.canceled) {

            setMainImage(result.assets[0].uri);
            setImage(result.assets[0].uri)

            // setImage(result.uri.replace("file:///", ""));
        }
    };

    const addProduct = () => {
        console.log("imagess", image)
        if (name === "" || brand === "" || price === "" || description === "" || category === "" || countInStock === "") {
            setError("Please fill in the form correctly")
        }

        // let formData = new FormData();

        // const newImageUri = "file:///" + image.split("file:/").join("");

        // formData.append("image", {
        //     uri: image,
        //     type: mime.getType(image),
        //     name: image.split("/").pop()
        // });

        // console.log("Image FormData:", formData.get("image"));

        // formData.append("image", image);
        // console.log(typeof (brand))
        // formData.append("name", name);
        // formData.append("brand", brand);
        // // console.log(formData.getAll())
        // formData.append("price", price);
        // formData.append("description", description);
        // formData.append("category", category);
        // formData.append("countInStock", countInStock);
        // formData.append("richDescription", richDescription);
        // formData.append("rating", rating);
        // formData.append("numReviews", numReviews);
        // formData.append("isFeatured", isFeatured);


        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        // const parser = new DOMParser();
        // const xmlDoc = parser.parseFromString(item, 'text/xml');
        // const titleElement = xmlDoc.querySelector('brand');
        // console.log(titleElement.textContent);




        // console.log(token)
        // console.log(item.id)
        // console.log(`${baseURL}products/${item.id}`)
        // console.log(formData.getAll())
        // console.log((JSON.stringify(item)))
        if (item !== null) {
            console.log(category)

            axios
                .put(`${baseURL}products/${item.id}`, {
                    "image": image,
                    "name":name,
                    "brand":brand,
                    "price": price,
                    "description": description,
                    "category": category,
                    "countInStock": countInStock,
                    "richDescription": richDescription,
                    "rating": rating,
                    "numReviews": numReviews,
                    "isFeatured": isFeatured,
                }, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfully updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        } else {
            console.log(category)
            axios
                .post(`${baseURL}products`, {
                    "image": image,
                    "name":name,
                    "brand":brand,
                    "price": price,
                    "description": description,
                    "category": category,
                    "countInStock": countInStock,
                    "richDescription": richDescription,
                    "rating": rating,
                    "numReviews": numReviews,
                    "isFeatured": isFeatured
                }, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Product Added",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                    })
                })
        }


    }

    return (
        <FormContainer title="Add Product">
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                    uri: mainImage
                }}/>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Icon style={{ color: "white" }} name="camera"/>
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline"}}>Brand</Text>
            </View>
            <Input
                placeholder="Brand"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline"}}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline"}}>Price</Text>
            </View>
            <Input
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardtype={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline"}}>Count in Stock</Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardtype={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline"}}>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            {/*<Box>*/}
            {/*    <Select*/}
            {/*        mode="dropdown"*/}
            {/*        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}*/}
            {/*        style={{ width: undefined }}*/}
            {/*        selectedValue={pickerValue}*/}
            {/*        placeholder="Select your category"*/}
            {/*        placeholderStyle={{ color: '#007aff' }}*/}
            {/*        placeholderIconColor="#007aff"*/}
            {/*        onValueChange={(e) => [setPickerValue(e), setCategory(e)]}*/}
            {/*    >*/}
            {/*        {categories.map((c) => {*/}
            {/*            return <Select.Item key={c.code} label={c.name} value={c.id} />*/}
            {/*        })}*/}
            {/*    </Select>*/}
            {/*</Box>*/}


            <Box>
                <Select
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                    style={{ width: undefined }}
                    selectedValue={pickerValue}
                    placeholder="Select your category"
                    placeholderStyle={{ color: '#007aff' }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        return (
                            <Select.Item
                                key={c.id} // Add the "key" prop with a unique value (in this case, c.id)
                                label={c.name}
                                value={c.name}
                            />
                        );
                    })}
                </Select>
            </Box>


            { err ? <Error message={err} /> : null}
            <View style={styles.buttonContainer}>
                <EasyButton
                    large
                    primary
                    onPress={() => addProduct()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default ProductForm;