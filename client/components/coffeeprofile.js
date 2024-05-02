import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';

const MyComponent = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
        <ImageBackground source={{ uri: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' }} style={styles.profileImage}>
  {/* Text on the left */}
  <View style={styles.leftTextContainer}>
  <View style={styles.textWithIcon}>
    <Text style={styles.textrate}>4.5</Text>
    <IconButton icon="star" iconColor='#dba617' size={23} style={styles.starIcon} />
  </View>
</View>

  {/* Text on the right */}
  <View style={styles.rightTextContainer}>
  <View style={styles.textWithIcon}>
    <IconButton icon="google-maps" iconColor='#dba617' size={23} style={styles.locIcon} />
    <Text style={styles.textloc}>Gabes</Text>
  </View>
</View>
  <IconButton icon="keyboard-backspace" iconColor='#dba617' size={35} style={styles.backIcon} />
</ImageBackground>

        </View>
        <View style={styles.profileInfo}>
            
          <Text style={styles.name}>COFFEESHOP</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: 'https://images.ladepeche.fr/api/v1/images/view/5c37a43e8fe56f6aee207597/large/image.jpg' }} style={styles.optionImage} />
            <Text style={styles.optionText}>ADD PACKS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: "https://www.amorecoffee.co.uk/wp-content/uploads/2019/01/Enjoy.jpg" }} style={styles.optionImage} />
            <Text style={styles.optionText}>ADD PRODUCTS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fc215d336-ef13-11ec-a7ea-792e433452b2.jpg?crop=5760%2C3240%2C0%2C300&resize=392' }} style={styles.optionImage} />
            <Text style={styles.optionText}>ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' }} style={styles.optionImage} />
            <Text style={styles.optionText}>ORDERS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' }} style={styles.optionImage} />
            <Text style={styles.optionText}>Goal Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Image source={{ uri: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' }} style={styles.optionImage} />
            <Text style={styles.optionText}>Goal Settings</Text>
          </TouchableOpacity>
        </View>
        {/* Add more options here */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#ff0000' }]}>
          <Text style={[styles.logoutText, { color: '#ffffff' }]}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    textWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#dba617',
  },
  profileImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileInfo: {
    alignItems: 'center',
    // padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  expense: {
    fontSize: 18,
    marginTop: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  option: {
    flex: 1,
    margin: 8,
    backgroundColor: '#dba617',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    resizeMode: 'cover',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    color: '#ffffff',
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  leftTextContainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    height:30,
    width:70
  },
 
  rightTextContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    
    padding: 5,
    height:30,
    width:80
  },
  textrate: {
    color: '#dba617',
    top:-15,
    right:-7,
    fontSize:17
  },
  starIcon: {
    left:-5,
      top:-15

    },
    textloc: {
        color: '#dba617',
        top:-15,
        right:32,
        fontSize:17
      },
      locIcon: {
        left:-18,
          top:-15
    
        }
  
});

export default MyComponent;
