import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sahafım</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KitaplikPage')}>
          <Text style={styles.buttonText}>Kitaplık</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KitapEklePage')}>
          <Text style={styles.buttonText}>Kitap Ekle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('gunlukKazancPage')}>
          <Text style={styles.buttonText}>Günlük Kazanç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('kazancPage')}>
          <Text style={styles.buttonText}>Aylık Kazanç</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#eee',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 200,
    marginTop:-200,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomePage;
