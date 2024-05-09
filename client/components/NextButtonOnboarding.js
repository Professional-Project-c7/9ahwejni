import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function NextButtonOnboarding({ navigation,percentage, scrollTo, onFinish }) {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const size = 128;
  const strokeWidth = 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(({ value }) => {
      const strokeDashoffset = circumference - (circumference * value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (percentage === 100) {
      // If on the last slide, show the "Get Started" button
      setShowGetStarted(true);
    } else {
      setShowGetStarted(false);
    }
  }, [percentage]);

  const navigateToUserAccount = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
       {/* {showGetStarted ? (
        <TouchableOpacity  style={styles.button} activeOpacity={0.6}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View >
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
          <Icon name="arrow-circle-right" size={60} color="#dba617" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={navigateToUserAccount} style={styles.Skip} activeOpacity={0.6} >
     <Text style={styles.Skip}> Skip </Text>
      </TouchableOpacity> */}
        {/* </View>
      )}   */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    borderRadius: 100,
    padding: 20,
    marginTop: -25,
    marginLeft: 90,
  },
  getStartedText: {
    fontSize: 25,
    color: '#dba617',
  },
  Skip : {
    fontSize : 35 , 
    marginLeft : -90 ,
    color : 'black'
   } , 
});

export default NextButtonOnboarding;
