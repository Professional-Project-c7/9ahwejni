import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import OnboardingItem from './OnboardingItem';
import NextButtonOnboarding from './NextButtonOnboarding';
import Paginator from './Paginator';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import anicoffee from '../image/anicoffee.gif';
import protection from '../image/protection.gif';
import gps from '../image/gps.gif';
import waw from '../image/waaw.webp';
// import wawi from '../image/logowaw.gif'
// import Logo from '../image'

const dummyData = [
  {
    id: 1,
    title: "Enjoy Your Coffee",
    description: "Start your day with a smile and a great cup of coffee. Discover our wide range of coffee selections just for you.",
    image: anicoffee,
  },
  {
    id: 2,
    title: "Secure and Reliable",
    description: "Your security is our priority. Enjoy a seamless and secure experience with our app.",
    image: protection,
  },
  {
    id: 3,
    title: "Find Your Way",
    description: "Locate the best coffee shops around you with our easy-to-use GPS feature.",
    image: gps,
  }, 
  {
    id: 4,
    title: "Welcome to 9ahwejni",
    description: "Join us and enjoy the best coffee experience with our app. Let's get started!",
    image: waw
  }
];

function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const SlidesRef = useRef(null);
  const [showGetStarted, setShowGetStarted] = useState(false);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < dummyData.length - 1) {
      SlidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      console.log('last item.');
    }
  };

  useEffect(() => {
    if (currentIndex === dummyData.length - 1) {
      setShowGetStarted(true);
    } else {
      setShowGetStarted(false);
    }
  }, [currentIndex]);

  const navigateToUserAccount = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={SlidesRef}
      />
      <Paginator data={dummyData} scrollX={scrollX} />
      <NextButtonOnboarding scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / dummyData.length)} />
      <View style={styles.buttonContainer}>
        {!showGetStarted && (
          <TouchableOpacity onPress={navigateToUserAccount} style={styles.skipButton} activeOpacity={0.6}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        {!showGetStarted && (
          <TouchableOpacity onPress={scrollTo} style={styles.nextButton} activeOpacity={0.6}>
            <Icon name="arrow-circle-right" size={50} color="#dba617" />
          </TouchableOpacity>
        )}
        {showGetStarted && (
          <TouchableOpacity onPress={navigateToUserAccount} style={styles.getStartedButton} activeOpacity={0.6}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipButton: {
    marginHorizontal: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 25,
    color: '#333',
    
    
  },
  nextButton: {
    marginLeft: 'auto',
    marginRight: 20,
    padding: 15,
  },
  getStartedButton: {
    padding: 15,
    backgroundColor: '#dba617',
    borderRadius: 30,
  },
  getStartedText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Onboarding;
