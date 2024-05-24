import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [username, setUsername] = useState('Kullanıcı Adı');
  const [password, setPassword] = useState('');
  const [bookCount, setBookCount] = useState(10);  // Örnek kitap sayısı
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = () => {
    // Şifre güncelleme işlemi burada yapılacak
    alert('Şifre güncellendi');
    setPassword(newPassword);
    setNewPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kullanıcı Adı:</Text>
      <Text style={styles.value}>{username}</Text>

      <Text style={styles.label}>Mevcut Kitap Sayısı:</Text>
      <Text style={styles.value}>{bookCount}</Text>

      

      <Text style={styles.label}>Yeni Şifre:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Button title="Şifremi Güncelle" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;
