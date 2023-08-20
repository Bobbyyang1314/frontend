import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { View, Badge, Text } from "native-base";

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoriesFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center,
                            { margin: 5 },
                            props.active === -1 ? styles.active : styles.inactive
                        ]}
                    >
                        <Text style={{ color: "white" }}>All</Text>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item, index) => (
                    <TouchableOpacity
                        //key={item._id}
                        key={item._id.toString()}
                        onPress={() => {
                            props.categoriesFilter(item._id),
                                // props.setActive(props.categories.indexOf(item))
                                props.setActive(index)
                        }}
                    >
                        <Badge
                            style={[styles.center,
                                { margin: 5 },
                                props.active == props.categories.indexOf(item)
                                    ? styles.active : styles.inactive
                            ]}
                        >
                            <Text style={{ color: "white" }}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
});

export default CategoryFilter;
