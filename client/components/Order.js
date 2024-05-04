import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper';
export default function OrderList({ onClose }) {
  return (
    <View>
          <View style={styles.icon} >
                <IconButton icon="close" onPress={onClose}   />
</View>
      <Text>OrderList</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  
    icon:{
      marginTop:60,
    
    }

    
})