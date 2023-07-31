import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useState, useRef, useEffect} from 'react';
const {width, height} = Dimensions.get('window');
const buttonContainerHeight = height / 2;
const buttonSize = width / 5;
import axios from 'axios';

const DrawerDemo = () => {
  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [recentUpload, setRecentUpload] = useState('');
  const [favoriteData, setFavoriteData] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'http://appdata.galacaterers.in/gethomeblocks-ax.php',
        );
        setRecentUpload(response.data.data.Bitings);
        setFavoriteData(response.data.data.Juice);
        console.log(recentUpload);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#123256'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={require('../assets/account.png')}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              marginLeft: 20,
              tintColor: 'white',
            }}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 22, fontWeight: 800, color: '#fff'}}>
              Gaurang Kumbhar
            </Text>
            <Text style={{fontSize: 14, color: '#fff'}}>Sub Title</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              marginLeft: 10,
              marginTop: 20,
              backgroundColor: '#123256',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/home.png')}
              style={{
                height: 24,
                width: 24,
                marginLeft: 15,
                tintColor: 'white',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 15,
                color: '#fff',
                marginTop: 10,
              }}>
              Customer List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              marginLeft: 10,
              marginTop: 20,
              backgroundColor: '#123256',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/more.png')}
              style={{
                height: 24,
                width: 24,
                marginLeft: 15,
                tintColor: 'white',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 15,
                color: '#fff',
                marginTop: 10,
              }}>
              Upload
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 200,
              height: 50,
              marginLeft: 10,
              marginTop: 20,
              backgroundColor: '#123256',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/tag2.png')}
              style={{
                height: 24,
                width: 18,
                marginLeft: 15,
                tintColor: 'white',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 15,
                color: '#fff',
                marginTop: 10,
              }}>
              Help
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          transform: [{scale: scale}, {translateX: moveToRight}],
          borderRadius: showMenu ? 40 : 0,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity
            style={{marginLeft: 40}}
            onPress={() => {
              Animated.timing(scale, {
                toValue: showMenu ? 1 : 0.7,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(moveToRight, {
                toValue: showMenu ? 0 : 250,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}>
            <Image
              source={require('../assets/plus.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity> */}
          <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={{marginLeft: 30, marginBottom: 50}}
                  onPress={() => {
                    Animated.timing(scale, {
                      toValue: showMenu ? 1 : 0.7,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    Animated.timing(moveToRight, {
                      toValue: showMenu ? 0 : 250,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    setShowMenu(!showMenu);
                  }}>
                  <Image
                    source={require('../assets/hamberger.png')}
                    style={{width: 25, height: 25, tintColor: 'white'}}
                  />
                </TouchableOpacity>
                <Image
                  source={require('../assets/Meke-White-Logo.png')}
                  style={styles.logo}
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() =>
                    console.log('Icon button pressed')
                  }></TouchableOpacity>
              </View>
              <View style={styles.body}>
                <View style={styles.rowcategory}>
                  <Text style={styles.mainText}>Top Categories</Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}>
                      see more
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.row}>
                    <View style={styles.category}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Button 1 pressed')}>
                        <Image
                          source={require('../assets/homeAsset1.png')}
                          style={styles.categoryContainer}
                        />
                      </TouchableOpacity>
                      <Text style={styles.buttonText}>Rings</Text>
                    </View>
                    <View style={styles.category}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Button 2 pressed')}>
                        <Image
                          source={require('../assets/homeAsset3.png')}
                          style={styles.categoryContainer}
                        />
                      </TouchableOpacity>
                      <Text style={styles.buttonText}>Bracelets</Text>
                    </View>
                    <View style={styles.category}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Button 3 pressed')}>
                        <Image
                          source={require('../assets/homeAsset2.png')}
                          style={styles.categoryContainer}
                        />
                      </TouchableOpacity>
                      <Text style={styles.buttonText}>Bangles</Text>
                    </View>
                    <View style={styles.category}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('Button 4 pressed')}>
                        <Image
                          source={require('../assets/homeAsset3.png')}
                          style={styles.categoryContainer}
                        />
                      </TouchableOpacity>
                      <Text style={styles.buttonText}>Earings</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.body}>
                <Text style={styles.mainText}>Recently Uploaded</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {recentUpload &&
                    recentUpload.map(image => (
                      <TouchableOpacity
                        key={image.prod_id}
                        onPress={() => console.log('Button pressed')}
                        style={styles.ImageContainer}>
                        <Image
                          source={{uri: image.thumb}}
                          style={styles.recentUpload}
                        />
                        <Text style={styles.textBox}>{image.prod_name} </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.mainText}>Favorite Design</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {favoriteData &&
                    favoriteData.map(image => (
                      <TouchableOpacity
                        key={image.prod_id}
                        onPress={() => console.log('Button pressed')}
                        style={styles.ImageContainer2}>
                        <Image
                          source={{uri: image.thumb}}
                          style={styles.recentUpload}
                        />
                        <Text style={styles.textBox}>{image.prod_name} </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default DrawerDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  drawerr: {
    backgroundColor: 'red',
    width: 300,
    height: '100%',
  },
  body: {
    marginLeft: wp('5%'),
    // marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#123256',
    borderBottomLeftRadius: hp('6%'),
    borderBottomRightRadius: hp('6%'),
    height: '16%',
    width: '100%',
    marginBottom: 30,
  },
  logo: {
    width: wp('50%'),
    height: hp('20%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: wp(2),
    // marginBottom: wp(10),
  },
  iconButton: {
    padding: wp('5%'),
    marginBottom: hp('10%'),
  },
  icon: {
    width: wp('7%'),
    height: hp('7%'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '98%',
    // marginTop: 30,
  },
  category: {
    // borderWidth: 1,
    // borderColor: '#000',
    marginRight: 12,
    // width: '22%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('3.2%'),
    // marginBottom: 24,
  },
  rowcategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 24,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: wp('100%'),
    backgroundColor: '#123256',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: wp('3%'),
  },
  buttonText: {
    color: '#000',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    // padding: 8,
    width: buttonSize,
  },
  mainText: {
    color: '#123256',
    // marginBottom: hp('2%'),
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  ImageContainer: {
    height: wp('53%'),
    width: wp('43%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3.2%'),
    marginBottom: hp('3.2%'),
    // marginBottom: 24,
  },
  ImageContainer2: {
    height: wp('53%'),
    width: wp('43%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3.2%'),
    marginBottom: hp('12%'),
    // marginBottom: 24,
  },
  categoryContainer: {
    borderRadius: 20,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  recentUpload: {
    // height: wp('43%'),
    // width: wp('43%'),
    // borderRadius: wp('2%'),
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  textBox: {
    // Styles for the text box
    // marginTop: 10, // Example margin top value

    paddingTop: 7,
    justifyContent: 'center',

    textAlign: 'center',
    // fontSize: 14,
    fontSize: wp('3.5%'),
    fontWeight: 'semibold',
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'lightgrey',
    color: '#000',
    width: '100%',
    height: '20%',
    // borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
