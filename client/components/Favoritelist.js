import React, { useState } from 'react'
import { StyleSheet, Text,TouchableOpacity, View,TextInput, ScrollView, Image, FlatList } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default Posts = ({ onClose }) => {
  // const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      time: '1 days a go',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    },
    {
      id: 2,
      title: 'Sit amet, consectetuer',
      time: '2 minutes a go',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cofee_Espresso_in_french_cafe.jpg/1200px-Cofee_Espresso_in_french_cafe.jpg',
    },
    {
      id: 3,
      title: 'Dipiscing elit. Aenean ',
      time: '3 hour a go',
      image: 'https://bootdey.com/image/400x200/6495ED/000000',
    },
    {
      id: 4,
      title: 'Commodo ligula eget dolor.',
      time: '4 months a go',
      image: 'https://bootdey.com/image/400x200/8A2BE2/000000',
    },
    {
      id: 5,
      title: 'Aenean massa. Cum sociis',
      time: '5 weeks a go',
      image: 'https://bootdey.com/image/400x200/008B8B/000000',
    },
    {
      id: 6,
      title: 'Natoque penatibus et magnis',
      time: '6 year a go',
      image: 'https://bootdey.com/image/400x200/9932CC/000000',
    },
    {
      id: 7,
      title: 'Dis parturient montes, nascetur',
      time: '7 minutes a go',
      image: 'https://bootdey.com/image/400x200/00CED1/000000',
    },
    {
      id: 8,
      title: 'Ridiculus mus. Donec quam',
      time: '8 days a go',
      image: 'https://bootdey.com/image/400x200/1E90FF/000000',
    },
    {
      id: 9,
      title: 'Felis, ultricies nec, pellentesque',
      time: '9 minutes a go',
      image: 'https://bootdey.com/image/400x200/FF69B4/000000',
    },
  ]
  
  const [posts, setPosts] = useState(data)
  const data2 = posts.slice(0 , 2)
 

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.icon} >
            <IconButton  icon="close" onPress={onClose}   />
              
</View>
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data2}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={post => {
          const item = post.item;
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image style={styles.cardImage} source={{ uri: item.image }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  </ScrollView>
  <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
    <Text style={{ marginBottom: 10 }}>Discount coupon</Text>
    
  
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
  <TextInput
    style={{ borderWidth: 1,width:100, borderColor: 'gray', borderRadius: 1, padding: 10, flex: 1 }}
    placeholder="Promo Code"
  />
  <TouchableOpacity style={{ backgroundColor: '#E4C59E', borderRadius: 1, paddingVertical: 10, paddingHorizontal: 20 }}>
    <Text style={{ color: 'white' }}>Apply</Text>
  </TouchableOpacity>
</View>
  
 
  <View>
    <Text style={{marginLeft:100}}>
      Subtotal                                      19$
    </Text>
    <Text style={{marginLeft:100}}>
    Delevry charge                            1$
    </Text>
    <Text style={{marginLeft:100}}>
    Discount                                      0.2$
    </Text> 
    <Text style={{marginLeft:100}}>
     -------------------------------------------------------
    </Text>
    <Text style={{fontSize:20, marginTop:20,marginLeft:100 }}>
      Total                          20.2$
    </Text>
  </View>
  </View>
   
</View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // backgroundColor:'black'
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: 'white',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
   
    
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    width: 180, // Adjust width according to your design
    height: 150, // Adjust height according to your design
    resizeMode: 'cover',
   
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    marginTop:45
  },
  time: {
    fontSize: 13,
    color: 'black',
    marginTop: 10,
  },
  icon: {
    width: 25,
    height: 25,
    // flexDirection: 'row-reverse'
    
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})