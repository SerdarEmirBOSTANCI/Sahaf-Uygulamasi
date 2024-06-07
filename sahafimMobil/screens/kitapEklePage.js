import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';

const KitapEklePage = () => {
  const [kitapAdi, setKitapAdi] = useState('');
  const [yazarAdi, setYazarAdi] = useState('');
  const [kitapTuru, setKitapTuru] = useState('');
  const [kitapResmi, setKitapResmi] = useState('');
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [rafBilgisi, setRafBilgisi] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Yeni Kitap Ekle</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kitap Adı:</Text>
        <TextInput
          style={styles.input}
          value={kitapAdi}
          onChangeText={setKitapAdi}
          placeholder="Kitap Adını Girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Yazar Adı:</Text>
        <TextInput
          style={styles.input}
          value={yazarAdi}
          onChangeText={setYazarAdi}
          placeholder="Yazar Adını Girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kitap Türü:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisible(true)}
        >
          <Text>{kitapTuru}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => {setKitapTuru('Roman'); setModalVisible(false);}}>
                <Text style={styles.modalText}>Roman</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setKitapTuru('Bilim Kurgu'); setModalVisible(false);}}>
                <Text style={styles.modalText}>Bilim Kurgu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setKitapTuru('Korku'); setModalVisible(false);}}>
                <Text style={styles.modalText}>Korku</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setKitapTuru('aksiyon'); setModalVisible(false);}}>
                <Text style={styles.modalText}>aksiyon</Text>
              </TouchableOpacity>
              {/* Diğer türler buraya eklenebilir */}
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Alış Fiyatı:</Text>
        <TextInput
          style={styles.input}
          value={alisFiyati}
          onChangeText={setAlisFiyati}
          keyboardType="numeric"
          placeholder="Alış Fiyatını Girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Satış Fiyatı:</Text>
        <TextInput
          style={styles.input}
          value={satisFiyati}
          onChangeText={setSatisFiyati}
          keyboardType="numeric"
          placeholder="Satış Fiyatını Girin"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Raf Bilgisi:</Text>
        <TextInput
          style={styles.input}
          value={rafBilgisi}
          onChangeText={setRafBilgisi}
          placeholder="Raf Bilgisini Girin"
        />
      </View>

      <Button
        title="Kitap Ekle"
        onPress={handleKitapEkle}
        color="#841584"
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default KitapEklePage;
