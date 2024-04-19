// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/homePage'; // HomePage dosyanızın yolunu doğru şekilde vermelisiniz.
import KitaplikPage from './screens/kitaplikPage'; // KitaplikPage dosyanızın yolunu doğru şekilde vermelisiniz.

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
