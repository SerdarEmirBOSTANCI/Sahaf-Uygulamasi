import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Sahafım</Text>
      <View style={styles.butonlarContainer}>
        <TouchableOpacity style={styles.buton} onPress={() => navigation.navigate('Kitaplik')}>
          <Text style={styles.butonMetin}>Kitaplık</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton}>
          <Text style={styles.butonMetin}>Kitap Ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.butonlarContainer}>
        <TouchableOpacity style={styles.buton}>
          <Text style={styles.butonMetin}>Günlük Kazanç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton}>
          <Text style={styles.butonMetin}>Aylık Kazanç</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.butonlarContainer}>
        <TouchableOpacity style={styles.buton}>
          <Text style={styles.butonMetin}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baslik: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'font1',
    marginBottom: 20,
  },
  butonlarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buton: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Butonların arasına sağ taraftan 10 birimlik boşluk eklendi
  },
  butonMetin: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomePage;
