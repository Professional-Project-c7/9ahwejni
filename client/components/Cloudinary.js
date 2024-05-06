import axios from 'axios';

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (imageUri) => {
  try {
    // Cloudinary upload URL
    const uploadUrl = 'https://api.cloudinary.com/v1_1/dmqumly45/image/upload';
    
    // Cloudinary upload preset (you need to create this in your Cloudinary account)
    const uploadPreset = 'qgu6rb7z';

    // Create form data with the image data
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust the type according to your image type
      name: 'profile_image.jpg', // You can also generate a unique name for each upload
    });
    formData.append('upload_preset', uploadPreset);

    // Make a POST request to Cloudinary
    const response = await axios.post(uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Return the secure URL of the uploaded image
    return response.data.secure_url;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary: ' + error.message);
  }
};
