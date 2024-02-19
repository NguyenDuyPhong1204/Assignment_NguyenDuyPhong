/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Login } from './screen/Login';
import { Register } from './screen/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainActivity } from './screen/MainActivity';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Favorite } from './screen/Favorite';
import { TabNavigator } from './routers/navigations/TabNavigator';
import { Cart } from './screen/Cart';
import { PaymentHistory } from './screen/PaymentHistory';
import { Welcome } from './screen/Welcome';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={Welcome} options={{animation:'slide_from_right'}}></Stack.Screen>
        <Stack.Screen name='Login' component={Login} options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name='Register' component={Register} options={{animation:'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name='Tab' component={TabNavigator} options={{ animation: 'slide_from_bottom' }}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>



  );
}



export default App;
