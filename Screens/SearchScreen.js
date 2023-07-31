import React, {useState, useEffect} from 'react';

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Mocks, {categories} from './Mocks';
import search from '../assets/search.png';
import axios from 'axios';
import {categoryApi} from '../config';
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 600 ? 2 : 3;
const isTablet = screenWidth >= 768;

const SearchScreen = ({navigation}) => {
  // const navigation = useNavigation();

  const [categories, setCategories] = useState('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(categoryApi);
        setCategories(response.data.data);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const renderItem = ({item}) => {
    const navigateToList = () => {
      navigation.navigate('ItemList', {
        ctg_id: item.ctg_id,
        ctg_name: item.ctg_name,
      });
    };

    return (
      <TouchableOpacity style={styles.item} onPress={navigateToList}>
        {/* <Image source={{uri: item.thumb}} style={styles.image} />
        <View style={{color: 'white'}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Lato-bold',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {item.ctg_name}
          </Text>
        </View> */}
        <Image source={{uri: item.thumb}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.ctg_name}</Text>
        </View>
      </TouchableOpacity>
      /* <TouchableOpacity
        
        style={styles.ImageContainer2}>
        <Image source={{uri: item.thumb}} style={styles.recentUpload} />
        <Text style={styles.textBox}>{item.prod_name} </Text>
      </TouchableOpacity>  */
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = () => {
    const filtered = categories.filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCategories(filtered);
    setModalVisible(false);
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
        <Text style={styles.title}>Select Category</Text>
      </View>

      <FlatList
        // data={filteredCategories}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.ctg_id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  // header: {
  //   backgroundColor: '#123256',
  //   borderBottomLeftRadius: 40,
  //   borderBottomRightRadius: 40,
  //   flexDirection: 'row',
  //   padding: 10,
  //   paddingLeft: 20,
  //   height: hp(13),
  //   // marginBottom: 30,
  // },
  // backButton: {
  //   marginRight: 10,
  //   marginTop: hp(5.5),
  // },
  // backIcon: {
  //   width: 20,
  //   height: 20,
  //   tintColor: 'white',
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginTop: hp(5),
  // },
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
  // item: {
  //   flex: 1,
  //   // margin: 8,
  //   marginTop: wp(4),
  //   marginBottom: wp(3),
  //   // marginBottom: 12,
  //   marginHorizontal: wp(2.3),
  //   height: hp(25),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   // borderRadius: 10,

  //   borderRadius: wp(6),
  //   maxWidth: screenWidth / numColumns - 30,
  //   // backgroundColor: '#123256',
  // },
  item: {
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
  // image: {
  //   width: '100%',
  //   height: '80%',
  //   resizeMode: 'cover',
  //   // borderRadius: wp(6),
  //   borderTopRightRadius: wp(6),
  //   borderTopLeftRadius: wp(6),
  //   // opacity: 0.4,
  // },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
  },
  // textContainer: {
  //   width: '100%',
  //   // position: 'absolute',
  //   // bottom: 0,
  //   alignItems: 'center',

  //   // paddingVertical: '40%',

  //   // paddingTop: 7,
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   // fontSize: 14,

  //   // borderWidth: 1,
  //   borderBottomWidth: 1,
  //   borderRightWidth: 1,
  //   borderLeftWidth: 1,
  //   borderColor: 'lightgrey',
  //   color: '#000',
  //   width: '100%',
  //   height: '25%',
  //   // borderRadius: 20,
  //   borderBottomLeftRadius: 20,
  //   borderBottomRightRadius: 20,
  // },
  textContainer: {
    padding: 7,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: wp('3%'),
    fontWeight: 'semibold',

    color: '#000',
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: '#000',
    fontFamily: 'Lato-bold',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',

    textAlign: 'center',
  },
});
