import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homePage from './screens/homePage';
import KitaplikPage from './screens/kitaplikPage';
import KitapEklePage from './screens/kitapEklePage';
import gunlukKazancPage from './screens/gunlukKazancPage';
import loginPage from './screens/loginPage';
import registerPage from './screens/registerPage';
import kazancPage from './screens/kazancPage';

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
          options={{ title: 'Kitaplık' }}
        />
        {(props) => <KitaplikSayfasi {...props} kitaplar={kitaplar} />}
        <Stack.Screen
          name="KitapEklePage"
          component={KitapEklePage}
          options={{ title: 'Kitap Ekle' }}
        />
        {(props) => <KitapEklePage {...props} onKitaplarGuncellendi={handleKitaplarGuncellendi} />}
        <Stack.Screen
          name="kazancPage"
          component={kazancPage}
          options={{ title: 'Aylık Gelir' }}
        />
        <Stack.Screen
          name="gunlukKazancPage"
          component={gunlukKazancPage}
          options={{ title: 'Günlük Kazanç' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
