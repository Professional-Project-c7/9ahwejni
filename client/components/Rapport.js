// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ImageBackground, ActivityIndicator } from 'react-native';


// function Rapport() {
 
//   return (
//     <View style={{ flex: 1 }}>
//      <Text>helllllllllllllo</Text>
     
//     </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   sectionContainer: {
// //     marginTop: 32,
// //     paddingHorizontal: 24,

// //   },
// //   sectionTitle: {
// //     fontSize: 24,
// //     fontWeight: '600',
// //   },
// //   backgroundImage: {
// //     flex: 1,
// //     resizeMode: 'cover',
// //     justifyContent: 'center',
// //     alignItems: 'center',
    
// //   },
// //   button: {
  
// //     alignItems: 'center',
// //     marginTop: 520,
// //     width: '50%',
// //     height: 60,
// //     backgroundColor: '#dba617',
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     borderRadius: 25,
// //     marginVertical: 10,
// //     marginHorizontal: 5, 
// //   },

// //   buttonText: {
// //     color: 'white',
// //     fontSize: 20,
// //     fontWeight: 'bold',
  
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 520,

// //   },
// // });

// export default Rapport;
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Rapport = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Handle the submit logic
    console.log('Description Submitted: ', description);
    setDescription(''); // Clear the input after submission
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a description..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // For shadow on iOS
    shadowOpacity: 0.1, // For shadow on iOS
    shadowRadius: 4, // For shadow on iOS
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Rapport;
