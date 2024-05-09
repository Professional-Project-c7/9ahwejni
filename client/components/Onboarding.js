import React , {useState,useRef}from 'react'
import {View  , Text , Styls, StyleSheet  ,FlatList ,Animated} from 'react-native'
import OnboardingItem from './OnboardingItem'
import NextButtonOnboarding from './NextButtonOnboarding'
import Paginator from './Paginator'
const dummyData = [
    {
      "id": 1,
      "title": "Lorem Ipsum",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: require("../image/PaimentPic.png")
    },
    {
      "id": 2,
      "title": "Dolor Sit Amet",
      "description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: require("../image/data-security.png")    },
    {
      "id": 3,
      "title": "Consectetur Adipiscing",
      "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: require("../image/data-security.png")    },
    {
      "id": 5,
      "title": "Consectetur Adipiscing",
      "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: require("../image/data-security.png")    }
  ]
  
function Onboarding() {

    const [currentIndex , setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const SlidesRef = useRef(null);


    const viewableItemsChanged  = useRef(({viewableItems})=> {
        setCurrentIndex(viewableItems[0].index); 
    }).current

    const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current


     const scrollTo=()=>{
      if(currentIndex <dummyData.length-1){
        SlidesRef.current.scrollToIndex({
          // animated: true,
          index: currentIndex + 1,
        });
      }else{
        console.log('last item.')
      }
     }
  return (
    <View style={styles.container}>
        <View style={{flex : 3}}>
      <FlatList data={dummyData} renderItem={({item}) => <OnboardingItem item={item}/>}
       horizontal
        showsHorizontalScrollIndicator
        pagingEnabled 
         bounces={false}
         keyExtractor={(item) =>item.id}
         onScroll={Animated.event([{nativeEvent : {contentOffset :{x: scrollX}}}],{
           useNativeDriver : false 
         })}
         scrollEventThrottle={32}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={viewConfig}
         ref={SlidesRef}
        />
        </View>
       < Paginator data={dummyData} scrollX={scrollX}/>
        <NextButtonOnboarding scrollTo={scrollTo} percentage={(currentIndex+1)*(100/dummyData.length)}/>
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
  
})
export default Onboarding
