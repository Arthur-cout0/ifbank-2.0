import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Operation from '../screens/Operation';
import Profile from '../screens/Profile';
import History from '../screens/History';
import ProfileChange from '../screens/ProfileChange';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Operation" component={Operation} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={History} options={{headerShown: false}}/>
        <Stack.Screen name="ProfileChange" component={ProfileChange} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;