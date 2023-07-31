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
import React, {useState, useEffect} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useAppContext} from './AppContext';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {categoryApi} from '../config';
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 600 ? 2 : 3;
const isTablet = screenWidth >= 768;

const SettingsScreen = ({route}) => {
  // const {shortlistedItems} = route.params;
  // const shortlistedItems = route.params?.shortlistedItems || [];
  const {shortlistedItems, setShortlistedItems} = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  console.log(shortlistedItems);
  useEffect(() => {
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

  const TruncateText = ({text, maxWords}) => {
    const words = text.split(' ');

    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + ' ...';
      return <Text style={styles.textBox}>{truncatedText}</Text>;
    }

    return <Text style={styles.textBox}>{text}</Text>;
  };
  const handleLongPress = item => {
    setSelectedItem(item);
    setRemoveModalVisible(true);
  };

  const removeItemFromCart = async () => {
    if (selectedItem) {
      // Remove the selected item from the cart
      const updatedShortlistedItems = shortlistedItems.filter(
        item => item.prod_id !== selectedItem.prod_id,
      );

      try {
        // Save the updated cart items to AsyncStorage
        const jsonValue = JSON.stringify(updatedShortlistedItems);
        await AsyncStorage.setItem('shortlistedItems', jsonValue);

        // Update the state with the new cart items
        setShortlistedItems(updatedShortlistedItems);
      } catch (error) {
        console.log('Error saving updated cart items to AsyncStorage:', error);
      }

      // Close the remove modal
      setRemoveModalVisible(false);
      setSelectedItem(null);
    }
  };

  const cancelRemoveItem = () => {
    setRemoveModalVisible(false);
    setSelectedItem(null);
  };

  const handleImagePress = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeZoomModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
  const renderZoomModal = () => {
    if (!selectedImage || !shortlistedItems) {
      return null;
    }

    const images = shortlistedItems.map(item => ({
      url: item.thumb,
    }));

    const initialIndex = shortlistedItems.findIndex(
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
  const renderItem = ({item, index}) => {
    console.log(item.thumb);
    console.log(item.prod_name);
    const maxWordsToShow = 2;
    return (
      <TouchableOpacity
        style={styles.ImageContainer2}
        onPress={() => handleImagePress({uri: item.thumb})}
        onLongPress={() => handleLongPress(item)}>
        <Image source={{uri: item.thumb}} style={styles.recentUpload} />
        {/* <Text style={styles.textBox}>{item.prod_name}</Text> */}
        <TruncateText text={item.prod_name} maxWords={maxWordsToShow} />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleLongPress(item)}>
          {/* Use a different icon for bookmarked and non-bookmarked items */}
          <Image
            source={
              // isBookmarked
              // ?
              require('../assets/tagfocused.png')
              // :
              // require('../assets/tag2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const renderRemoveModal = () => {
    return (
      <Modal
        visible={removeModalVisible}
        transparent={true}
        onRequestClose={cancelRemoveItem}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Do you want to remove this item from the cart?</Text>
            <TouchableOpacity onPress={removeItemFromCart}>
              <Text style={styles.modalButton}>Yes, Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelRemoveItem}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    // {/* <Text>Shortlisted Items:</Text>
    // {shortlistedItems.map((item, index) => (
    //   <Text key={index}>{item?.prod_name}</Text>
    // ))}
    // {shortlistedItems.map((item, index) => (
    //   <Image
    //     key={index}
    //     source={{uri: item?.thumb}}
    //     style={styles.recentUpload}
    //   />
    // ))} */}

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          /> */}
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>
      <View
        onLayout={event => console.log('Layout:', event.nativeEvent.layout)}>
        <FlatList
          data={shortlistedItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.prod_id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
        {renderZoomModal()}
        {renderRemoveModal()}
      </View>
    </View>
  );
};

export default SettingsScreen;

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
    fontSize: wp('3.5%'),
    fontWeight: 'bold',

    color: '#000',
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    // top: '63%',
    top: '5%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalButton: {
    marginTop: 10,
    color: '#123256',
  },
});
