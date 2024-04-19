import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';

const kitaplikPage = () => {
  const [books, setBooks] = useState([
    { id: '1', title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
    { id: '2', title: 'Book 2', author: 'Author 2', genre: 'Non-fiction' },
    { id: '3', title: 'Book 3', author: 'Author 3', genre: 'Science' },
    // Diğer kitaplar buraya eklenebilir
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = () => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleFilter = genre => {
    const filtered = books.filter(book => book.genre === genre);
    setFilteredBooks(filtered);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        placeholder="Search by title"
      />
      <Button onPress={handleSearch} title="Search" />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <Button onPress={() => handleFilter('Fiction')} title="Fiction" />
        <Button onPress={() => handleFilter('Non-fiction')} title="Non-fiction" />
        <Button onPress={() => handleFilter('Science')} title="Science" />
        {/* Diğer türler buraya eklenebilir */}
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Title: {item.title}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Genre: {item.genre}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default kitaplikPage;
