import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';

const HomeCarousel = () => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();

  const onChange = ({ window }) => {
    setDimension(window);
  };
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex(prevSelectedIndex =>
        prevSelectedIndex === carouselImages.length - 1 ? 0 : prevSelectedIndex + 1
      );
      scrollRef.current.scrollTo({
        animated: true,
        y: 0,
        x: dimension.width * selectedIndex,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [dimension.width, selectedIndex]);

  const carouselImages = [
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
    { url: 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg' },
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2021/07/pexels-elle-hughes-4424674.jpg'},
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2021/02/A-selection-of-different-coffee-drinks.png' },
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2021/02/A-latte-and-a-sweet-snack.jpg' },
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  return (
    <View style={{ width: dimension.width }}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {carouselImages.map((value, key) => (
          <Image
            key={key}
            source={{ uri: `${value.url}` }}
            style={[styles.image, { width: dimension.width }]}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {carouselImages.map((val, key) => (
          <Text
            key={key}
            style={key === selectedIndex ? styles.paginationActiveText : styles.paginationText}
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 15,
    marginHorizontal: 0.0001,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationText: {
    color: '#888',
    margin: 3,
    fontSize: 16,
  },
  paginationActiveText: {
    color: 'white',
    margin: 3,
    fontSize: 16,
  },
});

export default HomeCarousel;
