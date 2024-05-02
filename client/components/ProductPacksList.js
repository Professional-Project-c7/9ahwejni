import * as React from 'react';
import { Avatar, Button, Card, Text  } from 'react-native-paper';
import {StyleSheet } from 'react-native'
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = () => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button style= {styles.cancel}>Cancel</Button>
      <Button style ={styles.ButtonOk}>Ok</Button>
    </Card.Actions>
  </Card>
);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
   
    ButtonOk : {
        backgroundColor: '#dba617',
    }
  
})

export default MyComponent;