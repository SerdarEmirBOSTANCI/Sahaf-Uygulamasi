import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const dailyEarningsData = [
  { date: '2024-05-30', soldBooks: 10, totalEarnings: 500 },
  { date: '2024-05-31', soldBooks: 15, totalEarnings: 750 },
  // Daha fazla veri ekleyebilirsiniz
];

const DailyEarnings = () => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.soldBooks}</Text>
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
