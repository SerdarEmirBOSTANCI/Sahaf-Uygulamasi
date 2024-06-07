import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const KitaplikSayfasi = () => {
  const [kitaplar, setKitaplar] = useState([
    { id: '1', baslik: 'Kitap 1', yazar: 'Yazar 1', tur: 'Kurgu', fiyat: '₺25', raf: '1. Raf' },
    { id: '2', baslik: 'Kitap 2', yazar: 'Yazar 2', tur: 'Bilim Kurgu', fiyat: '₺30', raf: '2. Raf' },
    { id: '3', baslik: 'Kitap 3', yazar: 'Yazar 3', tur: 'Bilgi', fiyat: '₺20', raf: '1. Raf' },
    // Diğer kitaplar buraya eklenebilir
  ]);

  const [aramaKelimesi, setAramaKelimesi] = useState('');
  const [filtrelenmisKitaplar, setFiltrelenmisKitaplar] = useState(kitaplar);

  const aramayiUygula = () => {
    const filtreli = kitaplar.filter(kitap =>
      kitap.baslik.toLowerCase().includes(aramaKelimesi.toLowerCase()) ||
      kitap.tur.toLowerCase().includes(aramaKelimesi.toLowerCase())
    );
    setFiltrelenmisKitaplar(filtreli);
  };

  const kitabiSat = (id) => {
    // Kitabın satış işlemleri burada gerçekleştirilebilir
    console.log('Kitap satıldı:', id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setAramaKelimesi(text)}
        value={aramaKelimesi}
        placeholder="Başlık veya türe göre ara"
      />
      <Button onPress={aramayiUygula} title="Ara" />

      <FlatList
        data={filtrelenmisKitaplar}
        renderItem={({ item }) => (
          <View style={styles.kitapContainer}>
            <View style={styles.kitapBilgi}>
              <Text style={styles.kitapYazi}>Başlık: {item.baslik}</Text>
              <Text style={styles.kitapYazi}>Yazar: {item.yazar}</Text>
              <Text style={styles.kitapYazi}>Fiyat: {item.fiyat}</Text>
              <Text style={styles.kitapYazi}>Tür: {item.tur}</Text>
              <Text style={styles.kitapYazi}>Raf: {item.raf}</Text>
            </View>
            <TouchableOpacity onPress={() => kitabiSat(item.id)} style={styles.satButton}>
              <Text style={styles.satButtonText}>Sat</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filtreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filtreButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  filtreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  kitapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  kitapBilgi: {
    flex: 1,
  },
  kitapYazi: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  satButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  satButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default KitaplikSayfasi;
