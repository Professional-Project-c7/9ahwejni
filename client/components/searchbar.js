import react from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Image} from 'react-native';
import searchlogo from '../image/searchlogo.png'
import { IconButton } from 'react-native-paper';

export default function SearchBar() {


return(
<View style={styles.asembler}>
<View style={styles. Main}>
<TextInput placeholder='Search ...' style={styles. Input}></TextInput>
</View>
<View style={styles.buttonP}>
<IconButton icon="account-search-outline" iconColor='#dba617' size={30}  />
</View>
</View>
)}



const styles = StyleSheet.create({
asembler: {
flexDirection: 'row',
marginTop: 30,
marginBottom: 30,
justifyContent: 'center'
},
Main: {
    backgroundColor: '#FFF',
    width: 250,
    height:50,
    borderWidth:1,
    borderColor: '#dba617',
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
    },
    Input: {
        marginLeft: 10,
    marginTop: 3
    },
    
    buttonP:{
    height:50,
    width:70,
    backgroundColor: '#FFF',
    borderWidth:1,
    borderBottomRightRadius:30,
    borderTopRightRadius: 30,
    borderColor: '#dba617',
    alignItems: 'center',
    justifyContent: 'center'
    }
})