import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const handleLogout = async () => {
    try {
      // Remove the stored login details from AsyncStorage
      await AsyncStorage.removeItem('loggedInUser');
      console.log('Logged out successfully');
      setRemoveModalVisible(false);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error while logging out:', error);
    }
  };
  const handelModal = () => {
    setRemoveModalVisible(true);
  };
  const cancelRemoveItem = () => {
    setRemoveModalVisible(false);
  };
  const renderRemoveModal = () => {
    return (
      <Modal
        visible={removeModalVisible}
        transparent={true}
        onRequestClose={cancelRemoveItem}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to sign out?</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.modalButton}>Yes, Sign Out</Text>
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
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#123256'}}>
        {/* <ImageBackground
          source={require('../assets/account.png')}
          style={{padding: 20}}> */}
        <View style={{padding: 20}}>
          <Image
            source={require('../assets/account.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
              padding: 30,
              tintColor: 'white',
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              //   fontFamily: 'Roboto-Medium',
              //   marginBottom: 5,
            }}>
            Gaurang Kumbhar
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                fontSize: 12,
                marginRight: 5,
              }}>
              Sub Title
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>
        </View>
        {/* </ImageBackground> */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 10,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="share-social-outline" size={22} /> */}
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#000',
              }}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handelModal} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Ionicons name="exit-outline" size={22} /> */}
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#000',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {renderRemoveModal()}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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

  // modalButtons: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },
  modalButton: {
    marginLeft: 10,
    marginTop: 10,
    color: '#123256',
  },
  buttonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
