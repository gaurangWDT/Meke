// import Cards from './Screens/Cards';
import Navigation from './Navigation';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SearchScreen from './Screens/SearchScreen';
import HomeScreen2 from './Screens/HomeScreen2';
import Star from './Screens/Star';
import ItemList from './Screens/ItemList';
// import {Text} from 'react-native';
import Onboarding from './Screens/OnBoarding';
import DrawerDemo from './Screens/DrawerDemo';
// import DemoScreen from './Screens/DemoScreen';
import {AppProvider} from './Screens/AppContext';
import DrawerNavigator from './Screens/DrawerNavigator';

const App = () => {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
};

export default App;
