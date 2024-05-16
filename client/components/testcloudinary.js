import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const YourComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

 const imageHandler = async (image) => {
    try {
      const data = new FormData();
      data.append('file', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: 'photo.jpg'
      });
      data.append('upload_preset', 'i38oelnt'); // Replace 'your_upload_preset' with your Cloudinary upload preset
      data.append('cloud_name', 'dqyx6lht5'); // Replace 'your_cloud_name' with your Cloudinary cloud name

      const response = await fetch('https://api.cloudinary.com/v1_1/dqyx6lht5/image/upload', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      console.log('Cloudinary response:', result);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const pickImage = () => {
    launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const imageUri = await imageHandler(response);
          console.log('Image URI:', imageUri);
          setSelectedImage(imageUri);
        } catch (error) {
          console.error('Error uploading image:', error);
          Alert.alert('Upload Failed', 'Failed to upload image. Please try again.');
        }
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from gallery" onPress={pickImage} />
    </View>
  );
};

export default YourComponent;
