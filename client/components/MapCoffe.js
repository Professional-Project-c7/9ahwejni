import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Mapbox from '@rnmapbox/maps';

// Mapbox.setAccessToken('pk.eyJ1IjoicmlhZGhsb3VkaGFpZWYiLCJhIjoiY2x2Z2o5bmcwMG84cDJpbzV0MnVsd3UyNSJ9.rxoADhSxn7klh-OQFuafPg');

// const App = () => {
//   return (
//     <View style={styles.page}>
//       <View style={styles.container}>
//         <Mapbox.MapView style={styles.map} />
//       </View>
//     </View>
//   );
// }

// export default App;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     height: 300,
//     width: 300,
//   },
//   map: {
//     flex: 1
//   }
// });