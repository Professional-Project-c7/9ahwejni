import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { IconButton } from 'react-native-paper';
import testMusic from '../music/testMusic.mp3'; // Assuming this is your audio file

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Initialize with false, as the music initially isn't playing

  useEffect(() => {
    // Function to initialize TrackPlayer and add the track
    const initializeTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: "2",
        url: testMusic, // Use the imported audio file
        title: 'Test Song',
        artist: 'Test Artist',
        artwork: 'album_cover_image_url', // You can provide an actual image URL or leave it as a placeholder
        loop: true, // Enable looping for the track
      });
    };
    

    initializeTrackPlayer(); // Initialize TrackPlayer when the component mounts

    return () => {
      TrackPlayer.destroy(); // Clean up when the component unmounts
    };
  }, []);

  // Function to toggle playback (play/pause)
  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying); // Update the state to reflect the current playback status
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Display track title, artist, and artwork here */}
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Now Playing:</Text>
      <Text style={{ fontSize: 16 }}>Test Song - Test Artist</Text>
      <Image source={require('../image/1.png')} style={{ width: 1, height: 1 }} />
      
      {/* Button to toggle playback */}
      <TouchableOpacity onPress={togglePlayback}>
        <IconButton icon={isPlaying ? 'pause' : 'play'} />
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayer;
