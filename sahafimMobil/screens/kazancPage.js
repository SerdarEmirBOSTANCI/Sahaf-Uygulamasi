import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [rent, setRent] = useState('');
  const [bills, setBills] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [records, setRecords] = useState([]);

  const calculate = () => {
    const monthlyIncome = parseFloat(income) || 0;
    const monthlyRent = parseFloat(rent) || 0;
    const monthlyBills = parseFloat(bills) || 0;
    const totalExpenses = monthlyRent + monthlyBills;
    const netIncome = monthlyIncome - totalExpenses;

    const record = {
      month: new Date().toLocaleString('default', { month: 'long' }),
      income: monthlyIncome,
      expenses: totalExpenses,
      netIncome: netIncome
    };

    setRecords([...records, record]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aylık Gelir ve Gider Hesaplama</Text>

      <TextInput
        style={styles.input}
        placeholder="Aylık Gelir"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
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

      <Button title="Hesapla" onPress={calculate} />

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>{item.month}</Text>
            <Text>Gelir: {item.income} ₺</Text>
            <Text>Gider: {item.expenses} ₺</Text>
            <Text>Net Gelir: {item.netIncome} ₺</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  record: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

