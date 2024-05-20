import { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';
import { uploadToCloudinary } from './components/cloudinaryService'; // Assuming you have a cloudinaryService file
import banner from "assets/img/auth/banner.png"; // Import the banner image
import defaultAvatar from "assets/img/avatars/avatar4.png"; // Import the default avatar image

export default function Overview() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleFileUpload = async (file) => {
    // Upload file to Cloudinary
    const uploadedUrl = await uploadToCloudinary(file);
    // Set the avatar URL
    setAvatarUrl(uploadedUrl);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1.34fr 1fr 1.62fr',
        }}
        templateRows={{
          base: 'repeat(3, 1fr)',
          lg: '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatarUrl } // Use the uploaded avatar if available, else fallback to default avatar
          name='Admin'
          job='9ahwejni'
          posts='120'
          followers='50'
          following='174'
        />
        <Storage
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          used={25.6}
          total={50}
        />
        <Upload
          gridArea={{
            base: '3 / 1 / 4 / 2',
            lg: '1 / 3 / 2 / 4',
          }}
          minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
          pe='20px'
          pb={{ base: '100px', lg: '20px' }}
          onFileUpload={handleFileUpload} // Pass the upload function to the Upload component
        />
      </Grid>
      <Grid
        mb='20px'
        templateColumns={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1.34fr 1.62fr 1fr',
        }}
        templateRows={{
          base: '1fr',
          lg: 'repeat(2, 1fr)',
          '2xl': '1fr',
        }}
        gap={{ base: '20px', xl: '20px' }}>
        <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatarUrl || defaultAvatar} // Use the uploaded avatar if available, else fallback to default avatar
          name='Adela'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
          minH='365px'
          pe='20px'
        />
     
      </Grid>
    </Box>
  );
}
