import React from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity , Button } from 'react-native';
import MapCoffe from './MapCoffe';
const FlatListPopularShops = () => {
    const names =[
        {
            index: "1",
            name: 'popular',
        },
        {
            index:"2",
            name: 'New Release',
        },
        {
            index:"3",
            name: 'Warm Coffe',
        },
        {
            index:"4",
            name: 'Best',
        },
    ]
  return (
    <View>

   
      <FlatList 
      style={styles.lisStyle}
      keyExtractor={(key)=>{
          return key.index
        }
      }
      horizontal={true}
      data={names}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        
        padding: 30,
        backgroundColor:'#00512C',
   
        margin:20,
        color : "white",
        borderRadius: 20,

    },
    lisStyle: {

        textAlign: "center",
        marginRight: 10,
        marginTop: 110,
        padding: 10,
    }
})

export default FlatListPopularShops
