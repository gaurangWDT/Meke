import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import {useRef, useEffect} from 'react';
const {width, height} = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
const COLORS = {primary: '#282534', white: '#fff'};
import backgroundimage from '../assets/background.png';

const slides = [
  {
    id: '1',
    image: require('../assets/Asset1.png'),
    title: 'Photo Upload',
    subtitle:
      "Upload photos from device's gallery or capture using the app's built-in camera.",
  },
  {
    id: '2',
    image: require('../assets/Asset2.png'),
    title: 'Design Browse',
    subtitle:
      'User-friendly interface to browse through a collection of jewelry designs organized into categories',
  },
  {
    id: '3',
    image: require('../assets/Asset3.png'),
    title: 'Save or Star Mark',
    subtitle: 'Mark specific designs as favorites for quick access.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.subtitle}>{item?.subtitle}</Text>
    </View>
  );
};

const Onboarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.4,
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}

          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={i === currentSlideIndex ? styles.activeDot : styles.dot}
              />
            ))}
          </View>
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 10}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2.5),
                    color: '#123256',
                  }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row', height: 40}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2.5),
                    color: '#123256',
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundimage} style={{width: '100%'}}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{height: height * 0.65}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#123256',
  },
  subtitle: {
    color: COLORS.white,
    // fontSize: 12,
    fontSize: RFPercentage(1.7),
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  title: {
    color: COLORS.white,
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  pageContainer: {
    // alignItems: 'center',
    // paddingHorizontal: 30,
    // paddingHorizontal: wp(8),
    // // paddingTop: 120,
    // paddingTop: wp(30),
    // width: width - 40, // Adjust the width as needed
    // marginHorizontal: 20, // Adjust the horizontal margin as needed

    alignItems: 'center',
    paddingHorizontal: wp(4), // Adjust the horizontal padding as needed
    paddingTop: hp(15), // Adjust the top padding as needed
    width: wp(80), // Adjust the width as needed
    marginHorizontal: wp(10), // Adjust the horizontal margin as needed
  },
  imageContainer: {
    // height: 100, // Adjust the container height as needed
    height: wp(30),
    // width: 150, // Adjust the container width as needed
    width: wp(50),
    // width: '100%',
    // marginBottom: 140,
    marginBottom: hp(18),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    height: wp(15),
    // height: 60,
    width: wp(65),
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#808080',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 30,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#123256',
//   },
//   subtitle: {
//     color: COLORS.white,
//     fontSize: RFPercentage(1.7),
//     marginTop: 10,
//     textAlign: 'center',
//     fontFamily: 'Lato-Regular',
//   },
//   title: {
//     color: COLORS.white,
//     fontSize: RFPercentage(2.5),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: 'Lato-Regular',
//   },
//   pageContainer: {
//     alignItems: 'center',
//     paddingHorizontal: wp(10), // Adjust the horizontal padding as needed
//     paddingTop: hp(15), // Adjust the top padding as needed
//     width: wp(80), // Adjust the width as needed
//     marginHorizontal: wp(10), // Adjust the horizontal margin as needed
//   },
//   imageContainer: {
//     height: wp(25), // Adjust the container height as needed
//     width: wp(50), // Adjust the container width as needed
//     marginBottom: hp(20), // Adjust the bottom margin as needed
//   },
//   image: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     resizeMode: 'contain',
//   },
//   indicator: {
//     height: 2.5,
//     width: 10,
//     backgroundColor: 'grey',
//     marginHorizontal: 3,
//     borderRadius: 2,
//   },
//   btn: {
//     height: wp(15), // Adjust the button height as needed
//     width: wp(65), // Adjust the button width as needed
//     backgroundColor: COLORS.white,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: hp(5), // Adjust the vertical margin as needed
//     marginRight: 'auto',
//     marginLeft: 'auto',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dot: {
//     width: 13,
//     height: 13,
//     borderRadius: 7,
//     backgroundColor: '#808080',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     width: 30,
//     height: 13,
//     borderRadius: 7,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 5,
//   },
// });

export default Onboarding;
