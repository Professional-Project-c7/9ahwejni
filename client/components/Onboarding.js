import React , { useEffect,useState,useRef}from 'react'
import {View  , Text , Styls, StyleSheet  ,FlatList ,Animated,TouchableOpacity} from 'react-native'
import OnboardingItem from './OnboardingItem'
import NextButtonOnboarding from './NextButtonOnboarding'
import Paginator from './Paginator'
import Icon from 'react-native-vector-icons/FontAwesome';

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
  
function Onboarding({navigation ,percentage}) {

    const [currentIndex , setCurrentIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const SlidesRef = useRef(null);
    const [showGetStarted, setShowGetStarted] = useState(false);

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);
  
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
        <View>

        {showGetStarted ? (
        <TouchableOpacity onPress={navigateToUserAccount} style={styles.button} activeOpacity={0.6}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <View >
        <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
          <Icon name="arrow-circle-right" size={60} color="#dba617" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToUserAccount} style={styles.Skip} activeOpacity={0.6} >
     <Text style={styles.Skip}> Skip </Text>
      </TouchableOpacity>
        </View>
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
  
})
export default Onboarding
