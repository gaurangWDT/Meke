import React, {useState} from 'react';
import {
  View,
  Modal,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker/src';
// import ImagePicker from '@react-native-community/image-picker';
// import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import FontAwesome5 from 'react-native-vector-icons';
import camera from '../assets/camera.png';
import gallery from '../assets/gallery.png';
const categories = ['Ring', 'Bracelet', 'Earing']; // List of available categories

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const generateRandomString = length => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };
  const generateUniqueFileName = () => {
    const timestamp = Date.now();
    const randomString = generateRandomString(5);
    const imageName = `image_${timestamp}_${randomString}.jpg`; // You can change the file extension based on your image format
    return imageName;
  };

  const uploadImage = async image => {
    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpeg', // Change the type according to your image format
      name: generateUniqueFileName(), // Change the name if needed
    });
    formData.append('cid', 1);

    try {
      const response = await axios.post(
        `https://temp.wedeveloptech.in/meke/api/reqsaveimage-ax.php?cid=1`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(formData);
      console.log('response', response.data);
      console.log('Image', selectedImage);
      console.log('Image uploaded successfully');
      // Handle the response from the server if needed
    } catch (error) {
      console.log('Image upload failed: ', error);
      // Handle the error if needed
    }
  };
  const sendData = () => {
    try {
      const data = {
        checkboxValues,
        price,
        consumption,
        currentuse,
        notes,
      };

      const response = axios.post(
        // 'https://temp.wedeveloptech.in/vimal/api-2/reqrequirement-ax.php?eid=1',
        'https://eo5pmqy79730vxq.m.pipedream.net/',
        data,
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  const pickImage = () => {
    const options = {
      title: 'Capture Image',
      mediaType: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedImage(response.assets[0].uri);
        setModalVisible(true);
      }
    });
  };

  const selectCategory = category => {
    setSelectedCategory(category);
  };
  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedImage(response.assets[0].uri);
        setModalVisible(true);
        console.log(selectedImage);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: wp(3),
          marginVertical: wp(10),
        }}>
        <Text style={{fontSize: 25, fontWeight: '500', color: '#494949'}}>
          {' '}
          Add Your{' '}
        </Text>
        <Text style={{fontSize: 25, fontWeight: '300', color: '#000000'}}>
          {' '}
          Jewellery
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <View>
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Image source={camera} style={{height: '60%', width: '60%'}} />
            {/* <FontAwesome5 name="camera" size={50} color="#fcbc05" /> */}
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: '300', color: '#000000'}}>
            Pick Image
          </Text>
          <Text style={{fontSize: 15, fontWeight: '300', color: '#000000'}}>
            from Camera
          </Text>
        </View>
        <View style={{marginLeft: 30}}>
          <TouchableOpacity style={styles.btn} onPress={selectImage}>
            <Image source={gallery} style={{height: '60%', width: '60%'}} />
            {/* <FontAwesome5 name="file-image" size={50} color="#fcbc05" /> */}
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: '300', color: '#000000'}}>
            Pick Image
          </Text>
          <Text style={{fontSize: 15, fontWeight: '300', color: '#000000'}}>
            from Gallery
          </Text>
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image
                style={styles.imagePreview}
                source={{uri: selectedImage}}
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {/* <RNPickerSelect
              onValueChange={value => selectCategory(value)}
              items={categories.map(category => ({
                label: category,
                value: category,
              }))}
              placeholder={{label: 'Select a category', value: null}}
              style={pickerSelectStyles}
              value={selectedCategory}
            /> */}
            <Button title="Upload" onPress={uploadImage} color="#fcbc05" />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="#fcbc05"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  btn: {
    flexDirection: 'column',
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fcbc05',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreviewContainer: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

// import React, {useState} from 'react';
// import {
//   View,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
// } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const AddItem = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleCameraCapture = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 200,
//       maxWidth: 200,
//     };

//     launchCamera(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image capture');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         setSelectedImage(response.uri);
//       }
//     });
//   };

//   const handleImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 200,
//       maxWidth: 200,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         console.log(response.assets[0].uri);
//         setSelectedImage(response.assets[0].uri);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleCameraCapture}>
//         <Text style={styles.buttonText}>Capture Image</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
//         <Text style={styles.buttonText}>Pick Image</Text>
//       </TouchableOpacity>

//       {selectedImage && (
//         <Image source={{uri: selectedImage}} style={styles.image} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#fcbc05',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
// });

// export default AddItem;
