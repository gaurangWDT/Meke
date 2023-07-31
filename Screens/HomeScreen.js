import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from './AppContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {categoryApi} from '../config';
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 600 ? 2 : 3;
const isTablet = screenWidth >= 768;
const Star = () => {
  const [categories, setCategories] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {shortlistedItems, setShortlistedItems} = useAppContext();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'http://appdata.galacaterers.in/getitemlist-ax.php?ctgid=69',
        );
        setCategories(response.data.data);
        // console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    const loadShortlistedItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('shortlistedItems');
        if (jsonValue !== null) {
          const parsedShortlistedItems = JSON.parse(jsonValue);
          setShortlistedItems(parsedShortlistedItems);
        }
      } catch (error) {
        console.log(
          'Error loading shortlisted items from AsyncStorage:',
          error,
        );
      }
    };

    loadShortlistedItems();
  }, []);

  const handleIconPress = async item => {
    const isBookmarked = shortlistedItems.some(
      bookmarkedItem => bookmarkedItem.prod_id === item.prod_id,
    );

    let newShortlistedItems = [...shortlistedItems];

    if (isBookmarked) {
      newShortlistedItems = newShortlistedItems.filter(
        bookmarkedItem => bookmarkedItem.prod_id !== item.prod_id,
      );
    } else {
      newShortlistedItems.push(item);
    }

    try {
      const jsonValue = JSON.stringify(newShortlistedItems);
      await AsyncStorage.setItem('shortlistedItems', jsonValue);
    } catch (error) {
      console.log('Error saving shortlisted items to AsyncStorage:', error);
    }

    setShortlistedItems(newShortlistedItems);
  };
  const handleImagePress = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeZoomModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
  const handleBackButton = () => {
    navigation.goBack();
  };
  // const handleBackButton = () => {
  //   navigation.navigate('Settings', {shortlistedItems});
  // };

  const renderZoomModal = () => {
    if (!selectedImage || !categories) {
      return null;
    }

    const images = categories.map(item => ({
      url: item.thumb,
    }));

    const initialIndex = categories.findIndex(
      item => item.thumb === selectedImage.uri,
    );

    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeZoomModal}>
        <ImageViewer
          imageUrls={images}
          index={initialIndex}
          enableSwipeDown
          onSwipeDown={closeZoomModal}
          backgroundColor="#123256"
        />
      </Modal>
    );
  };
  const renderItem = ({item}) => {
    const isBookmarked = shortlistedItems.some(
      bookmarkedItem => bookmarkedItem.prod_id === item.prod_id,
    );
    const navigateToList = () => {
      navigation.navigate('ItemList', {
        ctg_id: item.ctg_id,
        ctg_name: item.ctg_name,
      });
    };

    return (
      //   <TouchableOpacity style={styles.item} onPress={navigateToList}>

      //     <Image source={{uri: item.thumb}} style={styles.image} />
      //     <Text style={styles.textBox}>{item.prod_name} </Text>
      //   </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleImagePress({uri: item.thumb})}
        // key={item.prod_id}
        // onPress={() => console.log('Button pressed')}
        style={styles.ImageContainer2}>
        <Image source={{uri: item.thumb}} style={styles.recentUpload} />
        <Text style={styles.textBox}>{item.prod_name} </Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleIconPress(item)}>
          {/* Use a different icon for bookmarked and non-bookmarked items */}
          <Image
            source={
              isBookmarked
                ? require('../assets/tagfocused.png')
                : require('../assets/tag2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          /> */}
        </TouchableOpacity>
        <Text style={styles.title}>Exclusive</Text>
      </View>
      <FlatList
        // data={filteredCategories}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.prod_id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {renderZoomModal()}
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#123256',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    paddingLeft: wp(5),
    // paddingLeft: 20,
    height: hp(13),
  },
  backButton: {
    marginRight: 10,
    marginTop: hp(5.5),
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  title: {
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp(5),
  },
  listContainer: {
    justifyContent: 'center',

    paddingHorizontal: wp(5),
    paddingBottom: 50,
    marginTop: 20,
  },

  ImageContainer2: {
    height: wp('53%'),
    width: wp('43%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3.2%'),
    // marginLeft: wp('3.2%'),
    marginBottom: hp('2.3%'),
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
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
    padding: 7,
    justifyContent: 'center',
    textAlign: 'center',
    // fontSize: wp('3%'),
    // fontWeight: 'semibold',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    fontFamily: 'Lato-bold',
    color: '#000',
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    // top: '63%',
    top: '6%',
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#123256',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
