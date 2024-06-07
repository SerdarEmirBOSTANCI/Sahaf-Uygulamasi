// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homePage from './screens/homePage';
import KitaplikPage from './screens/kitaplikPage';
import KitapEklePage from './screens/kitapEklePage';
import kazancPage from './screens/kazancPage';
import gunlukKazancPage from './screens/gunlukKazancPage';
import porfilPage from './screens/profilPage';
import loginPage from './screens/loginPage';
import registerPage from './screens/registerPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginPage">
        <Stack.Screen
          name="loginPage"
          component={loginPage}
          options={{ title: 'Giriş' }}
        />
        <Stack.Screen
          name="registerPage"
          component={registerPage}
          options={{ title: 'Kayıt Ol' }}
        />
        <Stack.Screen
          name="homePage"
          component={homePage}
          options={{ title: 'Ana Sayfa' }}
        />
        
        <Stack.Screen
          name="KitaplikPage"
          component={KitaplikPage}
          options={{ title: 'Kitaplik' }}
        />
        <Stack.Screen
          name="KitapEkle"
          component={KitapEklePage}
          options={{ title: 'KitapEkle' }}
        />
        <Stack.Screen
          name="kazancPage"
          component={kazancPage}
          options={{ title: 'kazanç' }}
        />
        <Stack.Screen
          name="gunlukKazancPage"
          component={gunlukKazancPage}
          options={{ title: 'Günlük Kazanç' }}
        />
        <Stack.Screen
          name="profilPage"
          component={porfilPage}
          options={{ title: 'Profil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
