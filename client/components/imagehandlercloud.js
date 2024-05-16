export const imageHandler = async (image) => {
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