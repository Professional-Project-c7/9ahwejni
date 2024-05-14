import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import testMusic from '../music/testMusic.mp3'; 
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);

  useEffect(() => {
    async function initializeTrackPlayer() {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
          id: "2",
          url: testMusic,
          title: 'Test Song',
          artist: 'Test Artist',
          artwork: 'https://www.example.com/album-artwork.jpg', // Provide artwork URL if available
          loop: true,
        });
        setTrackLoaded(true);
      } catch (error) {
        console.error("Error initializing TrackPlayer:", error);
      }
    }

    initializeTrackPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    const onPlaybackStateChange = async ({ state }) => {
      setIsPlaying(state === STATE_PLAYING);
    };

    TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, onPlaybackStateChange);

    return () => {
      TrackPlayer.removeEventListener(TrackPlayerEvents.PLAYBACK_STATE, onPlaybackStateChange);
    };
  }, []);

  const togglePlayback = async () => {
    if (!trackLoaded) return;

    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="spotify" size={100} color="green" />
      
      <TouchableOpacity onPress={togglePlayback} disabled={!trackLoaded}>
        <IconButton icon={isPlaying ? 'pause' : 'play'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MusicPlayer;
