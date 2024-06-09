import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Giriş işlemleri burada yapılacak
    // Örneğin, kullanıcı adı ve şifre kontrolü gibi
    // navigation.navigate('HomePage'); // Giriş yapıldığında HomePage'e gitmek için
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('homePage')}>
          <Text style={styles.buttonText}>Giriş</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate ('registerPage')}>
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
