import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KitapEklePage = () => {
  const [kitaplar, setKitaplar] = useState([]);
  const [filtrelenmisKitaplar, setFiltrelenmisKitaplar] = useState([]);
  const [aramaKelimesi, setAramaKelimesi] = useState('');
  const [gunlukKar, setGunlukKar] = useState(0);
  const [satilanKitapSayisi, setSatilanKitapSayisi] = useState(0);

  useEffect(() => {
    const loadKitaplar = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('kitaplar');
        const loadedKitaplar = jsonValue != null ? JSON.parse(jsonValue) : [];
        setKitaplar(loadedKitaplar);
        setFiltrelenmisKitaplar(loadedKitaplar);
      } catch (error) {
        console.error('Error loading kitaplar from AsyncStorage:', error);
      }
    };
    loadKitaplar();
  }, []);

  useEffect(() => {
    const fetchDailyEarnings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('dailyEarnings');
        const storedDailyEarnings = jsonValue != null ? JSON.parse(jsonValue) : [];
        const today = new Date().toISOString().split('T')[0];
        const todayIndex = storedDailyEarnings.findIndex(item => item.date === today);
        if (todayIndex !== -1) {
          setGunlukKar(storedDailyEarnings[todayIndex].totalEarnings);
          setSatilanKitapSayisi(storedDailyEarnings[todayIndex].soldBooks);
        }
      } catch (error) {
        console.error('Error loading daily earnings:', error);
      }
    };
    fetchDailyEarnings();
  }, []);

  useEffect(() => {
    aramayiUygula();
  }, [aramaKelimesi]);

  const aramayiUygula = () => {
    const filtreli = kitaplar.filter(kitap =>
      kitap.kitapAdi.toLowerCase().includes(aramaKelimesi.toLowerCase()) ||
      kitap.kitapTuru.toLowerCase().includes(aramaKelimesi.toLowerCase()) ||
      kitap.yazarAdi.toLowerCase().includes(aramaKelimesi.toLocaleLowerCase())
    );
    setFiltrelenmisKitaplar(filtreli);
  };

  const calculateDailyEarnings = async (satisFiyati, alisFiyati) => {
    try {
      const jsonValue = await AsyncStorage.getItem('dailyEarnings');
      let dailyEarnings = jsonValue != null ? JSON.parse(jsonValue) : [];

      const today = new Date().toISOString().split('T')[0];
      const todayIndex = dailyEarnings.findIndex(item => item.date === today);

      const kar = satisFiyati - alisFiyati;

      if (todayIndex !== -1) {
        dailyEarnings[todayIndex] = {
          ...dailyEarnings[todayIndex],
          totalEarnings: dailyEarnings[todayIndex].totalEarnings + kar,
          soldBooks: dailyEarnings[todayIndex].soldBooks + 1,
        };
      } else {
        dailyEarnings.push({
          date: today,
          soldBooks: 1,
          buyBooks: 0,
          totalEarnings: kar,
        });
      }

      await AsyncStorage.setItem('dailyEarnings', JSON.stringify(dailyEarnings));
      setGunlukKar(dailyEarnings[todayIndex]?.totalEarnings || kar);
      setSatilanKitapSayisi(dailyEarnings[todayIndex]?.soldBooks || 1);
    } catch (error) {
      console.error('Error calculating daily earnings:', error);
    }
  };

  const kitabiSil = async (id) => {
    try {
      const updatedKitaplar = filtrelenmisKitaplar.filter(kitap => kitap.id !== id);
      setFiltrelenmisKitaplar(updatedKitaplar);
      await AsyncStorage.setItem('kitaplar', JSON.stringify(updatedKitaplar));
    } catch (error) {
      console.error('Error deleting kitap:', error);
    }
  };

  const kitabiSat = async (id, satisFiyati, alisFiyati) => {
    try {
      const updatedKitaplar = filtrelenmisKitaplar.filter(kitap => {
        if (kitap.id === id) {
          calculateDailyEarnings(satisFiyati, alisFiyati); // Günlük kazancı hesapla ve sakla
          return false;
        }
        return true;
      });
      setFiltrelenmisKitaplar(updatedKitaplar);
      await AsyncStorage.setItem('kitaplar', JSON.stringify(updatedKitaplar));
    } catch (error) {
      console.error('Error selling kitap:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setAramaKelimesi(text)}
        value={aramaKelimesi}
        placeholder="Ara"
      />
      <FlatList
        data={filtrelenmisKitaplar}
        renderItem={({ item }) => (
          <View style={styles.kitapContainer}>
            <View style={styles.kitapBilgi}>
              <Text style={styles.kitapYazi}>Kitap Adı: {item.kitapAdi}</Text>
              <Text style={styles.kitapYazi}>Yazar Adı: {item.yazarAdi}</Text>
              <Text style={styles.kitapYazi}>Kitap Türü: {item.kitapTuru}</Text>
              <Text style={styles.kitapYazi}>Alış Fiyatı: {item.alisFiyati}</Text>
              <Text style={styles.kitapYazi}>Satış Fiyatı: {item.satisFiyati}</Text>
              <Text style={styles.kitapYazi}>Raf Bilgisi: {item.rafBilgisi}</Text> 
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.satButton} onPress={() => kitabiSat(item.id, item.satisFiyati, item.alisFiyati)}>
                  <Text style={styles.buttonText}>Sat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.silButton} onPress={() => kitabiSil(item.id)}>
                  <Text style={styles.buttonText}>Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.karContainer}>
        <Text style={styles.karYazi}>Günlük Kar: {gunlukKar} TL</Text>
        <Text style={styles.karYazi}>Satılan Kitap Sayısı: {satilanKitapSayisi}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eee',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  kitapContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  kitapBilgi: {
    flex: 1,
  },
  kitapYazi: {
    fontSize: 16,
    marginBottom: 5,
    color: '#343a40',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  satButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  silButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  karContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  karYazi: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343a40',
  },
});

export default KitapEklePage;
