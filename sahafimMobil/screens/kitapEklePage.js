import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KitapEkle = ({ onKitapEklendi }) => {
  const [kitapAdi, setKitapAdi] = useState('');
  const [yazarAdi, setYazarAdi] = useState('');
  const [kitapTuru, setKitapTuru] = useState('');
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [rafBilgisi, setRafBilgisi] = useState('');

  const kitapEkle = async () => {
    // Boş alan kontrolü
    if (!kitapAdi || !yazarAdi || !kitapTuru || !alisFiyati || !satisFiyati || !rafBilgisi) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const yeniKitap = {
      id: Math.floor(Math.random() * 1000), // Rastgele bir ID oluşturabiliriz
      kitapAdi,
      yazarAdi,
      kitapTuru,
      alisFiyati,
      satisFiyati,
      rafBilgisi,
    };

    // AsyncStorage'e yeni kitabı ekleyelim
    try {
      const jsonValue = await AsyncStorage.getItem('kitaplar');
      const storedKitaplar = jsonValue != null ? JSON.parse(jsonValue) : [];
      const yeniKitaplarListesi = [...storedKitaplar, yeniKitap];
      await AsyncStorage.setItem('kitaplar', JSON.stringify(yeniKitaplarListesi));
      // Kitap eklendiğinde parent bileşene haber verelim
      onKitapEklendi(yeniKitaplarListesi);
      // Bildiri gösterelim
      Alert.alert('Bildiri', 'Ekleme işlemi gerçekleştirildi.');
      // Formu temizleyelim
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
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setKitapAdi}
        value={kitapAdi}
        placeholder="Kitap Adı"
      />
      <TextInput
        style={styles.input}
        onChangeText={setYazarAdi}
        value={yazarAdi}
        placeholder="Yazar Adı"
      />
      <TextInput
        style={styles.input}
        onChangeText={setKitapTuru}
        value={kitapTuru}
        placeholder="Kitap Türü"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAlisFiyati}
        value={alisFiyati}
        placeholder="Alış Fiyatı"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSatisFiyati}
        value={satisFiyati}
        placeholder="Satış Fiyatı"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRafBilgisi}
        value={rafBilgisi}
        placeholder="Raf Bilgisi"
      />
      <Button onPress={kitapEkle} title="Kitap Ekle" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default KitapEkle;
