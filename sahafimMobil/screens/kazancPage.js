import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [rent, setRent] = useState('');
  const [bills, setBills] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadValues = async () => {
      try {
        const rentValue = await AsyncStorage.getItem('rent');
        const billsValue = await AsyncStorage.getItem('bills');
        if (rentValue !== null) setRent(rentValue);
        if (billsValue !== null) setBills(billsValue);

        const jsonValue = await AsyncStorage.getItem('dailyEarnings');
        const dailyEarnings = jsonValue != null ? JSON.parse(jsonValue) : [];

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyEarnings = dailyEarnings
          .filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
          })
          .reduce((acc, curr) => acc + curr.totalEarnings, 0);

        setMonthlyIncome(monthlyEarnings);

        const recordsValue = await AsyncStorage.getItem('records');
        const storedRecords = recordsValue != null ? JSON.parse(recordsValue) : [];
        setRecords(storedRecords);
      } catch (error) {
        console.error('Error loading values:', error);
      }
    };

    loadValues();
  }, []);

  const calculate = async () => {
    const monthlyRent = parseFloat(rent) || 0;
    const monthlyBills = parseFloat(bills) || 0;
    const totalExpenses = monthlyRent + monthlyBills;
    const netIncome = monthlyIncome - totalExpenses;

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    const monthYear = `${currentMonth} ${currentYear}`;
    const updatedRecords = [...records];
    const monthIndex = updatedRecords.findIndex(record => record.monthYear === monthYear);

    if (monthIndex !== -1) {
      updatedRecords[monthIndex] = {
        monthYear: monthYear,
        income: monthlyIncome,
        expenses: totalExpenses,
        netIncome: netIncome,
      };
    } else {
      updatedRecords.push({
        monthYear: monthYear,
        income: monthlyIncome,
        expenses: totalExpenses,
        netIncome: netIncome,
      });
    }

    setRecords(updatedRecords);

    try {
      await AsyncStorage.setItem('rent', rent);
      await AsyncStorage.setItem('bills', bills);
      await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

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
              await AsyncStorage.removeItem('records');
              setRecords([]);
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
      <Text style={styles.header}>Gelir ve Gider Hesaplayıcı</Text>
      <TextInput
        style={styles.input}
        placeholder="Kira Gideri"
        keyboardType="numeric"
        value={rent}
        onChangeText={setRent}
      />
      <TextInput
        style={styles.input}
        placeholder="Fatura Gideri"
        keyboardType="numeric"
        value={bills}
        onChangeText={setBills}
      />

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Hesapla</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearRecords}>
        <Text style={styles.clearButtonText}>Kayıtları Sil</Text>
      </TouchableOpacity>

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text style={styles.recordText}>{item.monthYear}</Text>
            <Text style={styles.recordText}>Gelir: {item.income} ₺</Text>
            <Text style={styles.recordText}>Gider: {item.expenses} ₺</Text>
            <Text style={styles.recordText}>Net Gelir: {item.netIncome} ₺</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
  },
  header: {
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
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  record: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  recordText: {
    fontSize: 16,
    color: '#495057',
  },
});
