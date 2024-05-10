import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapCoffe from './MapCoffe';

const FlatListPopularShops = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const FlattButtons = [
        { index: "1", name: 'Popular' },
        { index: "2", name: 'New Release' },
        { index: "3", name: 'Warm Coffe' },
        { index: "4", name: 'Best' },
    ];

    const handleNamePress = (index) => {
        setSelectedIndex(index);
    };

    return (
        <View>
            <FlatList
                style={styles.lisStyle}
                keyExtractor={(item) => item.index}
                horizontal={true}
                data={FlattButtons}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleNamePress(item.index)}>
                        <View style={[styles.card]}>
                            <Text style={[styles.textStyle, selectedIndex === item.index && styles.selected]}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        padding: 16,
        backgroundColor: '#DDDDDD',
        margin: 5,
        color: "black",
        fontWeight: 'bold',
        borderRadius: 20,
    },
    lisStyle: {
        textAlign: "center",
        marginRight: 10,
        padding: 5,
    },
    selected: {
      color: "white",

        backgroundColor: '#dba617', 
    },
});

export default FlatListPopularShops;
