import React, { useContext } from "react";
import {Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Text, View} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";


import { connect } from "react-redux";
import * as actions from '../../Redux/Actions/cartActions'

import Icon from 'react-native-vector-icons/FontAwesome'
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import AuthGlobal from "../../Context/store/AuthGlobal";

const { height, width} = Dimensions.get("window");
const Cart = (props) => {

    const context = useContext(AuthGlobal);

    let total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    return (
        // <View style={{ flex: 1 }}>
        //     {props.cartItems.map(x => {
        //         return (
        //             <Text>{x.product.name}</Text>
        //         )
        //     })}
        // </View>
        <ScrollView>
            {props.cartItems.length ? (
                <View>
                    {/*<View style={{ alignItems: "center" }}>*/}
                    {/*    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cart</Text>*/}
                    {/*</View>*/}
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />

                    {/*total add checkout*/}
                    <View style={styles.bottomContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.price}>$ {total}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <EasyButton
                                medium
                                danger
                                onPress={() => props.clearCart()}
                            >
                                <Text style={{color: "white", fontWeight: "bold"}}>Clear</Text>
                            </EasyButton>
                        </View>
                        <View style={styles.rightContainer}>
                            {context.stateUser.isAuthenticated ? (
                                <EasyButton
                                    primary
                                    medium
                                    onPress={() => props.navigation.navigate('Checkout')}
                                >
                                    <Text style={{ color: 'white' }}>Checkout</Text>
                                </EasyButton>
                            ) : (
                                <EasyButton
                                    secondary
                                    medium
                                    onPress={() => props.navigation.navigate('Login')}
                                >
                                    <Text style={{ color: 'white' }}>Login</Text>
                                </EasyButton>
                            )}

                        </View>
                    </View>
                </View>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks your cart is empty</Text>
                    <Text>Add products to your cart</Text>
                </Container>
            )}
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state
    return {
        cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    leftContainer: {
        marginRight: 'auto',
    },
    rightContainer:{
        marginLeft: 'auto',
    },
    emptyContainer: {
        height: height,
        alignItems: "center",
        marginLeft:40,
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: "center",
        position: 'relative',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
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
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
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
        flexDirection: "row"
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);