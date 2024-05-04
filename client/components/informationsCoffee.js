import React from 'react';
import {View, SafeAreaView, StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const ProfileScreen = ({navigation}) => {

//   const myCustomShare = async() => {
//     const shareOptions = {
//       message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
//       url: files.appLogo,
//       // urls: [files.image1, files.image2]
//     }

//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       console.log(JSON.stringify(ShareResponse));
//     } catch(error) {
//       console.log('Error => ', error);
//     }
//   };

  return (
    <SafeAreaView style={styles.container}>

<View style={{alignItems: 'center',marginTop:40}}>
          <TouchableOpacity >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={require("../image/image.png")} 
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color='#dba617'
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    //   borderWidth: 1,
                    //   borderColor: '#dba617',
                    //   borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color='#dba617' size={20}/>
          <Text style={{color:"#777777", marginLeft: 20,fontSize:18}}>Gabes, Tunisia</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color='#dba617' size={20}/>
          <Text style={{color:"#777777", marginLeft: 20,fontSize:18}}>+91-900000009</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color='#dba617' size={20}/>
          <Text style={{color:"#777777", marginLeft: 20,fontSize:18}}>john_doe@email.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          {/* <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View> */}
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('EditCoffee')}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Edit Informations</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple >
          <View style={styles.menuItem}>
            <Icon name="share-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color='#dba617' size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 65,
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop:10
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    marginTop:-130,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 25,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});