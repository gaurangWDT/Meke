import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {FontAwesome5} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Mocks, {categories} from './Mocks';
import back from '../assets/back.png';
import {productApi} from '../config';
import axios from 'axios';
import {useAppContext} from './AppContext';
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 600 ? 2 : 3;

const ItemList = ({navigation, route}) => {
  const {shortlistedItems, setShortlistedItems} = useAppContext();
  // const [shortlistedItems, setShortlistedItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [items, setItems] = useState([]);
  const {ctg_id, ctg_name} = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [products, setProducts] = useState('');

  const TruncateText = ({text, maxWords}) => {
    const words = text.split(' ');

    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + ' ...';
      return <Text style={styles.text}>{truncatedText}</Text>;
    }

    return <Text style={styles.text}>{text}</Text>;
  };
  // const handleIconPress = item => {
  //   // Check if the item is already bookmarked
  //   const isBookmarked = shortlistedItems.some(
  //     bookmarkedItem => bookmarkedItem.prod_id === item.prod_id,
  //   );

  //   if (isBookmarked) {
  //     // If already bookmarked, remove it from the list
  //     setShortlistedItems(prevBookmarkedItems =>
  //       prevBookmarkedItems.filter(
  //         bookmarkedItem => bookmarkedItem.prod_id !== item.prod_id,
  //       ),
  //     );
  //   } else {
  //     // If not bookmarked, add it to the list
  //     setShortlistedItems(prevBookmarkedItems => [
  //       ...prevBookmarkedItems,
  //       item,
  //     ]);
  //   }
  // };
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
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       // const response = await axios.get(`${productApi}${ctg_id}`);
  //       const response = await axios.get(`${productApi}${ctg_id}`);
  //       setProducts(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetch();
  //   const loadShortlistedItems = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('shortlistedItems');
  //       if (jsonValue !== null) {
  //         const parsedShortlistedItems = JSON.parse(jsonValue);
  //         setShortlistedItems(parsedShortlistedItems);
  //       }
  //     } catch (error) {
  //       console.log(
  //         'Error loading shortlisted items from AsyncStorage:',
  //         error,
  //       );
  //     }
  //   };

  //   loadShortlistedItems();
  // }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${productApi}${ctg_id}`);
        setProducts(response.data.data);
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

  const getCategoryName = () => {
    const selectedCategory = ctg_name;
    return selectedCategory ? selectedCategory : 'Browse Product';
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

  const renderZoomModal = () => {
    if (!selectedImage || !products) {
      return null;
    }

    const images = products.map(item => ({
      url: item.thumb,
    }));

    const initialIndex = products.findIndex(
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

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.item}
  //       onPress={() => handleImagePress({uri: item.thumb})}>
  //       <Image source={{uri: item.thumb}} style={styles.image} />
  //       <View style={styles.textBox}>
  //         <Text style={styles.text}>{item.prod_name} </Text>
  //       </View>
  //       <TouchableOpacity
  //         style={styles.iconContainer}
  //         onPress={() => handleIconPress(item)}>
  //         <Image source={require('../assets/tag2.png')} style={styles.icon} />
  //       </TouchableOpacity>
  //     </TouchableOpacity>
  //   );
  // };
  const renderItem = ({item}) => {
    // Check if the item is bookmarked
    const maxWordsToShow = 2;
    const isBookmarked = shortlistedItems.some(
      bookmarkedItem => bookmarkedItem.prod_id === item.prod_id,
    );

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleImagePress({uri: item.thumb})}>
        <Image source={{uri: item.thumb}} style={styles.image} />
        <View style={styles.textBox}>
          {/* <Text style={styles.text}>{item.prod_name} </Text> */}
          <TruncateText text={item.prod_name} maxWords={maxWordsToShow} />
        </View>
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
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackButton}>
          <Text style={styles.title}>{getCategoryName()}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
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

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 5,
    marginHorizontal: -1,
    // marginTop: 50,
    backgroundColor: 'white',
    paddingBottom: 1,
  },
  header: {
    backgroundColor: '#123256',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    // padding: 10,

    paddingLeft: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp(5),
  },
  category: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 16,
    paddingLeft: 18,
    color: 'white',
  },
  listContainer: {
    // paddingHorizontal: 8,
    // paddingBottom: 16,
    // marginTop: 20,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    paddingBottom: 50,
    marginTop: 20,
  },
  item: {
    // flex: 1,
    // margin: 12,
    // height: wp('53%'),
    // width: wp('46%'),
    // // height: screenWidth / numColumns,
    // // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // borderRadius: 20,
    // // maxWidth: screenWidth / numColumns,
    // borderWidth: 1,
    // borderColor: 'lightgrey',
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
  image: {
    // width: '100%',
    // height: '100%',
    // resizeMode: 'cover',
    // borderRadius: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  textBox: {
    // padding: 8,
    // justifyContent: 'center',
    marginTop: 10,
    // marginLeft: 30,
    textAlign: 'center',

    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    textAlign: 'center',
    // fontSize: wp('3%'),
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    fontFamily: 'Lato-bold',
    // fontWeight: 'semibold',
    // width: '65%',
    color: '#000',
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
