import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; // Import the FontAwesome5 library
import testMusic from '../music/testMusic.mp3'; 
import TrackPlayer from 'react-native-track-player';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function initializeTrackPlayer() {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
          id: "2",
          url: testMusic,
          title: 'Test Song',
          artist: 'Test Artist',
          loop: true,
        });
        await TrackPlayer.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error initializing TrackPlayer:", error);
      }
    }

    initializeTrackPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Now Playing:</Text>
      <Text style={{ fontSize: 16 }}>Test Song - Test Artist</Text>
      
      {/* Display the Spotify icon */}
      <FontAwesome5 name="spotify" size={100} color="green" />
      
      <TouchableOpacity onPress={togglePlayback}>
        <IconButton icon={isPlaying ? 'pause' : 'play'} />
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayer;
