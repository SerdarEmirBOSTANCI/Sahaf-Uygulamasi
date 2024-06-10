import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      if (users) {
        const userList = JSON.parse(users);
        const user = userList.find(user => user.username === username && user.password === password);
        if (user) {
          navigation.navigate('homePage');
          setUsername('');
          setPassword('');
        } else {
          Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre.');
        }
      } else {
        Alert.alert('Hata', 'Kayıtlı kullanıcı bulunamadı.');
      }
    } catch (error) {
      console.error('Error checking login info:', error);
      Alert.alert('Hata', 'Giriş bilgileri kontrol edilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sahafım</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('registerPage')}>
        <Text>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#eee'
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 200,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
  },
});

export default LoginScreen;
