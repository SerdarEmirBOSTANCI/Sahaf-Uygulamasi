import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const dailyEarningsData = [
  { date: '2024-05-30', soldBooks: 10, buyBooks: 3, totalEarnings: 500 },
  { date: '2024-05-31', soldBooks: 15, buyBooks: 2, totalEarnings: 750 },
  { date: '2024-06-01', soldBooks: 20, buyBooks: 3, totalEarnings: 1250 },
  { date: '2024-06-02', soldBooks: 1, buyBooks: 9, totalEarnings: -300 },
  { date: '2024-06-03', soldBooks: 10, buyBooks: 0, totalEarnings: 750 },
  { date: '2024-06-04', soldBooks: 12, buyBooks: 5, totalEarnings: 450 },

];

const DailyEarnings = () => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.soldBooks}</Text>
      <Text style={styles.cell}>{item.buyBooks}</Text>
      <Text style={styles.cell}>{item.totalEarnings} ₺</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Günlük Kazanç Takibi</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.headerCell]}>Tarih</Text>
          <Text style={[styles.cell, styles.headerCell]}>Satılan Kitap Sayısı</Text>
          <Text style={[styles.cell, styles.headerCell]}>Alınan Kitap Sayısı</Text>
          <Text style={[styles.cell, styles.headerCell]}>Toplam Gelir (₺)</Text>
        </View>
        <FlatList
          data={dailyEarningsData}
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

export default DailyEarnings;
