import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';

const HomeCarousel = () => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimension(window);
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
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
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png'},
    { url: 'https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg' },
    { url: 'https://esquirescoffee.co.uk/wp-content/uploads/2019/07/Picture-1.pngxx_.png' },
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
            style={{ width: dimension?.width, height: 200, resizeMode: 'cover',borderRadius:20 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}
      >
        {carouselImages.map((val, key) => (
          <Text
            key={key}
            style={key === selectedIndex ? { color: 'white' } : { color: '#888' }}
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeCarousel;
