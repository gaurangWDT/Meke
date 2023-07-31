import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import {loginAPi} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const inputs = useRef([]);
  const [enteredPin, setEnteredPin] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(loginAPi);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in (using AsyncStorage)
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (user) {
        // User is already logged in, navigate to the authenticated screen
        navigation.navigate('Drawer'); // Change 'Drawer' to the appropriate route name
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handlePhoneNumberChange = text => {
    // Remove any non-digit characters from the input
    const formattedText = text.replace(/\D/g, '');

    // Restrict the input to a maximum of 10 digits
    const truncatedText = formattedText.slice(0, 10);

    setPhoneNumber(truncatedText);
  };

  const handleOtpChange = (value, index) => {
    // Check if the entered value is a digit
    if (/^\d+$/.test(value)) {
      const newOtp = [...otp];

      // Update the OTP value
      newOtp[index] = value;
      setOtp(newOtp.join(''));

      // Move focus to the next input box
      if (index < 4 && value !== '') {
        inputs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];

      // Clear the OTP value
      newOtp[index] = '';
      setOtp(newOtp.join(''));

      // Move focus to the previous input box
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleOtpKeyPress = (event, index) => {
    // Handle backspace/delete key press
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      event.preventDefault(); // Prevent the default behavior of the backspace key

      const newOtp = [...otp];

      // Clear the OTP value
      newOtp[index - 1] = '';
      setOtp(newOtp.join(''));
      if (index === otp.length - 1) {
        newOtp.pop();
        setOtp(newOtp);
      }
      // Move focus back to the previous input box
      if (inputs.current[index - 1]) {
        inputs.current[index - 1].focus();
      }
    } else if (
      event.nativeEvent.key !== 'Backspace' &&
      index < otp.length - 1
    ) {
      // Move focus to the next input box if it's not the last input box
      event.preventDefault(); // Prevent the default behavior of the key press
      inputs.current[index + 1].focus();
    }
  };

  const handleOtpPaste = event => {
    // Remove non-digit characters and take only the first 5 digits
    const pastedOtp = event.nativeEvent.text.replace(/\D/g, '').slice(0, 5);
    setOtp(pastedOtp);
  };

  const handleLogin = () => {
    const enteredPin = parseInt(otp); // Convert the OTP array to a string
    const apiUrl = `https://temp.wedeveloptech.in/meke/api/requserlogin-ax.php?phno=${phoneNumber}`;
    console.log(apiUrl);
    if (phoneNumber.length === 10) {
      axios
        .get(apiUrl) // Fetch user data from the API based on the phone number
        .then(response => {
          const users = response.data.data.phoneno; // Get the array of users from the response
          const password = response.data.data.password;

          if (users === phoneNumber) {
            if (enteredPin === password) {
              console.log('Login successful');
              AsyncStorage.setItem(
                'loggedInUser',
                JSON.stringify({phoneNumber, password}),
              );
              navigation.navigate('Drawer');
            } else {
              Alert.alert('Invalid PIN', 'Please enter a valid PIN.');
            }
          } else {
            Alert.alert(
              'Invalid User',
              'The entered phone number does not exist in the database.',
            );
          }
          // if (enteredPin === 12345) {
          //   axios.post(apiUrl);
          //   console.log('success');
          // }
        })
        .catch(error => {
          console.log('Error:', error);
        });
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid Phone Number.');
    }
  };

  const handleLogout = async () => {
    try {
      // Remove the stored login details from AsyncStorage
      await AsyncStorage.removeItem('loggedInUser');
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Error while logging out:', error);
    }
  };

  const handlePinChange = pin => {
    setEnteredPin(pin);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <View style={styles.pageContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/LoginAsset.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Please enter your registered phone number to sign in
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="(+91) Enter Phone No."
            placeholderTextColor={'#494949'}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            maxLength={10}
          />
          <Image source={require('../assets/phone.png')} style={styles.icon} />
        </View>
        <Text style={styles.pin}>Enter Pin</Text>
        <View style={styles.otpContainer}>
          {Array.from({length: 5}).map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputotp}
              maxLength={1}
              value={otp[index] || ''}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={event => handleOtpKeyPress(event, index)}
              onPaste={handleOtpPaste}
              keyboardType="numeric"
              ref={ref => (inputs.current[index] = ref)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: RFPercentage(2.5),
              color: 'white',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity>
            <Text style={styles.subtitle}>Forgot Password</Text>
          </TouchableOpacity>
          <Text style={styles.subtitle}> | </Text>
          <TouchableOpacity>
            <Text style={styles.subtitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    color: '#000000',
    // fontSize: 12,
    fontSize: RFPercentage(1.7),
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    color: '#123256',
    // fontSize: 18,
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageContainer: {
    alignItems: 'center',
    // paddingHorizontal: 60,
    paddingHorizontal: wp(15),
    // paddingTop: 100,
    // paddingTop: wp(28),
    paddingTop: hp(15),
    width: width - 40, // Adjust the width as needed
    marginHorizontal: 20, // Adjust the horizontal margin as needed
  },
  imageContainer: {
    // height: 100, // Adjust the container height as needed
    height: wp(25),
    width: 150, // Adjust the container width as needed
    // marginBottom: 80,
    marginBottom: hp(10),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: hp(3),
  },
  input: {
    flex: 1,
    height: 40,
    // fontSize: 12,
    fontSize: RFPercentage(1.7),
    paddingLeft: 5,
    color: '#000000',
  },
  icon: {
    width: 13,
    height: 20,
    marginLeft: 10,
  },
  pin: {
    textAlign: 'left',
    width: '100%',
    color: '#000000',
    // fontSize: 12,
    fontSize: RFPercentage(1.7),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputotp: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
    color: '#000000',
  },
  btn: {
    height: wp(15),
    // height: 60,
    // width: '110%',
    width: wp(65),
    backgroundColor: '#123256',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 40,
    marginTop: hp(6),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
