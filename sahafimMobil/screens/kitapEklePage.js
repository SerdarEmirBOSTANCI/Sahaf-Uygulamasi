import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KitapEkle = ({ onKitapEklendi }) => {
  const [kitapAdi, setKitapAdi] = useState('');
  const [yazarAdi, setYazarAdi] = useState('');
  const [kitapTuru, setKitapTuru] = useState('');
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [rafBilgisi, setRafBilgisi] = useState('');

  const kitapEkle = async () => {
    if (!kitapAdi || !yazarAdi || !kitapTuru || !alisFiyati || !satisFiyati || !rafBilgisi) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const yeniKitap = {
      id: Math.floor(Math.random() * 1000),
      kitapAdi,
      yazarAdi,
      kitapTuru,
      alisFiyati,
      satisFiyati,
      rafBilgisi,
    };

    try {
      const jsonValue = await AsyncStorage.getItem('kitaplar');
      const storedKitaplar = jsonValue != null ? JSON.parse(jsonValue) : [];
      const yeniKitaplarListesi = [...storedKitaplar, yeniKitap];
      await AsyncStorage.setItem('kitaplar', JSON.stringify(yeniKitaplarListesi));
      onKitapEklendi(yeniKitaplarListesi);
      Alert.alert('Bildiri', 'Ekleme işlemi gerçekleştirildi.');
      setKitapAdi('');
      setYazarAdi('');
      setKitapTuru('');
      setAlisFiyati('');
      setSatisFiyati('');
      setRafBilgisi('');
    } catch (error) {
      console.error('Error adding kitap:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setKitapAdi}
        value={kitapAdi}
        placeholder="Kitap Adı"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={setYazarAdi}
        value={yazarAdi}
        placeholder="Yazar Adı"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={setKitapTuru}
        value={kitapTuru}
        placeholder="Kitap Türü"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAlisFiyati}
        value={alisFiyati}
        placeholder="Alış Fiyatı"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSatisFiyati}
        value={satisFiyati}
        placeholder="Satış Fiyatı"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRafBilgisi}
        value={rafBilgisi}
        placeholder="Raf Bilgisi"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={kitapEkle}>
        <Text style={styles.buttonText}>Kitap Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default KitapEkle;
