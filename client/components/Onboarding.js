import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import OnboardingItem from './OnboardingItem';
import NextButtonOnboarding from './NextButtonOnboarding';
import Paginator from './Paginator';
import Icon from 'react-native-vector-icons/FontAwesome';

const dummyData = [
  {
    "id": 1,
    "title": "Lorem Ipsum",
    "description": "The customer is very important, the customer will be followed by the customer. But at the same time they happened with great labor and pain.",
    image: require("../image/ob1.png")
  },
  {
    "id": 2,
    "title": "Dolor Sit Amet",
    "description": "Do not be angry with the pain in the rebuke, in the pleasure he wants to be a hair from the pain, let him run away from the pain.",
    image: require("../image/ob2.png")
  },
  {
    "id": 3,
    "title": "Adipiscing will follow",
    "description": "Unless they are blinded by lust, they do not come out, they are in fault who abandon their duties, the soul softens, that is toils.",
    image: require("../image/ob3.png")
  }, 
  {
    "id": 5,
    "title": "Adipiscing will follow",
    "description": "Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.",
    image: require("../image/logo.png")
  }
]

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
      <View style={{ flex: 3 }}>
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
      </View>
      <Paginator data={dummyData} scrollX={scrollX} />
      <NextButtonOnboarding scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / dummyData.length)} />
      <View style={styles.buttonContainer}>
        {!showGetStarted && (
          <TouchableOpacity onPress={navigateToUserAccount} style={styles.skipButton} activeOpacity={0.6}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        {!showGetStarted && (
          <TouchableOpacity onPress={scrollTo} style={styles.NextButton} activeOpacity={0.6}>
            <Icon name="arrow-circle-right" size={60}  />
          </TouchableOpacity>
        )}
        {showGetStarted && (
          <TouchableOpacity onPress={navigateToUserAccount} style={styles.button} activeOpacity={0.6}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
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
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    borderRadius: 100,
    padding: 20,
    marginHorizontal: 10,
  },
  NextButton : {
    marginLeft : 190,
  },
  getStartedText: {
    fontSize: 30,
    color: 'black',
  },
  skipButton: {
    marginLeft: -10,
    padding: 20,
  },
  skipText: {
    fontSize: 30,
    color: 'black'
  },
})
export default Onboarding;
