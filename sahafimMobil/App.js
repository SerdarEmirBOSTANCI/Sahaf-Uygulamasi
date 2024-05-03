// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import KitaplikPage from './screens/kitaplikPage';
import KitapEklePage from './screens/kitapEklePage';
import loginPage from './screens/loginPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginPage">
        <Stack.Screen
          name="loginPage"
          component={loginPage}
          options={{ title: 'Giris' }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'Ana Sayfa' }}
        />
        <Stack.Screen
          name="KitaplikPage"
          component={KitaplikPage}
          options={{ title: 'Kitaplık' }}
        />
        <Stack.Screen
          name="KitapEkle"
          component={KitapEklePage}
          options={{ title: 'KitapEkle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
