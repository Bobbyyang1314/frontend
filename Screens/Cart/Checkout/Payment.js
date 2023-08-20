import React, {useState} from "react";
import {Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, View, Icon, Box, Radio, Select, Pressable, HStack} from "native-base";
import countries from "../../../assets/data/003 countries.json";

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3}
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3},
    { name: 'Other', value: 4}
]
const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected ] = useState();
    const [card, setCard ] = useState();


    return (
        <Container>
            {/*<Box>*/}
            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 8}}>Choose your payment method</Text>
                {/*<Box>*/}
                    {methods.map((item, index) => {
                        return (
                            <View>
                                <TouchableOpacity key={item.name} onPress={() => setSelected(item.value)}>
                                    <View style={styles.leftContainer}>
                                        <Text style={{ padding: 8 }}>{item.name}</Text>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <Radio.Group
                                            onChange={(value) => setSelected(value)}
                                            value={selected}
                                         name="radio">
                                            <Radio value={item.value} />
                                        </Radio.Group>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                    {selected === 3 ? (
                        <Box>
                            <Select
                                mode="dropdown"
                                iosIcon={<Icon name={"arrow-down"} />}
                                style={{ width: undefined }}
                                headerStyle={{ backgroundColor: 'orange' }}
                                placeholder="Select your country"
                                headerBackButtonTextStyle={{ color: '#007aff' }}
                                selectedValue={card}
                                onValueChange={(x) => setCard(x)}
                            >
                                {paymentCards.map((c, index) => {
                                    return <Select.Item
                                        key={c.id}
                                        label={c.name}
                                        value={c.name} />
                                })}
                            </Select>
                        </Box>
                    ) : null }

                    <View style={{ marginTop: 60, alignSelf: 'center' }}>
                        <Button
                            title={"Confirm"}
                            onPress={() => props.navigation.navigate("Confirm", { order })}/>
                    </View>
                {/*</Box>*/}
            {/*</Box>*/}
        </Container>
    )
}

const styles = StyleSheet.create({
    leftContainer: {
        marginRight: 'auto',
    },
    rightContainer:{
        marginLeft: 'auto',
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

export default Payment;

