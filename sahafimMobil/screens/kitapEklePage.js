import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const KitapEklePage = () => {
  const [kitapAdi, setKitapAdi] = useState('');
  const [yazarAdi, setYazarAdi] = useState('');
  const [kitapTuru, setKitapTuru] = useState('');
  const [kitapResmi, setKitapResmi] = useState('');
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [rafBilgisi, setRafBilgisi] = useState('');

  const handleKitapEkle = () => {
    console.log({
      kitapAdi,
      yazarAdi,
      kitapTuru,
      kitapResmi,
      alisFiyati,
      satisFiyati,
      rafBilgisi
    });

    // Kitap eklendikten sonra formları sıfırla
    setKitapAdi('');
    setYazarAdi('');
    setKitapTuru('');
    setKitapResmi('');
    setAlisFiyati('');
    setSatisFiyati('');
    setRafBilgisi('');
  };

  return (
    <View>
      <Text>Kitap Adı:</Text>
      <TextInput
        value={kitapAdi}
        onChangeText={setKitapAdi}
      />
      <Text>Yazar Adı:</Text>
      <TextInput
        value={yazarAdi}
        onChangeText={setYazarAdi}
      />
      <Text>Kitap Türü:</Text>
      <TextInput
        value={kitapTuru}
        onChangeText={setKitapTuru}
      />
      <Text>Kitap Resmi:</Text>
      <TextInput
        value={kitapResmi}
        onChangeText={setKitapResmi}
      />
      <Text>Alış Fiyatı:</Text>
      <TextInput
        value={alisFiyati}
        onChangeText={setAlisFiyati}
        keyboardType="numeric"
      />
      <Text>Satış Fiyatı:</Text>
      <TextInput
        value={satisFiyati}
        onChangeText={setSatisFiyati}
        keyboardType="numeric"
      />
      <Text>Raf Bilgisi:</Text>
      <TextInput
        value={rafBilgisi}
        onChangeText={setRafBilgisi}
      />
      <Button
        title="Kitap Ekle"
        onPress={handleKitapEkle}
      />
    </View>
  );
};

export default KitapEklePage;
