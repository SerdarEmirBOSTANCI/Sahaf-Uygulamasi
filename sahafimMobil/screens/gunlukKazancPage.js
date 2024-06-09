import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GunlukKazancPage = ({ soldBooks }) => {
  const [dailyEarnings, setDailyEarnings] = useState([]);

  useEffect(() => {
    const fetchDailyEarnings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('dailyEarnings');
        const storedDailyEarnings = jsonValue != null ? JSON.parse(jsonValue) : [];
        setDailyEarnings(storedDailyEarnings);
      } catch (error) {
        console.error('Error loading daily earnings:', error);
      }
    };

    fetchDailyEarnings();
  }, []);

  useEffect(() => {
    if (soldBooks && soldBooks.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const totalSoldBooks = soldBooks.reduce((acc, curr) => acc + curr.quantity, 0);
      const totalEarnings = soldBooks.reduce((acc, curr) => acc + curr.totalPrice, 0);

      const updatedDailyEarnings = [...dailyEarnings];
      const todayIndex = updatedDailyEarnings.findIndex(item => item.date === today);

      if (todayIndex !== -1) {
        updatedDailyEarnings[todayIndex] = {
          ...updatedDailyEarnings[todayIndex],
          soldBooks: updatedDailyEarnings[todayIndex].soldBooks + totalSoldBooks,
          totalEarnings: updatedDailyEarnings[todayIndex].totalEarnings + totalEarnings,
        };
      } else {
        updatedDailyEarnings.push({
          date: today,
          soldBooks: totalSoldBooks,
          totalEarnings: totalEarnings,
        });
      }

      setDailyEarnings(updatedDailyEarnings);
      AsyncStorage.setItem('dailyEarnings', JSON.stringify(updatedDailyEarnings));
    }
  }, [soldBooks]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.soldBooks}</Text>
      <Text style={styles.cell}>{item.totalEarnings} ₺</Text>
    </View>
  );

  const clearRecords = async () => {
    Alert.alert(
      'Tüm Kayıtlar Silinecek',
      'İşleme devam edilsin mi?',
      [
        {
          text: 'Vazgeç',
          onPress: () => console.log('Silme işlemi iptal edildi.'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('dailyEarnings');
              setDailyEarnings([]);
              console.log('Tüm kayıtlar başarıyla silindi.');
            } catch (error) {
              console.error('Error clearing records:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Günlük Kazanç Takibi</Text>
      </View>
      <Button title="Kayıtları Sil" onPress={clearRecords} color="red" />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.headerCell]}>Tarih</Text>
          <Text style={[styles.cell, styles.headerCell]}>Satılan Kitap Sayısı</Text>
          <Text style={[styles.cell, styles.headerCell]}>Toplam Gelir (₺)</Text>
        </View>
        <FlatList
          data={dailyEarnings}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  table: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default GunlukKazancPage;
